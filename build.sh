#!/bin/bash
# Makes it ready to be uploaded

mkdir bin
cd ./src

# version number of the extension
version=`eval cat manifest.json | grep "version" | cut -d \" -f 4`

# compressing
zip chrome-console_$version.zip *
mv chrome-console_$version.zip ../bin
cd ..