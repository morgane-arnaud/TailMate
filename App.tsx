import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { BottomTabNavigator } from '@/components';
import { THEME } from '@/theme';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
      <StatusBar
        style='dark'
        backgroundColor={THEME.colors.background.primary}
      />
    </NavigationContainer>
  );
}
