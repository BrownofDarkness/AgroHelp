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

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");

  const { height } = useWindowDimensions();

  const onregisterPressed = () => {
    if (!username || !password || !email || !confirmpassword) {
      return setError("Please fill all your informations");
    }
    if (password !== confirmpassword) {
      setError("Password must match");
    }
    console.log({ username, password, email, confirmpassword });
    ApiService.register(
      JSON.stringify({ username, password, email, type: "agriculteur" })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Account Created");
        navigation.navigate("Login", { screen: "Login" });
      })
      .catch((err) => {
        setError(err.message);
        console.log(err)
      });
  };

  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.5 }]}
        resizeMode="contain"
      />

      <Text style={[styles.login]}> Register </Text>

      <Text style={[styles.info]}> Enter your informations to register </Text>
      {error && <Text>{error}</Text>}
      <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />

      <CustomInput placeholder="Email" value={email} setValue={setEmail} />

      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <CustomInput
        placeholder="Confirmpassword"
        value={confirmpassword}
        setValue={setConfirmpassword}
        secureTextEntry={true}
      />

      <CustomButton text="Register" onPress={onregisterPressed} />
      <CustomButtonReg text="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 300,
    maxWidth: 100,
    maxHeight: 200,
  },
  login: {
    marginBottom: 0.5,
    color: "#025592",
    fontSize: 40,
    fontWeight: "bold",
  },
  info: {
    color: "green",
    fontSize: 15,
    marginBottom: 10,
  },
});

export default RegisterScreen;
