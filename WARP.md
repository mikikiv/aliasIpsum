# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

AliasIpsum (also known as QuickLorem.dev) is a dual-purpose application that serves as both a web application and a browser extension. The primary functionality includes:

- **Aliased Email Generation**: Creates unique, timestamp-based (or any other variable) email aliases for testing
- **Lorem Ipsum Text Generation**: Provides various text formats (sentences, paragraphs, arrays, JSON)
- **Regex Text Tester**: Determine the result of a regexp
- **Browser Extension**: Chrome/Firefox extension for quick access to email aliases

## Development Commands

### Essential Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Testing
```bash
# Run unit tests (Jest)
npm test

# Run end-to-end tests (Playwright)
npm run e2e

# Run e2e tests with UI
npm run e2e-dev
```

### Linting & Formatting
```bash
# Lint code using Biome
npm run lint

# Format code using Biome
npm run format
```

### Browser Extension Development
```bash
# Build extension for Chrome/Firefox
npm run build:extension

# For development, use the /extension page
# Navigate to http://localhost:3000/extension
```

### Single Test Execution
```bash
# Run specific test file
npm test -- utils/regexReplacer.test.ts

# Run specific e2e test
npm run e2e -- tests/e2e.spec.ts

# Run single test with pattern
npm test -- --testNamePattern="Basic Replacement"
```

## Architecture Overview

### Technology Stack

- **Framework**: Next.js 15.4.6 with React 18.2.0
- **UI Library**: Mantine v6 (comprehensive component library)
- **State Management**: Jotai (atomic state management)
- **Testing**: Jest (unit tests) + Playwright (e2e tests)
- **Linting/Formatting**: Biome (replacement for ESLint + Prettier)
- **Build**: SWC compiler for fast builds

### Application Structure

#### Dual Layout System

The app uses conditional layouts based on route:

- **Default Layout**: Full web app with header, sidebar, footer
- **Extension Layout**: Compact 380x400px layout for browser extension

#### Key Components

- **AliasedEmails**: Timestamp-based email alias generator with optional alternatives to (or alongside) timestamps
- **TextGeneration**: Main lorem ipsum generator with multiple themes
- **RegexReplacer**: Determine what would result from your regular expression comand
- **CopyHistory**: Persistent clipboard history with local storage

#### State Management Pattern

Uses Jotai atoms for:

- Copy history tracking
- User preferences (aliases, themes)
- Local storage persistence

### Core Utilities

#### Aliasing Emails

- Uses an npm package `aliased-email` (built by the same dev of this repo)
- Inserts any selected alias and/or timestamp to the users email

#### Text Transformation (`utils/transformer.ts`)

- Supports multiple lorem themes (pirate, dog, cat, hungry, video game)
- Generates words, sentences, paragraphs, arrays, lists, and JSON
- Uses composition pattern with count/depth parameters

#### Regex Processing (`utils/regexReplacer.ts`)

- Converts string patterns to RegExp objects
- Handles special character escaping
- Safe error handling with fallback to original text

### Extension Architecture

- Uses Next.js static export (`output: "export"`)
- Extension manifest v3 with clipboard permissions
- Build script copies manifest and packages as web extension
- Shares codebase with web app through conditional rendering

### Testing Strategy

#### Unit Tests (Jest)

- Focus on utility functions (regex replacement, text transformation)
- Uses ts-jest for TypeScript support
- Test files co-located with source code

#### E2E Tests (Playwright)

- Tests both web app and extension layouts
- Clipboard functionality testing with permissions
- Cross-browser support (Chrome, Firefox)
- Automatic dev server startup during testing

### Development Workflow

#### Local Development

1. Run `npm run dev` for web app development
2. Visit `/extension` route for extension development
3. Use `npm run build:extension` to package extension
4. Load unpacked extension in Chrome for testing

#### Code Quality

- Biome enforces consistent formatting (2-space indent, 80-char line width)
- TypeScript strict mode enabled
- Path aliasing with `@/*` for clean imports

### Browser Extension Specifics

#### Build Process

1. Next.js static export generates HTML/CSS/JS
2. Manifest file copied to output directory  
3. Web-ext packages as Firefox/Chrome extension
4. Output moved to `/extension` folder

#### Extension Features

- Popup interface (380x400px)
- Clipboard write permissions
- Copy history in footer area
- Optimized for quick email alias generation

### Key Files to Understand

- `pages/_app.tsx`: Layout logic and theme management
- `utils/transformer.ts`: Core text generation logic
- `components/types.ts`: Type definitions for copy history and aliases
- `extensionReqs/build.sh`: Extension build automation
- `playwright.config.ts`: E2E test configuration with clipboard permissions

### Development Notes

- Extension development requires testing in actual browser environment
- Copy history persists in localStorage with atomic updates
- Theme switching uses Mantine's ColorSchemeProvider
- All text generation is client-side with no external API calls
- Responsive design breaks at 'sm' breakpoint for extension compatibility
