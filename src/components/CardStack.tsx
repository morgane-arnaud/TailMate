import React, {
  useCallback,
  useImperativeHandle,
  forwardRef,
  useRef,
  useMemo,
} from 'react';
import { View, StyleSheet } from 'react-native';
import SwipeableCard from './SwipeableCard';
import { Cat } from '../types/cat.types';
import { LAYOUT } from '../constants';

interface CardStackProps {
  cats: Cat[];
  onSwipeLeft: () => Promise<void>;
  onSwipeRight: () => Promise<void>;
  currentIndex: number;
}

export interface CardStackRef {
  animateSwipeLeft: () => void;
  animateSwipeRight: () => void;
}

const CardStack = forwardRef<CardStackRef, CardStackProps>(
  ({ cats, onSwipeLeft, onSwipeRight, currentIndex }, ref) => {
    const topCardRef = useRef<any>(null);

    const handleSwipeLeft = useCallback(async () => {
      await onSwipeLeft();
    }, [onSwipeLeft]);

    const handleSwipeRight = useCallback(async () => {
      await onSwipeRight();
    }, [onSwipeRight]);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      animateSwipeLeft: () => {
        if (topCardRef.current) {
          topCardRef.current.animateSwipeLeft();
        }
      },
      animateSwipeRight: () => {
        if (topCardRef.current) {
          topCardRef.current.animateSwipeRight();
        }
      },
    }));

    // Show loading or empty state if no more cards
    if (!cats || cats.length === 0 || currentIndex >= cats.length) {
      return null;
    }

    // Render cards for all available cats, but only show the current stack
    const cardComponents = useMemo(() => {
      return cats.map((cat, catIndex) => {
        const stackIndex = catIndex - currentIndex;

        // Only show cards in the current stack (0-4 positions ahead)
        const isInStack = stackIndex >= 0 && stackIndex < 5;
        const isTop = stackIndex === 0;
        const zIndex = isInStack ? 5 - stackIndex : 0;

        return (
          <View
            key={cat.id} // Stable key based on cat ID
            style={[
              styles.cardWrapper,
              {
                zIndex,
                opacity: isInStack ? 1 : 0, // Hide cards not in current stack
                pointerEvents: isTop && isInStack ? 'auto' : 'none', // Only top card in stack can be interacted with
              },
            ]}
          >
            <SwipeableCard
              ref={isTop ? topCardRef : null}
              breed={cat.breeds?.[0]?.name || 'Unknown Breed'}
              location={cat.breeds?.[0]?.origin || 'Unknown Origin'}
              number={`${catIndex + 1}`}
              imageUri={cat.url}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              isTop={true} // Always set to true, control interaction via pointerEvents
            />
          </View>
        );
      });
    }, [cats, currentIndex, handleSwipeLeft, handleSwipeRight]);

    return <View style={styles.container}>{cardComponents}</View>;
  }
);

export default CardStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: LAYOUT.CARD_WIDTH + 40, // Extra width for card shadows
    height: LAYOUT.CARD_HEIGHT + 40, // Extra height for card shadows
  },
  cardWrapper: {
    position: 'absolute',
    width: LAYOUT.CARD_WIDTH,
    height: LAYOUT.CARD_HEIGHT,
  },
});
