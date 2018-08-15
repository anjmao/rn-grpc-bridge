import * as Utility from './lib/Utility';
import { CodeGeneratorRequest, CodeGeneratorResponse } from 'google-protobuf/google/protobuf/compiler/plugin_pb';
import { FileDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';
import * as SwiftGen from './lib/gen/SwiftGen';
import * as SwiftGenHeaderBridge from './lib/gen/SwiftGenHeaderBridge';
import * as TsNativeModuleTypes from './lib/gen/TsNativeModuleTypes';
import * as SwiftGrpcConfig from './lib/gen/SwiftGrpcConfig';
import { ServiceDesc } from './lib/gen/SwiftGrpcConfig';

Utility.withAllStdIn((inputBuff: Buffer) => {

    try {
        let typedInputBuff = new Uint8Array((inputBuff as any).length);
        //noinspection TypeScriptValidateTypes
        typedInputBuff.set(inputBuff);

        let codeGenRequest = CodeGeneratorRequest.deserializeBinary(typedInputBuff);
        let codeGenResponse = new CodeGeneratorResponse();
        let fileNameToDescriptor: { [key: string]: FileDescriptorProto } = {};
        let allServices: ServiceDesc[] = [];

        codeGenRequest.getProtoFileList().forEach(protoFileDescriptor => {
            fileNameToDescriptor[protoFileDescriptor.getName()] = protoFileDescriptor;
            const services = protoFileDescriptor.getServiceList().map((s) => ({
                serviceName: s.getName(),
                pkgName: protoFileDescriptor.getPackage()
            }));
            allServices.push(...services);
        });

        let swiftFileContents: string[] = [];
        let rnBridgeContents: string[] = [];
        codeGenRequest.getFileToGenerateList().forEach(fileName => {

            // react NativeModules grpc bridge types
            let tsTypes = TsNativeModuleTypes.gen(fileNameToDescriptor[fileName]);
            if (tsTypes !== '') {
                let svcFileName = Utility.svcFilePathFromProtoWithoutExt(fileName);
                let svtTsdFile = new CodeGeneratorResponse.File();
                svtTsdFile.setName(`${svcFileName}_types.ts`);
                svtTsdFile.setContent(tsTypes);
                codeGenResponse.addFile(svtTsdFile);
            }

            // swift services
            let fileDescriptorOutput = SwiftGen.gen(fileNameToDescriptor[fileName]);
            if (fileDescriptorOutput !== '') {
                swiftFileContents.push(fileDescriptorOutput);
            }

            // swift objective-c headers
            let fileHeaderBridge = SwiftGenHeaderBridge.gen(fileNameToDescriptor[fileName]);
            if (fileHeaderBridge !== '') {
                rnBridgeContents.push(fileHeaderBridge);
            }
        });

        addFile(codeGenResponse, 'grpc_config.swift', SwiftGrpcConfig.genSwiftConfig(allServices));
        addFile(codeGenResponse, 'grpc_config_bridge.m', SwiftGrpcConfig.genSwiftConfigBridge());
        addFile(codeGenResponse, 'grpc_services.swift', swiftFileContents.join('\n'));
        addFile(codeGenResponse, 'grpc_services_bridge.m', rnBridgeContents.join('\n'));

        process.stdout.write(new Buffer(codeGenResponse.serializeBinary()));
    } catch (err) {
        console.error('protoc-gen-ts error: ' + err.stack + '\n');
        process.exit(1);
    }
});

function addFile(rsp: CodeGeneratorResponse, fileName: string, fileContent: string) {
    const file = new CodeGeneratorResponse.File();
    file.setName(fileName);
    file.setContent(fileContent);
    rsp.addFile(file);
}
