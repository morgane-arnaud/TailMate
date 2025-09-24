import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { CardStack, type CardStackRef } from '@/components';
import { LAYOUT } from '@/constants';
import { THEME } from '@/theme';
import {
  useGetCatsQuery,
  useVoteForCatMutation,
  useLazyGetCatsQuery,
} from '@/store/catApi';
import { Cat } from '@/types/cat.types';

export default function FeedScreen() {
  const cardStackRef = useRef<CardStackRef>(null);
  const [allCats, setAllCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastLoadTriggerIndex, setLastLoadTriggerIndex] = useState(-1);

  // Initial load
  const {
    data: initialCats,
    isLoading: isInitialLoading,
    error: initialError,
  } = useGetCatsQuery({ limit: 10, page: 0 });

  // Lazy query for loading more cats
  const [fetchMoreCats] = useLazyGetCatsQuery();

  const [voteForCat, { isLoading: isVoting }] = useVoteForCatMutation();

  // Retry function for error states
  const handleRetry = () => {
    setAllCats([]);
    setCurrentIndex(0);
    setCurrentPage(0);
    setLastLoadTriggerIndex(-1);
    // The initial query will automatically refetch when the component re-renders
  };

  // Function to preload images for the top cards
  const preloadImages = useCallback((cats: Cat[], startIndex: number = 0) => {
    // Preload the next 10 images starting from startIndex for better performance
    const imagesToPreload = cats.slice(startIndex, startIndex + 10);

    // Preload all images immediately without delay
    imagesToPreload.forEach((cat, index) => {
      if (cat.url) {
        Image.prefetch(cat.url).catch((error) => {
          console.warn(
            `Failed to preload image ${startIndex + index + 1}:`,
            cat.url,
            error
          );
        });
      }
    });
  }, []);

  // Load initial cats when they arrive
  useEffect(() => {
    if (initialCats && initialCats.length > 0) {
      setAllCats(initialCats);
      // Aggressively preload the first 10 images immediately
      preloadImages(initialCats, 0);
    }
  }, [initialCats, preloadImages]);

  // Function to load more cats using pagination
  const loadMoreCats = useCallback(async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      // Use lazy query to fetch the next page
      const result = await fetchMoreCats({ limit: 10, page: nextPage });
      const newCats = result.data;

      // Update the page for the next query
      setCurrentPage(nextPage);

      if (newCats && Array.isArray(newCats)) {
        setAllCats((prev) => {
          const updatedCats = [...prev, ...newCats];
          // Preload the newly loaded images
          preloadImages(newCats, 0);
          return updatedCats;
        });
      }
    } catch (error) {
      console.error('Failed to load more cats:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, fetchMoreCats, isLoadingMore, preloadImages]);

  // Load more cats when reaching cat 9 (index 8) or when approaching the end
  useEffect(() => {
    const remainingCats = allCats.length - currentIndex;
    const shouldLoadMore =
      (currentIndex === 8 &&
        allCats.length >= 10 &&
        lastLoadTriggerIndex !== 8) || // Load when reaching cat 9
      (remainingCats <= 3 &&
        allCats.length > 0 &&
        currentIndex > lastLoadTriggerIndex); // Or when 3 or fewer cats remain

    if (shouldLoadMore && !isLoadingMore) {
      setLastLoadTriggerIndex(currentIndex);
      loadMoreCats();
    }
  }, [currentIndex, allCats.length, isLoadingMore, lastLoadTriggerIndex]); // Remove loadMoreCats from dependencies

  // Preload upcoming images when user gets close to unloaded content
  useEffect(() => {
    if (allCats.length > 0 && currentIndex >= 5) {
      // When user reaches card 6, preload the next batch
      const startPreloadIndex = currentIndex + 5;
      if (startPreloadIndex < allCats.length) {
        preloadImages(allCats, startPreloadIndex);
      }
    }
  }, [currentIndex, allCats, preloadImages]);

  // Voting functions that handle API calls and state updates
  const handleVoteDislike = async () => {
    if (allCats.length > currentIndex) {
      const currentCat = allCats[currentIndex];
      try {
        await voteForCat({
          image_id: currentCat.id,
          value: 0, // 0 for dislike
        }).unwrap();
        // Move to next cat after successful vote
        setCurrentIndex((prev) => prev + 1);
      } catch (error) {
        console.error('Failed to vote dislike:', error);
        // Still move to next card even if vote fails
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  const handleVoteLike = async () => {
    if (allCats.length > currentIndex) {
      const currentCat = allCats[currentIndex];
      try {
        await voteForCat({
          image_id: currentCat.id,
          value: 1, // 1 for like
        }).unwrap();
        // Move to next cat after successful vote
        setCurrentIndex((prev) => prev + 1);
      } catch (error) {
        console.error('Failed to vote like:', error);
        // Still move to next card even if vote fails
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  // Button handlers that only trigger animation (voting happens after animation)
  const handleDislikeButton = () => {
    cardStackRef.current?.animateSwipeLeft();
  };

  const handleLikeButton = () => {
    cardStackRef.current?.animateSwipeRight();
  };

  if (isInitialLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size='large' color={THEME.colors.brand.primary} />
        <Text style={styles.loadingText}>Loading cats...</Text>
      </View>
    );
  }

  if (initialError) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Failed to load cats</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!allCats || allCats.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>No cats available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CardStack
        ref={cardStackRef}
        cats={allCats}
        onSwipeLeft={handleVoteDislike}
        onSwipeRight={handleVoteLike}
        currentIndex={currentIndex}
      />

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.button]}
          onPress={handleDislikeButton}
          disabled={isVoting || isLoadingMore}
        >
          <Text style={[styles.buttonText, styles.dislikeButtonText]}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.button]}
          onPress={handleLikeButton}
          disabled={isVoting || isLoadingMore}
        >
          <Text style={styles.buttonText}>♥</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background.secondary,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: LAYOUT.PADDING.MD,
    fontSize: 16,
    color: THEME.colors.text.secondary,
  },
  errorText: {
    fontSize: 16,
    color: THEME.colors.status.error,
    textAlign: 'center',
    marginBottom: LAYOUT.PADDING.MD,
  },
  retryButton: {
    backgroundColor: THEME.colors.brand.primary,
    paddingHorizontal: LAYOUT.PADDING.LG,
    paddingVertical: LAYOUT.PADDING.MD,
    borderRadius: LAYOUT.BORDER_RADIUS.MEDIUM,
  },
  retryButtonText: {
    color: THEME.colors.text.primary,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: LAYOUT.PADDING.XL,
    marginBottom: LAYOUT.PADDING.XXL,
    gap: 40,
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: THEME.colors.background.primary,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  dislikeButtonText: {
    color: '#FF4458',
  },
});
