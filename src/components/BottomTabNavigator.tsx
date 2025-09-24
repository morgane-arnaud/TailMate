import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import FeedScreen from '@/screens/FeedScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import ChatsScreen from '@/screens/ChatsScreen';
import { THEME } from '@/theme';
import { LAYOUT } from '@/constants';
import PawIcon from 'assets/pawIcon';
import UserIcon from 'assets/userIcon';
import ChatIcon from 'assets/chatIcon';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: THEME.colors.background.primary,
          borderTopWidth: 0,
          paddingHorizontal: LAYOUT.PADDING.SM,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
          borderRadius: 20,
          elevation: 9,
          shadowOpacity: 0.1,
          position: 'absolute',
          bottom: 40,
          left: 65,
          right: 65,
          marginHorizontal: 65,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarActiveTintColor: THEME.colors.brand.primary,
        tabBarInactiveTintColor: THEME.colors.text.secondary,
        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          display: 'none',
          fontSize: 0,
        },
      }}
    >
      <Tab.Screen
        name='Feed'
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => <PawIcon color={color} />,
        }}
      />
      <Tab.Screen
        name='Chats'
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color }) => <ChatIcon color={color} />,
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
