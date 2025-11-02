import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SunMoonSwitch } from 'rn-sun-moon-switch';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SunMoonSwitch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
