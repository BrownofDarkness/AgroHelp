import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  shadowColor,
  shadowOpacity,
} from "react-native";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "7%",
    marginTop: 7,
    marginBottom: 10,
    shadowColor: "green",
    shadowOpacity: 20,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    elevation: 19,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    marginVertical: 2,
  },
  input: {},
});

export default CustomInput;
