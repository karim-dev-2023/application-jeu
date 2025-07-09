import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AnimatedButton({ action, onPress, disabled = false }) {
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (disabled) return;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start(() => {
        if (onPress) onPress();
      });
    });
  };

  const isHigher = action === 'higher';
  const gradientColors = isHigher
    ? ['#56ab2f', '#a8e6cf']
    : ['#ff416c', '#ff4757'];

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.button,
          { opacity: disabled ? 0.5 : opacity, transform: [{ scale }] }
        ]}
      >
        <LinearGradient
          colors={gradientColors}
          style={styles.buttonGradient}
        >
          <Text style={styles.icon}>
            {isHigher ? '⬆️' : '⬇️'}
          </Text>
          <Text style={styles.buttonText}>
            {isHigher ? 'Higher' : 'Lower'}
          </Text>
        </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginHorizontal: 10,
  },
  buttonGradient: {
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 30,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
