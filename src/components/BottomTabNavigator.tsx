import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { FeedScreen, ProfileScreen, ChatsScreen } from '@/screens';
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
          paddingBottom: LAYOUT.PADDING.SM,
          paddingTop: LAYOUT.PADDING.SM,
          height: 70,
          borderRadius: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: THEME.colors.brand.secondary, // Warm color for active tab
        tabBarInactiveTintColor: THEME.colors.text.secondary, // Secondary text color for inactive tabs
        tabBarLabelStyle: {
          fontSize: 0, // Hide labels
          display: 'none',
        },
        tabBarIconStyle: {
          marginTop: LAYOUT.SPACING.XS,
        },
      }}
    >
      <Tab.Screen
        name='Feed'
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name='paw' color={color} size={28} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name='Chats'
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name='chat' color={color} size={28} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name='person' color={color} size={28} focused={focused} />
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
  focused,
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
