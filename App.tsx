import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { BottomTabNavigator } from '@/components';
import { THEME } from '@/theme';
import { store } from '@/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator />
        <StatusBar
          style='dark'
          backgroundColor={THEME.colors.background.primary}
        />
      </NavigationContainer>
    </Provider>
  );
}
