import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmptyComponent({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📭</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    maxWidth: 250,
  },
});
