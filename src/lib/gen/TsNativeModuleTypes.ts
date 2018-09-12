import { FileDescriptorProto, DescriptorProto, FieldDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';
import * as TplEngine from '../TplEngine';
import { generateIndent } from '../Utility';
// import { log } from '../Debug';

interface ServiceType {
    serviceName: string;
    methods: Array<ServiceMethodType>;
}
const defaultServiceType = JSON.stringify({
    serviceName: '',
    methods: [],
} as ServiceType);

interface ServiceMethodType {
    serviceName: string;
    methodName: string;
    requestMapFrom: string;
    requestTypeName: string;
    responseTypeName: string;
}

const defaultServiceMethodType = JSON.stringify({
    serviceName: '',
    methodName: '',
    requestMapFrom: '',
    responseTypeName: '',
    requestTypeName: ''
} as ServiceMethodType);

export function gen(descriptor: FileDescriptorProto): string {
    if (descriptor.getServiceList().length === 0) {
        return '';
    }

    let fileName = descriptor.getName();
    let services: Array<ServiceType> = [];
    const messages = descriptor.getMessageTypeList();
    const messagesInterfacesOut = genMessageTypesTsInterfaces(messages);

    descriptor.getServiceList().forEach(service => {
        let serviceData = JSON.parse(defaultServiceType) as ServiceType;
        serviceData.serviceName = service.getName();
        service.getMethodList().forEach(method => {
            let methodData = JSON.parse(defaultServiceMethodType) as ServiceMethodType;
            methodData.serviceName = serviceData.serviceName;
            methodData.methodName = method.getName();
            methodData.requestTypeName = getTypeName(method.getInputType());
            methodData.responseTypeName = getTypeName(method.getOutputType());
            serviceData.methods.push(methodData);
        });

        services.push(serviceData);
    });

    TplEngine.registerHelper('lcFirst', function (str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    });

    return TplEngine.render('ts_native_module_types', {
        fileName: fileName,
        services: services,
        messagesInterfacesOut: messagesInterfacesOut
    });
}

function getTypeName(name: string) {
    return `${name.split('.').pop()}Pb`;
}

function genMessageTypesTsInterfaces(messages: DescriptorProto[]) {
    const res: string[] = [];
    const g = (i, val) => res.push(generateIndent(i) + val);
    for (let msg of messages) {
        g(0, `export interface ${msg.getName()}Pb {`);
        for (let field of msg.getFieldList()) {
            let optionalLabel = field.getLabel() === FieldDescriptorProto.Label.LABEL_OPTIONAL ? '?' : '';
            g(1, `${field.getName()}${optionalLabel}: ${getTsType(field)};`);
        }
        g(0, `}`);
    }
    return res.join('\n');
}

function getTsType(f: FieldDescriptorProto) {
    const t = FieldDescriptorProto.Type;
    switch (f.getType()) {
        case t.TYPE_STRING:
            return 'string';
        case t.TYPE_BOOL:
            return 'boolean';
        case t.TYPE_INT32:
        case t.TYPE_ENUM:
        case t.TYPE_SFIXED32:
        case t.TYPE_SINT32:
        case t.TYPE_INT64:
        case t.TYPE_SFIXED64:
        case t.TYPE_SINT64:
        case t.TYPE_DOUBLE:
        case t.TYPE_FLOAT:
        case t.TYPE_UINT32:
        case t.TYPE_FIXED32:
        case t.TYPE_UINT64:
        case t.TYPE_FIXED64:
            return 'number';
        case t.TYPE_MESSAGE:
            const name = f.getTypeName();
            if (f.getLabel() === FieldDescriptorProto.Label.LABEL_REPEATED) {
                if (name.endsWith('Entry')) {
                    return 'any';
                }
                return `${getTypeName(name)}[]`;
            } else {
                return getTypeName(name);
            }
        case t.TYPE_BYTES:
            return 'Uint8Array';
        default:
            throw new Error(`Data type ${f.getType()} is not supported.`);
    };
}
