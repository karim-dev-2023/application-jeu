import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, StyleSheet, View, StatusBar,Button,Text } from "react-native";

export default function Game() {
  const [choice, setChoice] = useState("");
  const baseNumber = Math.floor(Math.random() * 100);
  const score = Math.floor(Math.random() * 100);

  const navigation = useNavigation();
  useEffect(() => {
    if (choice) {
      console.log(`base number =   ${baseNumber}  et score = ${score}`);
      const winner =
        (choice === "higher" && score > baseNumber) ||
        (choice === "lower" && baseNumber > score);
      Alert.alert(`You've ${winner ? "won" : "lost"}`, `You scored: ${score}`);
      navigation.goBack();
    }
  }, [baseNumber, score, choice]);

  return (
    <View styles={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Starting: {baseNumber}</Text>
      <Button onPress={() => setChoice("higher")} title="Higher"/>
      <Button onPress={() => setChoice("lower")} title="Lower"/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
