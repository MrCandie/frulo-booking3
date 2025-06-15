import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Animated } from "react-native";
import { useToast } from "../context/toast-context";

export default function Toast() {
  const { toastMessage, toastType } = useToast();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (!!toastMessage) {
      // Fade in animation

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Fade out animation after 3 seconds
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);
    }
  }, [toastMessage]);

  if (!toastMessage) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { opacity: fadeAnim }, // Apply animation
        toastType === "warning"
          ? styles.warning
          : toastType === "error"
          ? styles.error
          : styles.success,
      ]}>
      <Text style={styles.toastText}>{toastMessage}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
    fontFamily: "PoppinsRegular",
  },
  warning: {
    backgroundColor: "orangered",
  },
  error: {
    backgroundColor: "red",
  },
  success: {
    backgroundColor: "green",
  },
});
