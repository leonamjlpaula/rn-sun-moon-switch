# React Native Library Transformation Plan

## Overview
Transform this repository from a standalone React Native Expo app into a publishable npm library (`@yourusername/rn-sun-moon-switch` or similar) with:
1. A properly configured npm package
2. An examples folder containing a demo React Native app

---

## Phase 1: Project Structure Reorganization

### 1.1 Current Structure
```
rn-sun-moon-switch/
├── src/                    # Library source code (keep)
├── App.tsx                 # Demo app (move to examples/)
├── assets/                 # Demo assets (move to examples/)
├── app.json                # Expo config (move to examples/)
├── package.json            # Needs restructuring
└── node_modules/
```

### 1.2 Target Structure
```
rn-sun-moon-switch/
├── src/                    # Library source code
│   ├── components/
│   │   └── SunMoonSwitch/
│   └── index.ts            # Main library export
├── dist/                    # Built library (generated)
│   ├── index.js            # CommonJS build
│   ├── index.esm.js        # ES modules build
│   ├── index.d.ts          # TypeScript definitions
│   └── types/              # Additional type definitions
├── examples/                # Demo app
│   ├── App.tsx
│   ├── app.json
│   ├── assets/
│   ├── package.json
│   └── node_modules/
├── package.json             # Library package.json
├── tsconfig.json            # Library TypeScript config
├── rollup.config.js         # Build configuration
├── .npmignore               # Files to exclude from npm
└── README.md                # Library documentation
```

---

## Phase 2: Library Configuration

### 2.1 Update Root `package.json`
**Changes needed:**
- Remove `"private": true`
- Add proper `name` (e.g., `@yourusername/rn-sun-moon-switch` or `rn-sun-moon-switch`)
- Set `version` (start with `1.0.0`)
- Update `main`, `module`, `types` entry points
- Configure `files` array (what gets published to npm)
- Add `repository`, `keywords`, `author`, `license`
- Configure `peerDependencies` (react-native, react-native-reanimated)
- Add build scripts (rollup)
- Add prepublish scripts
- Remove Expo-specific scripts from root

**Entry Points:**
```json
{
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "src"],
  "peerDependencies": {
    "react": "*",
    "react-native": "*",
    "react-native-reanimated": ">=2.0.0"
  }
}
```

### 2.2 Create Rollup Build Configuration
**Purpose:** Bundle the library for distribution
**Outputs:**
- CommonJS (`dist/index.js`) - for Node/older bundlers
- ES Modules (`dist/index.esm.js`) - for modern bundlers
- TypeScript definitions (`dist/index.d.ts`)

**Key considerations:**
- Externalize peer dependencies
- Handle React Native/Reanimated worklets
- Preserve TypeScript types
- Optimize bundle size

### 2.3 Update TypeScript Configuration
**Changes needed:**
- Separate library `tsconfig.json` from examples
- Configure for library compilation (declaration files)
- Output to `dist/` directory
- Exclude examples folder

### 2.4 Create `.npmignore`
**Files to exclude from npm package:**
- `examples/`
- `node_modules/`
- `App.tsx` (old demo)
- `app.json` (old Expo config)
- Build artifacts (except `dist/`)
- Source maps (optional)
- Test files (if any)

### 2.5 Update Library Entry Point (`src/index.ts`)
Ensure it exports everything users need:
```typescript
export { default as SunMoonSwitch } from './components/SunMoonSwitch';
// Export types if needed
export type { ... } from './components/SunMoonSwitch';
```

---

## Phase 3: Examples Folder Setup

### 3.1 Create `examples/` Directory Structure
```
examples/
├── App.tsx                  # Demo app (move from root)
├── app.json                 # Expo config (move from root)
├── assets/                  # Assets (move from root)
├── package.json             # New demo app package.json
├── babel.config.js          # Babel config for demo
└── node_modules/            # Separate dependencies
```

### 3.2 Create `examples/package.json`
**Purpose:** Standalone Expo app to demo the library
**Configuration:**
- Link to parent library: `"rn-sun-moon-switch": "file:.."`
- Include all Expo/React Native dependencies
- Demo-specific scripts

### 3.3 Move Demo App Files
- Move `App.tsx` → `examples/App.tsx`
- Move `app.json` → `examples/app.json`
- Move `assets/` → `examples/assets/`
- Update imports in demo app to use the library

### 3.4 Update Demo App to Import from Library
Change imports from:
```typescript
import { SunMoonSwitch } from './src/components';
```
To:
```typescript
import { SunMoonSwitch } from 'rn-sun-moon-switch';
```

---

## Phase 4: Build & Development Scripts

### 4.1 Add Build Scripts to Root `package.json`
```json
{
  "scripts": {
    "build": "rollup -c",
    "watch": "rollup -c -w",
    "prepublishOnly": "npm run build",
    "example": "cd examples && npm start"
  }
}
```

### 4.2 Add Development Workflow
- `npm run watch` - Watch mode for library development
- `npm run build` - Build library for production
- `npm run example` - Start demo app
- Link library locally for testing

---

## Phase 5: Documentation

### 5.1 Create/Update README.md
**Sections to include:**
- Library description
- Installation instructions
- Basic usage example
- Props/API documentation
- Requirements (peer dependencies)
- Contributing guidelines
- License

### 5.2 Add Type Definitions
Ensure all components have proper TypeScript types exported.

---

## Phase 6: Publishing to npm

### 6.1 Pre-publish Checklist
- [ ] Build library (`npm run build`)
- [ ] Test with examples app
- [ ] Verify package.json metadata
- [ ] Check `.npmignore` excludes correct files
- [ ] Test installation locally: `npm pack` then `npm install ./rn-sun-moon-switch-1.0.0.tgz`

### 6.2 Publishing Steps
1. Ensure you're logged into npm: `npm login`
2. Choose package name (check availability)
3. Update version in `package.json`
4. Build: `npm run build`
5. Publish: `npm publish` (or `npm publish --access public` for scoped packages)
6. Tag release in git

### 6.3 Post-publish
- Test installation: `npm install rn-sun-moon-switch` in a fresh project
- Update documentation with installation commands
- Create git tags for versions

---

## Phase 7: Dependencies Management

### 7.1 Peer Dependencies
Move React Native dependencies to `peerDependencies`:
- `react`
- `react-native`
- `react-native-reanimated`

### 7.2 Dev Dependencies (Root)
Keep in root `devDependencies`:
- TypeScript
- Rollup & plugins
- Build tools
- Testing tools (if any)

### 7.3 Examples Dependencies
Move Expo/React Native dependencies to `examples/package.json`:
- `expo`
- `react-native`
- `react-native-reanimated`
- All app-specific dependencies

---

## Implementation Order

1. ✅ Create examples folder and move demo app
2. ✅ Configure build system (Rollup)
3. ✅ Update root package.json for library
4. ✅ Create examples package.json
5. ✅ Update TypeScript configs
6. ✅ Create .npmignore
7. ✅ Update entry points and exports
8. ✅ Test build process
9. ✅ Test examples app with linked library
10. ✅ Create/update README
11. ✅ Prepare for npm publish

---

## Important Notes

### React Native Reanimated Considerations
- `react-native-reanimated` requires special handling in the build
- Worklets might need specific configuration
- Ensure proper peer dependency setup

### Common Issues to Watch For
1. **Path resolution**: Ensure imports work from `node_modules`
2. **Metro bundler**: React Native apps use Metro, which handles CommonJS/ESM differently
3. **Worklet support**: Reanimated worklets need proper transpilation
4. **Type definitions**: Ensure `.d.ts` files are correctly generated
5. **Assets**: If library includes assets, they need special handling

### Testing Strategy
- Test locally using `npm link` or `file:` protocol
- Verify in both new React Native and Expo projects
- Test TypeScript imports
- Verify tree-shaking works (if applicable)

---

## Estimated Effort

- **Phase 1-3 (Structure & Config)**: ~2-3 hours
- **Phase 4 (Scripts)**: ~30 minutes
- **Phase 5 (Documentation)**: ~1 hour
- **Phase 6 (Publishing)**: ~30 minutes
- **Testing & Debugging**: ~2-3 hours

**Total**: ~6-8 hours

---

This plan provides a complete roadmap for transforming your app into a reusable library while maintaining a working demo app for testing and showcasing.

