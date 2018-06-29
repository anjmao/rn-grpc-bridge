import * as Utility from './lib/Utility';
import { CodeGeneratorRequest, CodeGeneratorResponse } from 'google-protobuf/google/protobuf/compiler/plugin_pb';
import { FileDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';

import * as SwiftGen from './lib/gen/SwiftGen';
import * as SwiftGenHeaderBridge from './lib/gen/SwiftGenHeaderBridge';

Utility.withAllStdIn((inputBuff: Buffer) => {

    try {
        let typedInputBuff = new Uint8Array((inputBuff as any).length);
        //noinspection TypeScriptValidateTypes
        typedInputBuff.set(inputBuff);

        let codeGenRequest = CodeGeneratorRequest.deserializeBinary(typedInputBuff);
        let codeGenResponse = new CodeGeneratorResponse();
        let fileNameToDescriptor: { [key: string]: FileDescriptorProto } = {};

        codeGenRequest.getProtoFileList().forEach(protoFileDescriptor => {
            fileNameToDescriptor[protoFileDescriptor.getName()] = protoFileDescriptor;
        });

        codeGenRequest.getFileToGenerateList().forEach(fileName => {
            // swift service
            let fileDescriptorOutput = SwiftGen.gen(fileNameToDescriptor[fileName]);
            if (fileDescriptorOutput !== '') {
                let svcFileName = Utility.svcFilePathFromProtoWithoutExt(fileName);
                let svtTsdFile = new CodeGeneratorResponse.File();
                svtTsdFile.setName(`${svcFileName}_service.swift`);
                svtTsdFile.setContent(fileDescriptorOutput);
                codeGenResponse.addFile(svtTsdFile);
            }

            // swift service
            let fileHeaderBridge = SwiftGenHeaderBridge.gen(fileNameToDescriptor[fileName]);
            if (fileHeaderBridge !== '') {
                let svcFileName = Utility.svcFilePathFromProtoWithoutExt(fileName);
                let svtTsdFile = new CodeGeneratorResponse.File();
                svtTsdFile.setName(`${svcFileName}_header.m`);
                svtTsdFile.setContent(fileHeaderBridge);
                codeGenResponse.addFile(svtTsdFile);
            }

        });

        process.stdout.write(new Buffer(codeGenResponse.serializeBinary()));
    } catch (err) {
        console.error('protoc-gen-ts error: ' + err.stack + '\n');
        process.exit(1);
    }

});
