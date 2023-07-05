import { createStackNavigator } from "@react-navigation/stack";
import AddParcelScreen from "../screens/Home/Parcel/AddParcel";

const Stack = createStackNavigator();

const ParcelStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="addParcel"
        component={AddParcelScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ParcelStack;
