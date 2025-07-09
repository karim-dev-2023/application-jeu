import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ConfettiAnimation from '../components/ConfettiAnimation';
import FloatingParticles from '../components/FloatingParticles';

const { width, height } = Dimensions.get('window');

export default function Result({ route }) {
  const { won, baseNumber, score, timeUp } = route.params || {};
  const navigation = useNavigation();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowConfetti(true);
    }, 500);
  }, []);

  const gradientColors = won 
    ? ['#56ab2f', '#a8e6cf'] 
    : ['#ff416c', '#ff4757'];

  const getResultMessage = () => {
    if (timeUp) return "Time's Up!";
    return won ? "You've Won!" : "You've Lost!";
  };

  const getResultEmoji = () => {
    if (timeUp) return '⏰';
    return won ? '🎉' : '😅';
  };

  const getDetailsText = () => {
    if (timeUp) {
      return "You didn't answer in time!";
    }
    return `Base number was ${baseNumber}\nYour score was ${score}`;
  };

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.container}
    >
      <FloatingParticles 
        count={timeUp ? 8 : (won ? 15 : 10)} 
        colors={timeUp ? ['rgba(255,255,255,0.3)', 'rgba(255,193,7,0.4)'] : 
                (won ? ['rgba(255,255,255,0.6)', 'rgba(255,235,59,0.5)'] : 
                       ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)'])} 
        size={timeUp ? 5 : (won ? 8 : 4)}
      />
      
      <ConfettiAnimation isWin={won && !timeUp} trigger={showConfetti} />
      
      <View style={styles.content}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>
            {getResultEmoji()}
          </Text>
          
          <Text style={styles.title}>
            {getResultMessage()}
          </Text>
          
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>
              {getDetailsText()}
            </Text>
          </View>

          {won && !timeUp && (
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/616/616494.png',
              }}
              style={styles.trophy}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.3)']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>🏠 Back to Home</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Game')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 1)']}
            style={styles.buttonGradient}
          >
            <Text style={[styles.buttonText, { color: won ? '#56ab2f' : '#ff416c' }]}>
              🎮 Play Again
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  resultContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
    padding: 40,
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
    opacity: 0.9,
  },
  trophy: {
    width: 80,
    height: 80,
    marginTop: 15,
  },
  button: {
    borderRadius: 25,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonGradient: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: height * 0.1,
    left: width * 0.05,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: height * 0.1,
    right: width * 0.1,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  decorativeCircle3: {
    position: 'absolute',
    top: height * 0.25,
    right: width * 0.05,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
});
