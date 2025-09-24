import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import CatProfileCard from './CatProfileCard';
import { LAYOUT } from '../constants';

interface SwipeableCardProps {
  breed: string;
  location: string;
  number: string;
  imageUri: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isTop: boolean;
}

export interface SwipeableCardRef {
  animateSwipeLeft: () => void;
  animateSwipeRight: () => void;
}

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.25; // 25% of screen width to trigger swipe

const SwipeableCard = forwardRef<SwipeableCardRef, SwipeableCardProps>(
  (
    { breed, location, number, imageUri, onSwipeLeft, onSwipeRight, isTop },
    ref
  ) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    const panGesture = Gesture.Pan()
      .onChange((event) => {
        translateX.setValue(event.translationX);
        translateY.setValue(event.translationY);
        rotate.setValue(event.translationX / 10);
      })
      .onEnd((event) => {
        const { translationX, translationY, velocityX } = event;

        // Check if swipe threshold is met
        if (
          Math.abs(translationX) > SWIPE_THRESHOLD ||
          Math.abs(velocityX) > 500
        ) {
          // Determine swipe direction and store it
          const isSwipeRight = translationX > 0;

          // Animate card off screen
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: isSwipeRight ? screenWidth : -screenWidth,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: translationY,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(rotate, {
              toValue: isSwipeRight ? 30 : -30,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Call voting function (which handles state update with delay)
            if (isSwipeRight) {
              onSwipeRight();
            } else {
              onSwipeLeft();
            }
          });
        } else {
          // Snap back to center
          Animated.parallel([
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
              tension: 100,
              friction: 8,
            }),
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              tension: 100,
              friction: 8,
            }),
            Animated.spring(rotate, {
              toValue: 0,
              useNativeDriver: true,
              tension: 100,
              friction: 8,
            }),
          ]).start();
        }
      });

    const animateSwipeLeft = () => {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -screenWidth,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: -30,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onSwipeLeft();
      });
    };

    const animateSwipeRight = () => {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: screenWidth,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 30,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onSwipeRight();
      });
    };

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      animateSwipeLeft,
      animateSwipeRight,
    }));

    // Only allow gestures on the top card
    if (!isTop) {
      return (
        <View style={styles.cardContainer}>
          <CatProfileCard
            breed={breed}
            location={location}
            number={number}
            imageUri={imageUri}
          />
        </View>
      );
    }

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.cardContainer,
            {
              transform: [
                { translateX },
                { translateY },
                {
                  rotate: rotate.interpolate({
                    inputRange: [-50, 0, 50],
                    outputRange: ['-30deg', '0deg', '30deg'],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              opacity,
            },
          ]}
        >
          <CatProfileCard
            breed={breed}
            location={location}
            number={number}
            imageUri={imageUri}
          />
        </Animated.View>
      </GestureDetector>
    );
  }
);

export default React.memo(SwipeableCard);

const styles = StyleSheet.create({
  cardContainer: {
    width: LAYOUT.CARD_WIDTH,
    height: LAYOUT.CARD_HEIGHT,
  },
});
