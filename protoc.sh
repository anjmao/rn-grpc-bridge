#!/bin/bash

rm -rf out
mkdir out

# typescipt d.ts typings for node
protoc \
--plugin=protoc-gen-rn=./main \
--rn_out=./out \
-I ./in \
./in/*.proto