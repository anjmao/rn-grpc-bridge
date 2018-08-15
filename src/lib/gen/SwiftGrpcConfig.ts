import * as TplEngine from '../TplEngine';

export interface ServiceDesc {
    serviceName: string;
    pkgName: string;
}

export function genSwiftConfig(services: ServiceDesc[]): string {
    const svc = services.map((s) => ({
        serviceName: s.serviceName,
        pkgName: upperCaseFirst(s.pkgName)
    }))
    return TplEngine.render('swift_grpc_config', {
        services: svc,
    });
}

function upperCaseFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function genSwiftConfigBridge(): string {
    return TplEngine.render('swift_grpc_config_bridge', {});
}
