import { createStackNavigator } from "@react-navigation/stack";
import ReadnotifScreen from "../screens/Home/Readnotif/ReadnotifScreen";
import NotificationScreen from "../screens/Home/Notification/NotificationScreen";

const Stack = createStackNavigator();

const NotificationStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Readnotif"
        component={ReadnotifScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default NotificationStack;
