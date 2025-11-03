import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SunMoonSwitch } from 'rn-sun-moon-switch';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChange = (isLightMode: boolean) => {
    setIsDarkMode(!isLightMode);
    console.log('Theme changed to:', isLightMode ? 'light' : 'dark');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a2e' : '#f0f0f0' }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#333' }]}>
        {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </Text>
      
      <SunMoonSwitch 
        value={!isDarkMode}
        onValueChange={handleThemeChange}
        // width={240}
      />
      
      <Text style={[styles.subtitle, { color: isDarkMode ? '#aaa' : '#666' }]}>
        Tap the switch to change theme
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 30,
  },
});
