# AliasIpsum is the fastest way to copy new aliased email addresses to the clipboard

As a tester or developer, using unique emails is tedious and isn't perfect.
The AliasIpsum extension giving access to a unique, timstamp based aliased
email that updates each second, so there is nearly 0 chance that the email
copied is not unique.

Download the browser extension for free in the [Chrome Web Store](https://chrome.google.com/webstore/detail/aliasipsum/gpbdnbechbkbfbdbhcbllejhgggnmena)

## [QuickLorem.dev](https://quicklorem.dev) started out as a superfast lorem ipsum Generator

This tool is focused on getting lorem text copied to the clipboard
faster than other tools. Lets focus on getting the data that matters copied quickly.

- Length of content
- Formats
  - String[]
  - Number[]
  - Json
- Aliased Emails

---

## Build Instructions

**Requirements**
- OS: macOS or Linux
- Node.js: See `.nvmrc` for exact version
- npm: Included with Node.js

**Steps**
1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the extension:
   ```bash
   npm run build:extension
   ```
   This runs `extensionReqs/build.sh` to generate the extension.
3. Load the unpacked extension from the generated `extension/` directory.

The browser extension is a limited version of the website served when running `npm run dev`.
Visit the /extension page when running the site locally.
