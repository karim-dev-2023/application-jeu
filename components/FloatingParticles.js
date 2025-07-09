import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const FloatingParticles = ({ count = 8, colors = ['#fff', '#f0f0f0'], size = 4 }) => {
  const particles = useRef([]);

  useEffect(() => {
    particles.current = Array.from({ length: count }, (_, i) => ({
      translateY: new Animated.Value(Math.random() * height),
      translateX: new Animated.Value(Math.random() * width),
      opacity: new Animated.Value(Math.random() * 0.5 + 0.3),
      scale: new Animated.Value(Math.random() * 0.5 + 0.5),
    }));

    const animateParticles = () => {
      particles.current.forEach((particle, index) => {
        const duration = 3000 + Math.random() * 2000;
        
        Animated.loop(
          Animated.sequence([
            Animated.timing(particle.translateY, {
              toValue: -50,
              duration: duration,
              useNativeDriver: true,
            }),
            Animated.timing(particle.translateY, {
              toValue: height + 50,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ).start();

        Animated.loop(
          Animated.sequence([
            Animated.timing(particle.translateX, {
              toValue: particle.translateX._value + (Math.random() - 0.5) * 100,
              duration: duration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(particle.translateX, {
              toValue: particle.translateX._value + (Math.random() - 0.5) * 100,
              duration: duration / 2,
              useNativeDriver: true,
            }),
          ])
        ).start();

        Animated.loop(
          Animated.sequence([
            Animated.timing(particle.opacity, {
              toValue: 0.8,
              duration: duration / 3,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0.2,
              duration: duration / 3,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0.6,
              duration: duration / 3,
              useNativeDriver: true,
            }),
          ])
        ).start();

        Animated.loop(
          Animated.sequence([
            Animated.timing(particle.scale, {
              toValue: 1.2,
              duration: duration / 4,
              useNativeDriver: true,
            }),
            Animated.timing(particle.scale, {
              toValue: 0.8,
              duration: duration / 4,
              useNativeDriver: true,
            }),
            Animated.timing(particle.scale, {
              toValue: 1,
              duration: duration / 2,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    };

    animateParticles();
  }, [count]);

  return (
    <View style={styles.container}>
      {particles.current.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              backgroundColor: colors[index % colors.length],
              width: size + Math.random() * 4,
              height: size + Math.random() * 4,
              transform: [
                { translateX: particle.translateX },
                { translateY: particle.translateY },
                { scale: particle.scale },
              ],
              opacity: particle.opacity,
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
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
  },
});

export default FloatingParticles;
