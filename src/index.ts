/**
 * This is the ProtoC compiler plugin.
 *
 * It only accepts stdin/stdout output according to the protocol
 * specified in [plugin.proto](https://github.com/google/protobuf/blob/master/src/google/protobuf/compiler/plugin.proto).
 */

import * as Utility from './lib/Utility';
import { CodeGeneratorRequest, CodeGeneratorResponse } from 'google-protobuf/google/protobuf/compiler/plugin_pb';
import { FileDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';

import * as SwiftGen from './lib/gen/SwiftGen';

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
            // service part
            let fileDescriptorOutput = SwiftGen.gen(fileNameToDescriptor[fileName]);
            if (fileDescriptorOutput !== '') {
                let svcFileName = Utility.svcFilePathFromProtoWithoutExt(fileName);
                let svtTsdFile = new CodeGeneratorResponse.File();
                svtTsdFile.setName(svcFileName + '.swift');
                svtTsdFile.setContent(fileDescriptorOutput);
                codeGenResponse.addFile(svtTsdFile);
            }
        });

        process.stdout.write(new Buffer(codeGenResponse.serializeBinary()));
    } catch (err) {
        console.error('protoc-gen-ts error: ' + err.stack + '\n');
        process.exit(1);
    }

});
