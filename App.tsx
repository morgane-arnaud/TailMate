import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomTabNavigator } from '@/components';
import { THEME } from '@/theme';
import { store } from '@/store';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <BottomTabNavigator />
          <StatusBar
            style='dark'
            backgroundColor={THEME.colors.background.primary}
          />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
