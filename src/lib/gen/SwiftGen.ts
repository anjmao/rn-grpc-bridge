import { FileDescriptorProto, DescriptorProto, FieldDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';
import * as TplEngine from '../TplEngine';
import { 
    GenRequestMappingOptions,
    MappingProto, 
    MappingProtoField,
    genRequestFields,
    genResponseMappings,
    GenResponseMappingsOptions
} from './SwiftGenMapping';


export interface ServiceType {
    serviceName: string;
    methods: Array<ServiceMethodType>;
}
export const defaultServiceType = JSON.stringify({
    serviceName: '',
    methods: [],
} as ServiceType);

export interface ServiceMethodType {
    packageName: string;
    serviceName: string;
    methodName: string;
    requestMapping: string;
    responseMapping: string;
    requestStream: boolean;
    responseStream: boolean;
    requestTypeName: string;
    responseTypeName: string;
    requestMapFrom: string;
    requestMapTo: string;
    responseMapFrom: string;
    responseMapTo: string;
    type: string; // 'ClientUnaryCall' || 'ClientWritableStream' || 'ClientReadableStream' || 'ClientDuplexStream'
}

export const REQUEST_MAP_FROM = 'jsReq';
export const REQUEST_MAP_TO = 'req';
export const RESPONSE_MAP_FROM = 'res';
export const RESPONSE_MAP_TO = 'jsRes';

export const defaultServiceMethodType = JSON.stringify({
    packageName: '',
    serviceName: '',
    methodName: '',
    requestStream: false,
    responseStream: false,
    requestMapping: '',
    responseMapping: '',
    requestTypeName: '',
    responseTypeName: '',
    requestMapFrom: REQUEST_MAP_FROM,
    requestMapTo: REQUEST_MAP_TO,
    responseMapFrom: RESPONSE_MAP_FROM,
    responseMapTo: RESPONSE_MAP_TO,
    type: '',
} as ServiceMethodType);

export function gen(descriptor: FileDescriptorProto): string {
    if (descriptor.getServiceList().length === 0) {
        return '';
    }

    let fileName = descriptor.getName();
    let packageName = getPackageName(descriptor.getPackage());
    let services: Array<ServiceType> = [];
    const messageTypes = descriptor.getMessageTypeList();


    descriptor.getServiceList().forEach(service => {
        let serviceData = JSON.parse(defaultServiceType) as ServiceType;

        serviceData.serviceName = service.getName();

        service.getMethodList().forEach(method => {
            let methodData = JSON.parse(defaultServiceMethodType) as ServiceMethodType;

            const inputType = getType(messageTypes, method.getInputType());
            const outputType = getType(messageTypes, method.getOutputType());

            methodData.packageName = packageName;
            methodData.serviceName = serviceData.serviceName;
            methodData.methodName = method.getName();
            methodData.requestStream = method.getClientStreaming();
            methodData.responseStream = method.getServerStreaming();
            methodData.requestTypeName = `${packageName}_${inputType.getName()}()`;
            methodData.responseTypeName = `${packageName}_${outputType.getName()}()`;
            methodData.requestMapping = formatRequest(packageName, messageTypes, inputType);
            methodData.responseMapping = formatResponse(messageTypes, outputType);

            if (!methodData.requestStream && !methodData.responseStream) {
                methodData.type = 'ClientUnaryCall';
            } else if (methodData.requestStream && !methodData.responseStream) {
                methodData.type = 'ClientWritableStream';
            } else if (!methodData.requestStream && methodData.responseStream) {
                methodData.type = 'ClientReadableStream';
            } else if (methodData.requestStream && methodData.responseStream) {
                methodData.type = 'ClientDuplexStream';
            }

            serviceData.methods.push(methodData);
        });

        services.push(serviceData);
    });

    TplEngine.registerHelper('lcFirst', function (str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    });

    return TplEngine.render('svc_swift', {
        packageName: packageName,
        fileName: fileName,
        services: services,
    });
}

function getType(messageTypes: DescriptorProto[], type: string) {
    return messageTypes.find(x => {
        const inputName = type.split('.').pop();
        const name = x.getName();
        return name === inputName;
    });
}

function getPackageName(pkg: string) {
    pkg = pkg.toLowerCase();
    return pkg[0].toUpperCase() + pkg.slice(1);
}
const RESERVED_NAMES = ['description'];
const UPPERCASE_ENDING = ['Id', 'Url'];
function mapProtoDescriptor(input: DescriptorProto): MappingProto {
    const mapFieldName = (name: string) => {
        if (RESERVED_NAMES.indexOf(name) > -1) {
            return `${name}_p`;
        }
        for (const ending of UPPERCASE_ENDING) {
            if (name.length > 2 && name.endsWith(ending)) {
                return name.slice(0 , name.length - ending.length) + ending.toUpperCase();
            }
        }
        return name;
    };
    return <MappingProto>{
        name: input.getName(),
        fields: input.getFieldList().map(f => (<MappingProtoField>{ 
            name: mapFieldName(f.getName()),
            jsName: f.getName(),
            typeName: f.getTypeName().split('.').pop(),
            type: f.getType(),
            repeated: f.getLabel() === FieldDescriptorProto.Label.LABEL_REPEATED
        }))
    }
}

function formatRequest(packageName: string, messageTypes: DescriptorProto[], inputType: DescriptorProto) {
    const req: GenRequestMappingOptions = {
        packageName: packageName,
        indent: 0,
        messages: messageTypes.map(x => mapProtoDescriptor(x)),
        message: mapProtoDescriptor(inputType),
        mapFrom: REQUEST_MAP_FROM,
        mapTo: REQUEST_MAP_TO
    }
    const fields = genRequestFields(req);
    return fields.map(r => `    ${r}`).join('\n');
}

function formatResponse(messageTypes: DescriptorProto[], inputType: DescriptorProto) {
    const req: GenResponseMappingsOptions = {
        indent: 0,
        messages: messageTypes.map(x => mapProtoDescriptor(x)),
        message: mapProtoDescriptor(inputType),
        mapFrom: RESPONSE_MAP_FROM,
        mapTo: RESPONSE_MAP_TO
    }
    const fields = genResponseMappings(req);
    return fields.map(r => `      ${r}`).join('\n');
}
