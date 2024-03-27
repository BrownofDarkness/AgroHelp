import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Styles,
} from "react-native";

// import { createDrawerNavigator } from "@react-navigation/drawer";

// const Drawer = createDrawerNavigator();
export default function ReadnotifScreen({ navigation }) {
  const options = [
    {
      name: "10:15",
    },
    {
      name: "11:40",
    },
    {
      name: "12:00",
    },
  ];
  return (
    <ScrollView style={{ flex: 1 }}>
      {options.map(({ name }, index) => (
        <View>
          <Text
            style={{
              fontSize: 17,
              margin: 10,
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {name}
          </Text>
          <View style={styles.contain1}>
            <Text style={styles.tex1}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
              eligendi beatae cupiditate eum accusantium amet voluptatem omnis
              iusto reiciendis ut, est nostrum sequi fuga tempore, eos
              consequatur magnam ipsam eius!
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contain1: {
    backgroundColor: "green",
    marginLeft: "9%",
    marginRight: "9%",
    borderRadius: 20,
    padding: 10,
  },
  tex1: {
    marginTop: 0,
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "left",
    color: "white",
  },
});
