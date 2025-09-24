import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LAYOUT, TYPOGRAPHY, SHADOWS } from '../constants';
import { THEME } from '../theme';

interface CatProfileCardProps {
  breed: string;
  location: string;
  number: string;
  imageUri: string;
}

export default function CatProfileCard({
  breed,
  location,
  number,
  imageUri,
}: CatProfileCardProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <Text style={styles.breed}>{breed}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
        <Text style={styles.number}>{number}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: LAYOUT.CARD_WIDTH,
    height: LAYOUT.CARD_HEIGHT,
    borderRadius: LAYOUT.BORDER_RADIUS.LARGE,
    overflow: 'hidden',
    backgroundColor: THEME.colors.background.primary,
    ...SHADOWS.LARGE,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: THEME.colors.overlay.light,
    paddingHorizontal: LAYOUT.PADDING.LG,
    paddingVertical: LAYOUT.PADDING.MD,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  textContainer: {
    flex: 1,
  },
  breed: {
    fontSize: TYPOGRAPHY.FONT_SIZES.XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHTS.BOLD,
    color: THEME.colors.text.primary,
    marginBottom: LAYOUT.SPACING.XS,
  },
  location: {
    fontSize: TYPOGRAPHY.FONT_SIZES.SM,
    color: THEME.colors.text.secondary,
    fontWeight: TYPOGRAPHY.FONT_WEIGHTS.MEDIUM,
  },
  number: {
    fontSize: TYPOGRAPHY.FONT_SIZES.XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHTS.BOLD,
    color: THEME.colors.text.primary,
  },
});
