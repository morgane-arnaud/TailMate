import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import FeedScreen from '@/screens/FeedScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import ChatsScreen from '@/screens/ChatsScreen';
import { THEME } from '@/theme';
import { LAYOUT } from '@/constants';

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
          height: 60,
          borderRadius: 20,
          elevation: 9,
          shadowOpacity: 0.1,
          position: 'absolute',
          bottom: 40,
          left: 45,
          right: 45,
          marginHorizontal: 45,
        },
        tabBarActiveTintColor: THEME.colors.brand.primary,
        tabBarInactiveTintColor: THEME.colors.text.secondary,
        tabBarIconStyle: {
          marginTop: LAYOUT.SPACING.XS,
        },
      }}
    >
      <Tab.Screen
        name='Feed'
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name='paw' color={color} size={20} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name='Chats'
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name='chat' color={color} size={20} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name='person' color={color} size={20} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Simple icon component using text symbols
function TabIcon({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
  focused?: boolean;
}) {
  const getIcon = () => {
    switch (name) {
      case 'paw':
        return '🐾';
      case 'chat':
        return '💬';
      case 'person':
        return '👤';
      default:
        return '?';
    }
  };

  return <Text style={{ fontSize: size, color }}>{getIcon()}</Text>;
}
