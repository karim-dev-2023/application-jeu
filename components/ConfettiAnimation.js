import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const ConfettiAnimation = ({ isWin = true, trigger = false }) => {
  const confettiPieces = useRef([]);
  const confettiColors = isWin 
    ? ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7']
    : ['#636e72', '#2d3436', '#74b9ff', '#fd79a8', '#fdcb6e'];

  useEffect(() => {
    if (trigger) {
      const pieceCount = isWin ? 50 : 30;
      
      confettiPieces.current = Array.from({ length: pieceCount }, (_, i) => ({
        translateY: new Animated.Value(-50),
        translateX: new Animated.Value(Math.random() * width),
        rotate: new Animated.Value(0),
        opacity: new Animated.Value(1),
        scale: new Animated.Value(1),
      }));

      const animateConfetti = () => {
        confettiPieces.current.forEach((piece, index) => {
          const fallDuration = 2000 + Math.random() * 1000;
          const rotateDuration = 1000 + Math.random() * 500;
          
          Animated.timing(piece.translateY, {
            toValue: height + 100,
            duration: fallDuration,
            useNativeDriver: true,
          }).start();

          Animated.loop(
            Animated.timing(piece.rotate, {
              toValue: 360,
              duration: rotateDuration,
              useNativeDriver: true,
            })
          ).start();

          Animated.sequence([
            Animated.delay(fallDuration * 0.7),
            Animated.timing(piece.opacity, {
              toValue: 0,
              duration: fallDuration * 0.3,
              useNativeDriver: true,
            }),
          ]).start();

          Animated.sequence([
            Animated.timing(piece.scale, {
              toValue: 1.2,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(piece.scale, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        });
      };

      animateConfetti();
    }
  }, [trigger, isWin]);

  if (!trigger) return null;

  return (
    <View style={styles.container}>
      {confettiPieces.current.map((piece, index) => (
        <Animated.View
          key={index}
          style={[
            styles.confetti,
            {
              backgroundColor: confettiColors[index % confettiColors.length],
              transform: [
                { translateX: piece.translateX },
                { translateY: piece.translateY },
                { rotate: piece.rotate.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }) },
                { scale: piece.scale },
              ],
              opacity: piece.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1000,
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 2,
  },
});

export default ConfettiAnimation;
