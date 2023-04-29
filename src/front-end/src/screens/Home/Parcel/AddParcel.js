import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  // ScrollView,
} from "react-native";
import Logo from "../../../../assets/Logo1.png";
import { CustomInput, CustomButton } from "../../../components";
import ApiService from "../../../utils/ApiService";
import MapView from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";

const AddParcelScreen = ({ navigation }) => {
  const [Locality, setLocality] = useState("");
  const [LandArea, setLandArea] = useState("");
  const [error, setError] = useState("");

  const { height } = useWindowDimensions();

  const onSignInPressed = () => {
    if (!Locality || !LandArea) {
      return setError("Please fill all the necessary informations");
    }
    ApiService.parcel(JSON.stringify({ email: Locality, LandArea }))
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Successfull");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        padding: 20,
        gap: 8,
      }}
    >
      {/* <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.5 }]}
        resizeMode="contain"
      /> */}

      <Text style={[styles.parcel]}> Ajout Parcel </Text>

      {error && <Text>{error}</Text>}
      {/* <CustomInput
        placeholder="Locality"
        value={Locality}
        setValue={setLocality}
      /> */}
      <TextInput
        placeholder="Give a name of your parcel"
        style={{
          padding: 8,
          paddingVertical: 15,
          backgroundColor: "#fff",
          borderRadius: 5,
          fontSize: 22,
          marginVertical: 8,
        }}
      />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      ></MapView>
      <TextInput
        placeholder="size of your parcel in meter square"
        style={{
          padding: 8,
          paddingVertical: 15,
          backgroundColor: "#fff",
          borderRadius: 5,
          fontSize: 22,
          marginVertical: 8,
        }}
      />
      {/* <CustomInput
        placeholder="LandArea"
        value={LandArea}
        setValue={setLandArea}
        secureTextEntry={true}
      /> */}

      <CustomButton text="Save" onPress={onSignInPressed} />
    </ScrollView>
  );
};

export default AddParcelScreen;

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
  parcel: {
    marginBottom: 2,
    marginTop: 0,
    color: "#3b6fb3",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  info: {
    color: "green",
    fontSize: 20,
    marginBottom: 20,
  },
});
