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
      })
      .catch((err) => {
        setError(err.message);
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

      <CustomButtonReg text="Register" onPress={onregisterPressed} />
      <CustomButtonReg text="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
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
    color: "#3B71F3",
    fontSize: 40,
    fontWeight: "bold",
  },
  info: {
    color: "green",
    fontSize: 15,
    marginBottom: 20,
  },
});

export default RegisterScreen;
