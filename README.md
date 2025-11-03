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

### Basic Usage (Uncontrolled)

The component can manage its own state:

```tsx
import { SunMoonSwitch } from 'rn-sun-moon-switch';

<SunMoonSwitch 
  onValueChange={(isLightMode) => {
    console.log('Theme:', isLightMode ? 'light' : 'dark');
  }}
/>
```

### Controlled Mode (Recommended for Theme Switching)

Perfect for integrating with your app's theme system:

```tsx
import React, { useState } from 'react';
import { SunMoonSwitch } from 'rn-sun-moon-switch';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <SunMoonSwitch 
      value={!isDarkMode}
      onValueChange={(isLightMode) => setIsDarkMode(!isLightMode)}
    />
  );
}
```

## 🎨 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | `undefined` | Current value (true = light/day, false = dark/night). Makes component controlled. |
| `onValueChange` | `(value: boolean) => void` | `undefined` | Callback fired when switch is toggled. |
| `defaultValue` | `boolean` | `true` | Initial value for uncontrolled mode. |
| `dayBackgroundColor` | `string` | `"#3686ef"` | Background color for light/day mode. |
| `nightBackgroundColor` | `string` | `"#333"` | Background color for dark/night mode. |
| `animationDuration` | `number` | `1500` | Animation duration in milliseconds. |
| `disabled` | `boolean` | `false` | Disables user interaction. |
| `width` | `number` | `180` | Width in pixels. Height is auto-calculated (3:1 ratio). |
| `style` | `ViewStyle` | `undefined` | Additional style for the container. |
| `testID` | `string` | `undefined` | Test ID for testing purposes. |

## 💡 Examples

### Custom Colors

```tsx
<SunMoonSwitch 
  dayBackgroundColor="#FFD700"
  nightBackgroundColor="#1a1a2e"
/>
```

### Different Widths

```tsx
<SunMoonSwitch width={120} /> {/* Smaller */}
<SunMoonSwitch width={180} /> {/* Default */}
<SunMoonSwitch width={240} /> {/* Larger */}
```

### With Theme Context

```tsx
import { useTheme } from './ThemeContext';

function ThemeSwitcher() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <SunMoonSwitch 
      value={!isDarkMode}
      onValueChange={toggleTheme}
    />
  );
}
```

See [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md) for more detailed examples including AsyncStorage integration and React Context usage.

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

