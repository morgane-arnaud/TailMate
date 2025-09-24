import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TYPOGRAPHY } from '@/constants';
import { THEME } from '@/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: TYPOGRAPHY.FONT_SIZES.XXXL,
    color: THEME.colors.text.tertiary,
    fontWeight: TYPOGRAPHY.FONT_WEIGHTS.BOLD,
  },
});
