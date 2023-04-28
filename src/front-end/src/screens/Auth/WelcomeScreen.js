import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "../../components";
import AgriIcon from "../../../assets/agri.jpg";

const options = [
  {
    name: "Check the weather",
  },
  {
    name: "Get informations about a culture",
  },
  { name: "Discuss between farmers" },
  { name: "Get informations about your parcel" },
];

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ height: 350, width: "100%" }}
        imageStyle={{ borderBottomRightRadius: 170 }}
        source={AgriIcon}
      >
        <Text style={styles.text}>Welcome to the world of agriculture </Text>
        <Text style={{ color: "white", textAlign: "center", fontSize: 15 }}>
          Here, we make your life easy
        </Text>
      </ImageBackground>
      <View style={{ margin: 20, flex: 1 }}>
        <Text style={styles.title}>
          With AgroHelp, improve your performance
        </Text>
        <View style={{ marginTop: 10 }}>
          {options.map(({ name }, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", margin: 2, gap: 10 }}
            >
              <Icon
                style={{ marginLeft: 20 }}
                name="check"
                size={22}
                color={"#02690C"}
              />
              <Text style={{ fontSize: 20 }}>{name}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ alignItems: "center", marginBottom: 15 }}>
        <Button
          onPress={() => {
            navigation.navigate("Login");
           
          }}
          text={"Next"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  text: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
    marginTop: "30%",
    fontWeight: "bold",
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
