# 🌞🌙 rn-sun-moon-switch

A beautiful animated sun/moon toggle switch component for React Native, powered by `react-native-reanimated`.

## ✨ Features

- 🎨 Smooth animated transitions between sun and moon states
- ⭐ Animated stars that appear during night mode
- ☁️ Cloud animations
- 📱 Fully compatible with React Native and Expo
- 🔧 Built with TypeScript
- 🎯 Zero dependencies (peer dependencies only)

## 📦 Installation

```bash
npm install rn-sun-moon-switch
# or
yarn add rn-sun-moon-switch
```

### Peer Dependencies

This library requires the following peer dependencies:

- `react` (any version)
- `react-native` (any version)
- `react-native-reanimated` (>= 2.0.0)

Make sure you have `react-native-reanimated` installed:

```bash
npm install react-native-reanimated
# or
yarn add react-native-reanimated
```

For Expo projects, `react-native-reanimated` is usually already included. For bare React Native projects, you may need to link the native module.

## 🚀 Quick Start

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SunMoonSwitch } from 'rn-sun-moon-switch';

export default function App() {
  return (
    <View style={styles.container}>
      <SunMoonSwitch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
```

## 📖 Usage

The `SunMoonSwitch` component is a fully self-contained toggle switch. Simply import and use it:

```tsx
import { SunMoonSwitch } from 'rn-sun-moon-switch';

<SunMoonSwitch />
```

The component manages its own internal state and provides smooth animations when toggled between day (sun) and night (moon) modes.

## 🎨 Customization

Currently, the component uses default styling and animations. Customization options may be added in future versions.

## 🛠️ Development

To set up the development environment:

1. Clone the repository:
```bash
git clone <repository-url>
cd rn-sun-moon-switch
```

2. Install dependencies:
```bash
npm install
```

3. Build the library:
```bash
npm run build
```

4. Run the example app:
```bash
npm run example
# Then navigate to examples/ and run npm install if needed
```

### Build Commands

- `npm run build` - Build the library for production
- `npm run watch` - Build in watch mode for development
- `npm run example` - Start the example Expo app

## 📝 Examples

Check out the `examples/` folder for a complete working example of the component in an Expo app.

To run the example:

```bash
cd examples
npm install
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 🙏 Acknowledgments

Built with:
- [React Native](https://reactnative.dev/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

---

Made with ❤️ for the React Native community

