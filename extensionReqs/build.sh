#!/bin/bash

npx next build
echo "Export complete"

# Copy the manifest.json file to /extension folder
cp extensionReqs/manifest.json out/manifest.json

# build the extension
cd out
web-ext build

# Move the web-ext-artifacts and its content to the ../extension folder (creating it if it doesn't exist)
cd ..
mkdir -p extension
mv out/web-ext-artifacts/* extension



# Delete the out folder and its content
cd ..
rm -rf out
