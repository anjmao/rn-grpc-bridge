import { FileDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';
import * as TplEngine from '../TplEngine';
import { REQUEST_MAP_FROM } from './SwiftGen';

export interface ServiceType {
    serviceName: string;
    methods: Array<ServiceMethodType>;
}
export const defaultServiceType = JSON.stringify({
    serviceName: '',
    methods: [],
} as ServiceType);

export interface ServiceMethodType {
    serviceName: string;
    methodName: string;
    requestMapFrom: string;
}

export const defaultServiceMethodType = JSON.stringify({
    serviceName: '',
    methodName: '',
    requestMapFrom: ''
} as ServiceMethodType);

export function gen(descriptor: FileDescriptorProto): string {
    if (descriptor.getServiceList().length === 0) {
        return '';
    }

    let fileName = descriptor.getName();
    let packageName = getPackageName(descriptor.getPackage());
    let services: Array<ServiceType> = [];

    descriptor.getServiceList().forEach(service => {
        let serviceData = JSON.parse(defaultServiceType) as ServiceType;

        serviceData.serviceName = service.getName();

        service.getMethodList().forEach(method => {
            let methodData = JSON.parse(defaultServiceMethodType) as ServiceMethodType;
            methodData.serviceName = serviceData.serviceName;
            methodData.methodName = method.getName();
            methodData.requestMapFrom = REQUEST_MAP_FROM
            serviceData.methods.push(methodData);
        });

        services.push(serviceData);
    });

    TplEngine.registerHelper('lcFirst', function (str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    });

    return TplEngine.render('rn_swift_bridge', {
        packageName: packageName,
        fileName: fileName,
        services: services
    });
}

function getPackageName(pkg: string) {
    pkg = pkg.toLowerCase();
    return pkg[0].toUpperCase() + pkg.slice(1);
}
