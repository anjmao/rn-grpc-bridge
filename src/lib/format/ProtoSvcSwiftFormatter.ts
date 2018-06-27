import { FileDescriptorProto, DescriptorProto, FieldDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';
import { ExportMap } from '../ExportMap';
import * as Utility from '../Utility';
import * as TplEngine from '../TplEngine';
import { WellKnownTypesMap } from '../WellKnown';
import { DependencyFilter } from '../DependencyFilter';
import * as FieldTypesFormatter from './partial/FieldTypesFormatter';
import * as fs from 'fs';

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
    requestFields: any[];
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

export function format(descriptor: FileDescriptorProto, exportMap: ExportMap): string {
    if (descriptor.getServiceList().length === 0) {
        return '';
    }

    clearLog();

    let fileName = descriptor.getName();
    let packageName = getPackageName(descriptor.getPackage());
    let upToRoot = Utility.getPathToRoot(fileName);

    let imports: Array<string> = [];
    let services: Array<ServiceType> = [];

    const messageTypes = descriptor.getMessageTypeList();
    // logJSON(messageTypes.map(x => x.toObject()))

    imports.push(`import Foundation`);
    imports.push(`import SwiftGRPC`);

    descriptor.getServiceList().forEach(service => {
        let serviceData = JSON.parse(defaultServiceType) as ServiceType;

        serviceData.serviceName = service.getName();

        service.getMethodList().forEach(method => {
            let methodData = JSON.parse(defaultServiceMethodType) as ServiceMethodType;

            const inputType = getType(messageTypes, method.getInputType());
            const outputType = getType(messageTypes, method.getOutputType());
            // logJSON(outputType.getFieldList().map(x => x.getName()))

            methodData.packageName = packageName;
            methodData.serviceName = serviceData.serviceName;
            methodData.methodName = method.getName();
            methodData.requestStream = method.getClientStreaming();
            methodData.responseStream = method.getServerStreaming();
            methodData.requestTypeName = `${packageName}_${inputType.getName()}()`;
            methodData.responseTypeName = `${packageName}_${outputType.getName()}()`;
            methodData.requestFields = formatRequestFields(inputType);

            // methodData.requestTypeName = FieldTypesFormatter.getFieldType(
            //     FieldTypesFormatter.MESSAGE_TYPE, method.getInputType().slice(1), '', exportMap);
            // methodData.responseTypeName = FieldTypesFormatter.getFieldType(
            //     FieldTypesFormatter.MESSAGE_TYPE, method.getOutputType().slice(1), '', exportMap);

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
        const inputName = type.split('.').pop()
        return x.getName() === inputName;
    });
}

function getPackageName(pkg: string) {
    pkg = pkg.toLowerCase();
    return pkg[0].toUpperCase() + pkg.slice(1);
}

function formatRequestFields(desc: DescriptorProto): any[] {
    const fields = [];
    const fType = FieldDescriptorProto.Type;
    for (let f of desc.getFieldList()) {
        let cast = '';
        switch (f.getType()) {
            case fType.TYPE_STRING:
            cast = 'as? String ?? ""';
            break;
            case fType.TYPE_BOOL:
            cast = 'as? Bool ?? false';
            break;
            case fType.TYPE_INT32:
            case fType.TYPE_ENUM:
            case fType.TYPE_SFIXED32:
            case fType.TYPE_SINT32:
            cast = 'as? Int32 ?? 0';
            break;
            case fType.TYPE_INT64:
            case fType.TYPE_SFIXED64:
            case fType.TYPE_SINT64:
            cast = 'as? Int64 ?? 0';
            break;
            case fType.TYPE_BYTES:
            cast = 'as? Data ?? Data()';
            break;
            case fType.TYPE_DOUBLE:
            cast = 'as? Double ?? 0';
            break;
            case fType.TYPE_FIXED32:
            cast = 'as? UInt32 ?? 0';
            break;
            case fType.TYPE_FIXED64:
            cast = 'as? UInt64 ?? 0';
            break;
            case fType.TYPE_FLOAT:
            cast = 'as? Float ?? 0';
            break;
            case fType.TYPE_UINT32:
            cast = 'as? UInt32 ?? 0';
            break;
            case fType.TYPE_UINT64:
            cast = 'as? UInt32 ?? 0';
            break;
            default:
            throw new Error(`Data type ${f.getType()} is not supported.`);
        }
        fields.push({ name: f.getName(), cast: cast });
    }
    return fields;
}
