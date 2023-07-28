#!/bin/bash

# Build the Next.js application
npx next build
echo "
Build complete
"

# Export the application as static HTML files
npx next export
echo "
Export complete
"

# Move the _next directory to next

mv out/_next out/next

# Replace occurrences of /_next with ./next in HTML files
find out -type f -name "*.html" -exec sed -i '' -e 's#/_next#./next#g' {} +

# Move extension.html to /extension folder
mkdir extension
mv out/extension.html extension/extension.html
mv out/logo.png extension/logo.png

# Synchronize out/next with /extension/next
rsync -va --delete-after out/next/ extension/next/

# copy the manifest.json file to /extension folder
cp extensionReqs/manifest.json extension/manifest.json

# Remove the out directory
rm -rf out

# when the user includes an export flag, export the extension folder as a zip
if [ "$1" == "export" ]; then
  echo "
  exporting extension folder as zip
  "
  zip -r extension.zip extension
fi