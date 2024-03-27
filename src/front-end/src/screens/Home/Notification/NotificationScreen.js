import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Styles,
  useWindowDimensions,
  ImageBackground,
  Pressable,
  TouchableOpacity,
} from "react-native";

import ApiService from "../../../utils/ApiService";
// import { createDrawerNavigator } from "@react-navigation/drawer";

// const Drawer = createDrawerNavigator();

export default function NotificationScreen({ navigation }) {
  const options = [
    {
      name: "10:15",
    },
    {
      name: "17:00",
    },
    {
      name: "20:00",
    },
  ];
  const onReadnotifPressed = () => {
    console.log("heelosss");
    navigation.navigate("Home", {
      screen: "Notifier",
      params: { screen: "Readnotif" },
    });
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.tex1}>recent notifications</Text>

      {options.map(({ name }, index) => (
        <TouchableOpacity onPress={onReadnotifPressed}>
          <View
            style={{ margin: 10, backgroundColor: "#025592", borderRadius: 10 }}
          >
            <View
              key={index}
              style={{
                flexDirection: "row",
                fontWeight: "bold",
                textTransform: "capitalize",
                margin: 3,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  flex: 1,
                  fontWeight: "bold",
                }}
              >
                From admin
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  margin: 2,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {name}
              </Text>
            </View>

            <Text style={{ margin: 5, color: "white" }}>
              Lorem ipsum dolor sit amet consect.......
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  contain: {
    backgroundColor: "#025592",
    margin: "3%",
    borderRadius: 10,
  },

  contain1: {
    backgroundColor: "gray",
    margin: "3%",
    borderRadius: 10,
  },
  text: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
    marginTop: "30%",
    fontWeight: "bold",
  },
  tex1: {
    margin: 10,
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  title: {
    marginTop: 20,
    lineHeight: 31,
    fontSize: 26,
    color: "#025592",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  item: {
    fontSize: 15,
    margin: 5,
    fontWeight: "bold",
    padding: 3,
  },
});
