# Usage Examples

## Basic Usage (Uncontrolled)

The simplest way to use the component - it manages its own state:

```tsx
import { SunMoonSwitch } from 'rn-sun-moon-switch';

export default function App() {
  return (
    <View>
      <SunMoonSwitch 
        onValueChange={(isDayMode) => {
          console.log('Theme changed:', isDayMode ? 'light' : 'dark');
        }}
      />
    </View>
  );
}
```

## Controlled Mode (Theme Switcher)

Perfect for integrating with your app's theme system:

```tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SunMoonSwitch } from 'rn-sun-moon-switch';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChange = (isLightMode: boolean) => {
    setIsDarkMode(!isLightMode);
    // Update your theme context/provider here
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <SunMoonSwitch 
        value={!isDarkMode}
        onValueChange={handleThemeChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

## With React Context (Theme Provider)

Integrate with a theme context:

```tsx
// ThemeContext.tsx
import React, { createContext, useState, useContext } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

// App.tsx
import { SunMoonSwitch } from 'rn-sun-moon-switch';
import { ThemeProvider, useTheme } from './ThemeContext';

function ThemeSwitcher() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <SunMoonSwitch 
      value={!isDarkMode}
      onValueChange={toggleTheme}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <ThemeSwitcher />
      </View>
    </ThemeProvider>
  );
}
```

## Custom Colors

Match your brand colors:

```tsx
<SunMoonSwitch 
  dayBackgroundColor="#FFD700"
  nightBackgroundColor="#1a1a2e"
  onValueChange={(isDay) => console.log(isDay)}
/>
```

## Different Widths

```tsx
// Smaller
<SunMoonSwitch width={120} />

// Default
<SunMoonSwitch width={180} />

// Larger
<SunMoonSwitch width={240} />

// Extra large
<SunMoonSwitch width={300} />
```

## Custom Animation Duration

```tsx
// Faster animation (500ms)
<SunMoonSwitch animationDuration={500} />

// Slower animation (2500ms)
<SunMoonSwitch animationDuration={2500} />
```

## Disabled State

```tsx
<SunMoonSwitch 
  disabled={true}
  value={false}
/>
```

## With AsyncStorage (Persist Theme)

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { SunMoonSwitch } from 'rn-sun-moon-switch';

const THEME_KEY = '@app_theme';

export default function App() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme !== null) {
        setIsLightMode(savedTheme === 'light');
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = async (isDay: boolean) => {
    setIsLightMode(isDay);
    try {
      await AsyncStorage.setItem(THEME_KEY, isDay ? 'light' : 'dark');
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  if (loading) return null;

  return (
    <View>
      <SunMoonSwitch 
        value={isLightMode}
        onValueChange={handleThemeChange}
      />
    </View>
  );
}
```

## All Props Example

```tsx
<SunMoonSwitch 
  // Controlled mode
  value={true}
  onValueChange={(isDay) => console.log('Changed to:', isDay)}
  
  // Or uncontrolled mode
  defaultValue={true}
  
  // Customization
  dayBackgroundColor="#3686ef"
  nightBackgroundColor="#333"
  animationDuration={1500}
  width={180}
  disabled={false}
  
  // Style and testing
  style={{ marginTop: 20 }}
  testID="theme-switch"
/>
```

