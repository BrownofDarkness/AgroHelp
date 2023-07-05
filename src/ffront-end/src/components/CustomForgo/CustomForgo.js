import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomForgo = ({ onPress, text, type = "PRIMARY" }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3B71F3",
    flex: 1,
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 50,
  },

  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: "white",
  },

  text_TERTIARY: {
    color: "gray",
  },
});

export default CustomForgo;
