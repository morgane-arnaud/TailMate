import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CatProfileCard from '@/components/CatProfileCard';
import { LAYOUT } from '@/constants';
import { THEME } from '@/theme';

export default function FeedScreen() {
  // Sample cat data - replace with real data later
  const sampleCat = {
    id: '1',
    breed: 'Abyssinian',
    location: 'Egypt',
    number: '4',
    imageUri:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=600&fit=crop&crop=face',
  };

  const { breed, location, number, imageUri, id } = sampleCat;

  return (
    <View style={styles.container}>
      <View key={id} style={styles.cardContainer}>
        <CatProfileCard
          breed={breed}
          location={location}
          number={number}
          imageUri={imageUri}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingVertical: LAYOUT.PADDING.XL,
    paddingHorizontal: LAYOUT.PADDING.XL,
    paddingBottom: 100, // Extra padding for bottom navigation
  },
  cardContainer: {
    marginBottom: LAYOUT.PADDING.XL,
  },
});
