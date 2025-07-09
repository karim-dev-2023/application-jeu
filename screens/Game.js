import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedButton from "../components/AnimatedButton";
import FloatingParticles from "../components/FloatingParticles";
import Timer from "../components/Timer";

const { width, height } = Dimensions.get('window');

export default function Game() {
  const [choice, setChoice] = useState("");
  const [baseNumber] = useState(Math.floor(Math.random() * 100));
  const [score] = useState(Math.floor(Math.random() * 100));
  const [gameActive, setGameActive] = useState(true);

  const navigation = useNavigation();

  const handleTimeUp = () => {
    setGameActive(false);
    navigation.navigate('Result', {
      won: false,
      baseNumber: baseNumber,
      score: score,
      timeUp: true
    });
  };

  const handleChoice = (selectedChoice) => {
    if (!gameActive) return;
    setChoice(selectedChoice);
    setGameActive(false);
  };

  useEffect(() => {
    if (choice && !gameActive) {
      const winner =
        (choice === "higher" && score > baseNumber) ||
        (choice === "lower" && baseNumber > score);

      navigation.navigate('Result', {
        won: winner,
        baseNumber: baseNumber,
        score: score,
        timeUp: false
      });
      setChoice("");
    }
  }, [choice, baseNumber, score, navigation, gameActive]);

  return (
    <LinearGradient
      colors={['#2193b0', '#6dd5ed']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      <FloatingParticles 
        count={10} 
        colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.6)']} 
        size={4}
      />
      
      <View style={styles.content}>
        <Text style={styles.gameTitle}>🎯 Guess the Number!</Text>
        
        <Timer 
          duration={15}
          onTimeUp={handleTimeUp}
          isActive={gameActive}
        />
        
        <View style={styles.numberContainer}>
          <Text style={styles.label}>Starting Number</Text>
          <Text style={styles.baseNumber}>{baseNumber}</Text>
        </View>
        
        <Text style={styles.instruction}>
          Will the next number be higher or lower?
        </Text>

        <View style={styles.buttonContainer}>
          <AnimatedButton 
            action="higher" 
            onPress={() => handleChoice("higher")}
            disabled={!gameActive}
          />
          <AnimatedButton 
            action="lower" 
            onPress={() => handleChoice("lower")}
            disabled={!gameActive}
          />
        </View>
      </View>
      
      <View style={styles.decorativeElement1} />
      <View style={styles.decorativeElement2} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  gameTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  numberContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    opacity: 0.9,
  },
  baseNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  instruction: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  decorativeElement1: {
    position: 'absolute',
    top: height * 0.1,
    left: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeElement2: {
    position: 'absolute',
    bottom: height * 0.2,
    right: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});
