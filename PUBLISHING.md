# Publishing Guide for rn-sun-moon-switch

This guide explains how to publish this package to the npm registry.

## Prerequisites

### 1. Create an npm Account

If you don't have an npm account:
1. Go to [npmjs.com](https://www.npmjs.com/)
2. Click "Sign Up" and create an account
3. Verify your email address

### 2. Login to npm CLI

```bash
npm login
```

Enter your:
- Username
- Password
- Email (must match your npm account)
- One-time password (if 2FA is enabled)

Verify you're logged in:
```bash
npm whoami
```

## Pre-Publishing Checklist

### 1. Check Package Name Availability

The package name `rn-sun-moon-switch` may already be taken. Check availability:

```bash
npm search rn-sun-moon-switch
```

If taken, you have options:
- Use a scoped package: `@yourusername/rn-sun-moon-switch`
- Choose a different name: `react-native-sun-moon-toggle`, etc.

To use a scoped package, update `package.json`:
```json
{
  "name": "@yourusername/rn-sun-moon-switch"
}
```

### 2. Update package.json Metadata

Make sure these fields are filled in `package.json`:

```json
{
  "name": "rn-sun-moon-switch",
  "version": "1.0.0",
  "description": "A beautiful animated sun/moon toggle switch component for React Native",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/rn-sun-moon-switch.git"
  },
  "keywords": [
    "react-native",
    "toggle",
    "switch",
    "sun",
    "moon",
    "animated",
    "reanimated",
    "ui",
    "component",
    "theme",
    "dark-mode",
    "light-mode"
  ],
  "bugs": {
    "url": "https://github.com/yourusername/rn-sun-moon-switch/issues"
  },
  "homepage": "https://github.com/yourusername/rn-sun-moon-switch#readme"
}
```

### 3. Verify Files to Publish

Check what will be published:

```bash
npm pack --dry-run
```

This shows you exactly what files will be included. The package should include:
- ✅ `dist/` folder (built files)
- ✅ `src/` folder (source files for react-native field)
- ✅ `README.md`
- ✅ `LICENSE`
- ✅ `package.json`
- ❌ `node_modules/` (excluded via .npmignore)
- ❌ `examples/` (excluded via .npmignore)
- ❌ `.git/` (excluded by default)

### 4. Build the Package

Always build before publishing:

```bash
npm run build
```

Verify build files exist:
```bash
ls -la dist/
```

Should show:
- `index.js`
- `index.esm.js`
- `index.d.ts`
- Source maps

### 5. Test Locally (Optional but Recommended)

Test the package locally before publishing:

```bash
# Create a tarball
npm pack

# This creates rn-sun-moon-switch-1.0.0.tgz
# Install it in another project to test
cd /path/to/test-project
npm install /path/to/rn-sun-moon-switch/rn-sun-moon-switch-1.0.0.tgz
```

## Publishing Steps

### First-Time Publish

1. **Ensure you're in the project root:**
   ```bash
   cd /Users/leonamdepaula/Work/rn-sun-moon-switch
   ```

2. **Run pre-publish checks:**
   ```bash
   npm run build
   npm pack --dry-run
   ```

3. **Publish to npm:**
   
   For public package:
   ```bash
   npm publish
   ```
   
   For scoped package (first time):
   ```bash
   npm publish --access public
   ```

4. **Verify publication:**
   ```bash
   npm view rn-sun-moon-switch
   ```

### Publishing Updates

When you make updates to the package:

1. **Update version in package.json:**
   
   Use semantic versioning (semver):
   - **Patch** (1.0.0 → 1.0.1): Bug fixes
     ```bash
     npm version patch
     ```
   
   - **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
     ```bash
     npm version minor
     ```
   
   - **Major** (1.0.0 → 2.0.0): Breaking changes
     ```bash
     npm version major
     ```

2. **Build and publish:**
   ```bash
   npm run build
   npm publish
   ```

3. **Push tags to git:**
   ```bash
   git push --follow-tags
   ```

## Post-Publishing

### 1. Verify on npm

Visit your package page:
- Public: `https://www.npmjs.com/package/rn-sun-moon-switch`
- Scoped: `https://www.npmjs.com/package/@yourusername/rn-sun-moon-switch`

### 2. Test Installation

Test installing from npm:

```bash
npm install rn-sun-moon-switch
# or
npm install @yourusername/rn-sun-moon-switch
```

### 3. Update GitHub Repository

If you have a GitHub repo:

1. **Create a release:**
   - Go to your repo on GitHub
   - Click "Releases" → "Create a new release"
   - Tag: `v1.0.0`
   - Title: `v1.0.0 - Initial Release`
   - Description: List of features/changes

2. **Add badges to README:**
   ```markdown
   [![npm version](https://badge.fury.io/js/rn-sun-moon-switch.svg)](https://badge.fury.io/js/rn-sun-moon-switch)
   [![npm downloads](https://img.shields.io/npm/dm/rn-sun-moon-switch.svg)](https://www.npmjs.com/package/rn-sun-moon-switch)
   [![license](https://img.shields.io/npm/l/rn-sun-moon-switch.svg)](https://github.com/yourusername/rn-sun-moon-switch/blob/main/LICENSE)
   ```

## Troubleshooting

### Package Name Already Taken

If the name is taken, options:
1. Use a scoped package: `@yourusername/rn-sun-moon-switch`
2. Choose a unique name
3. Contact npm support if you believe you have rights to the name

### 403 Forbidden Error

- Make sure you're logged in: `npm whoami`
- Check package name isn't taken
- For scoped packages, add `--access public`

### Missing Built Files

Error: "Cannot publish, dist files missing"
- Run `npm run build` before publishing
- Check that `prepublishOnly` script runs: `"prepublishOnly": "npm run build"`

### 2FA Required

If you have 2FA enabled:
- npm will prompt for your one-time password
- Or use: `npm publish --otp=123456`

## Best Practices

1. **Always test locally first** using `npm pack`
2. **Use semantic versioning** consistently
3. **Keep a CHANGELOG.md** to document changes
4. **Tag releases in git** matching npm versions
5. **Never publish with uncommitted changes**
6. **Review the package contents** with `npm pack --dry-run`
7. **Update documentation** before publishing

## Quick Reference

```bash
# Login
npm login

# Check what will be published
npm pack --dry-run

# Build
npm run build

# Publish (first time)
npm publish --access public

# Update version and publish
npm version patch  # or minor/major
npm run build
npm publish

# Push to git with tags
git push --follow-tags
```

## Unpublishing (Use with Caution)

You can unpublish within 72 hours:

```bash
# Unpublish a specific version
npm unpublish rn-sun-moon-switch@1.0.0

# Unpublish entire package (not recommended)
npm unpublish rn-sun-moon-switch --force
```

**Note:** Unpublishing is discouraged and has restrictions. Use deprecation instead:

```bash
npm deprecate rn-sun-moon-switch@1.0.0 "This version has been deprecated"
```

## CI/CD Publishing (Advanced)

For automated publishing via GitHub Actions, create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add your npm token as a GitHub secret named `NPM_TOKEN`.

