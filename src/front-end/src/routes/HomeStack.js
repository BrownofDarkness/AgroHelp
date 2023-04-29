import { createStackNavigator } from "@react-navigation/stack";
// import ParcelStack from "./ParcelStack";
import AddParcelScreen from "../screens/Home/Parcel/AddParcel";

const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Parcel" component={AddParcelScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
