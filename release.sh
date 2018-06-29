#!/bin/bash

BUILD_OUT=./build
# build lib
rm -rf ${BUILD_OUT}
tsc -p tsconfig.json
cp -r ./src/lib/template ./build/lib

yarn publish --access=public