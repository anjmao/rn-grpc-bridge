#!/bin/bash

BUILD_OUT=./build

# build lib
rm -rf ${BUILD_OUT}
tsc -p tsconfig.json
cp -r ./src/lib/template ./build/lib

# build examples
cd ./examples

PROTO_DEST=./dist
rm -rf ${PROTO_DEST}
mkdir -p ${PROTO_DEST}

# Swift react native bridge generation
protoc \
--rn_out=${PROTO_DEST} \
--plugin=protoc-gen-rn=./rn-grpc-bridge.js \
-I ./proto \
proto/*.proto

# Swift proto and grpc
protoc \
--swift_out=${PROTO_DEST} \
--plugin=protoc-gen-swiftgrpc=../node_modules/grpc-plugins/osx/protoc-gen-swiftgrpc \
--swiftgrpc_out=${PROTO_DEST} \
-I ./proto \
./proto/*.proto