import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Result({ route }) {
  // Récupération des paramètres passés depuis la navigation
  const { won, baseNumber, score } = route.params || {};

  return (
    <View style={styles.container}>
      {won ? (
        <>
          <Text style={styles.title}>You've won</Text>
          <Text style={styles.text}>
            baseNumber was {baseNumber} and score {score}
          </Text>
          {/* Illustration trophée */}
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/616/616494.png',
            }}
            style={styles.trophy}
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>You've lost</Text>
          <Text style={styles.text}>
            baseNumber was {baseNumber} and score {score}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  trophy: {
    width: 80,
    height: 80,
    marginTop: 10,
  },
});
