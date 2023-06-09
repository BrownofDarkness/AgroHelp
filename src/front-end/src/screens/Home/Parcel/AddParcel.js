import React, { useRef, useState } from "react";
import {
  Alert,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  NativeModules,
  // ScrollView,
} from "react-native";
import { CustomButton } from "../../../components";
import MapView, { AnimatedRegion, MarkerAnimated } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../../context/AuthContext";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/Ionicons";

const { StatusBarManager } = NativeModules;

const AddParcelScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [name, setName] = useState("");
  const [landSize, setLandSize] = useState(0);
  const [error, setError] = useState("");
  const { user, token } = useAuth();
  const [location, setLocation] = useState({
    longitude: 11.49,
    latitude: 3.85,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [coords, setCoords] = useState({ lat: null, lng: null });

  const { height } = useWindowDimensions();

  const locateUser = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    const { latitude, longitude } = location.coords;
    setLocation(location.coords);
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      1000
    );
    setCoords({ lng: longitude, lat: latitude });
  };

  const saveUserParcel = () => {
    if (!name || !landSize || !coords.lng || !coords.lat) {
      return setError("Please make sure you fill all the require informations");
    }

    const data = {
      location: `SRID=4326;POINT (${coords.lng} ${coords.lat})`,
      area: landSize,
      name: name,
      user: user.id,
    };

    ApiService.saveUserParcel(JSON.stringigy(data), token)
      .then((res) => res.json)
      .then((data) => {
        if (data.success) {
          console.log("Parcel added");
          Alert.alert("Success", "Parcel added", [
            {
              text: "Ok",
              onPress: () => console.log("Ok"),
            },
          ]);
        } else {
          Alert.alert("Error", "Some thing went wrong", [
            {
              text: "Ok",
              onPress: () => console.log("Ok"),
            },
          ]);
        }
      })
      .catch((err) => {
        setError(err.message);
        Alert.alert("Error", err.message, [
          {
            text: "Ok",
            onPress: () => console.log("Ok"),
          },
        ]);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS == "android" ? StatusBarManager.HEIGHT : 0,
      }}
    >
      <StatusBar style="dark" animated backgroundColor={"#3b6fb3"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          padding: 5,
          gap: 8,
        }}
      >
        <Text style={[styles.parcel]}> Add a parcel </Text>

        {error && <Text>{error}</Text>}

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
          onChangeText={setName}
        />
        <View style={{ position: "relative", flex: 1 }}>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 99,
            }}
            onPress={locateUser}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 4,
              }}
            >
              <Icon name="locate-sharp" color={"grey"} size={32} />
            </View>
          </TouchableOpacity>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              ...location,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            zoomControlEnabled
            zoomTapEnabled
            ref={mapRef}
          >
            <MarkerAnimated
              ref={markerRef}
              coordinate={location}
              draggable
              pinColor="blue"
              style={{ elevation: 10 }}
              onDragEnd={(event) => {
                console.log(event.nativeEvent.coordinate);
                setLocation(event.nativeEvent.coordinate);
                const { latitude, longitude } = event.nativeEvent.coordinate;

                setCoords({ lng: longitude, lat: latitude });
              }}
            />
          </MapView>
        </View>

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
          onChangeText={setLandSize}
        />

        <CustomButton text="Save" onPress={saveUserParcel} />
      </ScrollView>
    </SafeAreaView>
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
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 40,
  },
  info: {
    color: "green",
    fontSize: 20,
    marginBottom: 20,
  },
});
