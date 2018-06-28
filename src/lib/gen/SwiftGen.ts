import { FileDescriptorProto, DescriptorProto, FieldDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';
import * as Utility from '../Utility';
import * as TplEngine from '../TplEngine';
import * as fs from 'fs';
import { genRequestMapping, GenRequestMappingOptions, MappingProto, MappingProtoField } from './SwiftGenMapping';

interface RequestMappingField {
    value: string;
    name: string;
    repeated: boolean;
    childDescriptor: DescriptorProto;
}

interface ResponseMappingField {
    value: string;
    repeated: boolean;
    childDescriptor: DescriptorProto;
}

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
    requestFields: RequestMappingField[];
    responseFields: ResponseMappingField[];
    requestStream: boolean;
    responseStream: boolean;
    requestTypeName: string;
    responseTypeName: string;
    type: string; // 'ClientUnaryCall' || 'ClientWritableStream' || 'ClientReadableStream' || 'ClientDuplexStream'
}

export const defaultServiceMethodType = JSON.stringify({
    packageName: '',
    serviceName: '',
    methodName: '',
    requestStream: false,
    responseStream: false,
    requestFields: [],
    requestTypeName: '',
    responseTypeName: '',
    type: '',
} as ServiceMethodType);

function logJSON(val) {
    fs.appendFileSync('./log.json', JSON.stringify(val) + '\n')
}

function clearLog() {
    fs.writeFileSync('./log.json', '');
}

export function gen(descriptor: FileDescriptorProto): string {
    if (descriptor.getServiceList().length === 0) {
        return '';
    }

    // clearLog();
    // logJSON('');

    let fileName = descriptor.getName();
    let packageName = getPackageName(descriptor.getPackage());

    let imports: Array<string> = [];
    let services: Array<ServiceType> = [];

    const messageTypes = descriptor.getMessageTypeList();

    imports.push(`import Foundation`);
    imports.push(`import SwiftGRPC`);

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
            methodData.requestFields = formatRequestFields(packageName, messageTypes, inputType);
            // methodData.responseFields = formatResponseFields(packageName, messageTypes, outputType);

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
        imports: imports,
        services: services,
    });
}

function getType(messageTypes: DescriptorProto[], type: string) {
    return messageTypes.find(x => {
        const inputName = type.split('.').pop();
        return x.getName() === inputName;
    });
}

function getPackageName(pkg: string) {
    pkg = pkg.toLowerCase();
    return pkg[0].toUpperCase() + pkg.slice(1);
}

function formatRequestFields(packageName: string, messageTypes: DescriptorProto[], inputType: DescriptorProto) {
    const mapProto = (input: DescriptorProto) => {
        return <MappingProto>{
            name: input.getName(),
            fields: input.getFieldList().map(f => (<MappingProtoField>{ 
                name: f.getName(),
                type: f.getType(),
                repeated: f.getLabel() === FieldDescriptorProto.Label.LABEL_REPEATED
            }))
        }
    };
    const req: GenRequestMappingOptions = {
        packageName: packageName,
        indent: 0,
        messages: messageTypes.map(mapProto),
        message: mapProto(inputType),
        root: 'root',
        root$: 'root$'
    }
    const fields = genRequestMapping(req)
}
