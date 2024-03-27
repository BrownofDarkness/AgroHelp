import { createStackNavigator } from "@react-navigation/stack";
// import ParcelStack from "./ParcelStack";
import AddParcelScreen from "../screens/Home/Parcel/AddParcel";
import Notification from "../screens/Home/Notification/Notification";
import ReadnotifScreen from "../screens/Home/Readnotif/ReadnotifScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../screens/Auth/LoginScreen";
import NotificationStack from "./NotificationStack";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = ({ navigation }) => {
  return (
    // <Stack.Navigator>
    //   <Stack.Screen name="Parcel" component={AddParcelScreen} />
    //   <Stack.Screen
    //     name="Notification"
    //     component={NotificationScreen}
    //     options={{ headerShown: false }}
    //   />
    // </Stack.Navigator>
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: "red",
        width: "350",
      }}
    >
      <Drawer.Screen name="Parcel" component={AddParcelScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen
        name="Notifier"
        component={NotificationStack}

        // options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default HomeStack;
