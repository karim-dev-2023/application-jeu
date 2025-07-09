import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Timer = ({ duration = 10, onTimeUp, isActive = true, onTick }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(isActive);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeLeft(duration);
    setIsRunning(isActive);
    progressAnim.setValue(1);
  }, [duration, isActive]);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (onTick) onTick(newTime);
          Animated.timing(progressAnim, {
            toValue: newTime / duration,
            duration: 1000,
            useNativeDriver: false,
          }).start();
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      onTimeUp();
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onTimeUp, duration, onTick]);

  useEffect(() => {
    if (timeLeft <= 3 && timeLeft > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [timeLeft]);

  const getTimerColor = () => {
    if (timeLeft <= 3) return ['#ff416c', '#ff4757'];
    if (timeLeft <= 5) return ['#ff9500', '#ff5722'];
    return ['#4facfe', '#00f2fe'];
  };

  const getProgressColor = () => {
    if (timeLeft <= 3) return '#ff416c';
    if (timeLeft <= 5) return '#ff9500';
    return '#4facfe';
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.timerContainer, { transform: [{ scale: pulseAnim }] }]}>
        <LinearGradient
          colors={getTimerColor()}
          style={styles.timerGradient}
        >
          <Text style={styles.timerText}>{timeLeft}s</Text>
        </LinearGradient>
      </Animated.View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: getProgressColor(),
              },
            ]}
          />
        </View>
      </View>
      
      {timeLeft <= 3 && timeLeft > 0 && (
        <Text style={styles.warningText}>⚠️ Hurry up!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerContainer: {
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  timerGradient: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  progressContainer: {
    marginTop: 15,
    width: 200,
  },
  progressBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  warningText: {
    fontSize: 16,
    color: '#ff416c',
    fontWeight: 'bold',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default Timer;
