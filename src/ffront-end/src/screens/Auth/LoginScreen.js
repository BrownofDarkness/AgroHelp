import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import Logo from "../../../assets/Logo1.png";
import { CustomInput, CustomButton, CustomButtonReg } from "../../components/";
import ApiService from "../../utils/ApiService";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {setToken,setUser} = useAuth()

  const { height } = useWindowDimensions();

  const onSignInPressed = () => {
    if (!username || !password) {
      return setError("Please fill in all your information");
    }
    ApiService.login(JSON.stringify({ email: username, password }))
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.token){
          setToken(data.token)
          setUser(data.user)
          // alert("Login Successful");
          navigation.navigate("HomeScreen", { screen: "HomeScreen" });
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const onregisterPressed = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.5 }]}
        resizeMode="contain"
      />

      <Text style={[styles.login]}> Login </Text>

      <Text style={[styles.info]}> Enter your information </Text>
      {error && <Text>{error}</Text>}
      <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
        shadowColor="green"
      />

      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        shadowColor="green"
      />

      <CustomButton text="Sign In" onPress={onSignInPressed} />
      <CustomButtonReg text="Register" onPress={onregisterPressed} />
      <CustomButton
        text="Forgot Password"
        onPress={handleForgotPassword}
        type="TERTIARY"
        style={{ backgroundColor: "transparent" }}
      />

      {/* <CustomButton
        text="Forgo"
        onPress={onNotificationPressed}
        type="TERTIARY"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 10,
    zIndex: 1,
  },
  logo: {
    width: 300,
    maxWidth: 100,
    maxHeight: 200,
    marginBottom: 0,
  },
  login: {
    marginBottom: 2,
    marginTop: 0,
    color: "#025592",
    fontSize: 50,
    fontWeight: "bold",
  },
  info: {
    color: "green",
    fontSize: 20,
    flex: 1,
  },
});

export default LoginScreen;
