import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Logo from "../../../assets/Logo1.png";
import { CustomInput, CustomButton, CustomButtonReg } from "../../components/";
import ApiService from "../../utils/ApiService";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { height } = useWindowDimensions();

  const onSignInPressed = () => {
    if (!username || !password) {
      return setError("Please fill all your informations");
    }
    ApiService.login(JSON.stringify({ email: username, password }))
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Login Successfull");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("Home", { screen: "Parcel" });
  };
  const onregisterPressed = () => {
    navigation.navigate("Register");
  };

  const onNotificationPressed = () => {
    navigation.navigate("Home", { screen: "Notifier" });
  };

  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.5 }]}
        resizeMode="contain"
      />

      <Text style={[styles.login]}> Login </Text>

      <Text style={[styles.info]}> Enter your informations </Text>
      {error && <Text>{error}</Text>}
      <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />

      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <CustomButton text="Sign In" onPress={onSignInPressed} />
      <CustomButtonReg text="Register" onPress={onregisterPressed} />
      <CustomButton
        text="Forgot Password"
        onPress={onForgotPasswordPressed}
        type="TERTIARY"
      />

      <CustomButton
        text="Forgo"
        onPress={onNotificationPressed}
        type="TERTIARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    flex: 1,
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
