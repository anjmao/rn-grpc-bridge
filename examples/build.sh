#!/usr/bin/env bash

PROTO_DEST=./dist
mkdir -p ${PROTO_DEST}

# JavaScript code generating
protoc \
--ts_out=${PROTO_DEST} \
--plugin=protoc-gen-ts=./rn-grpc-bridge.js \
-I ./proto \
proto/*.proto


# --plugin=protoc-gen-ts=../bin/protoc-gen-ts \
# --ts_out=${PROTO_DEST} \