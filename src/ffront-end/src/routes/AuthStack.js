import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import Menu from "../screens/Main-TabNav";
import SearchScreen from '../screens/SearchScreen';
import ChatScreen from '../screens/ChatScreen';
import Contact from '../screens/Contact-us';
import Rate from '../screens/Rate';
import Test from '../screens/Test';
import AddParcelScreen from '../screens/Home/Parcel/AddParcel';
import Weather from "../screens/Weather";
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from "../navigations/TabNavigator";
import {StatusBar} from 'react-native';
import CropDetailsScreen from '../screens/CropDetailsScreen';
import MainNavigator from "../navigations/MainNavigator";
import HomeNavigator from "../navigations/HomeNavigator";
import HomeScreen from "../screens/HomeScreen";
import LogoutScreen from "../screens/LogoutScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import Notification from "../screens/Home/Notification/Notification";
import Parcels from "../screens/Parcels";
import Describe from "../screens/Describe";
import Popular from "../components/Home/Popular";
import PopularScreen from "../screens/PopularScreen";
// import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Stack = createStackNavigator();

const AuthRoutes = ({ navigation }) => {
  <StatusBar hidden />
  return (
    <Stack.Navigator>
 
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{
            headerShown: false,
            useNativeDriver: true,
            gestureEnabled: false,
          }}
        />
        
      <Stack.Screen 
      name="ForgotPassword" 
      component={ForgotPasswordScreen} 
      options={{ headerShown: false }} />

      <Stack.Screen
          name="AddParcelScreen"
          component={AddParcelScreen}
           options={{
             headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
           }}
        />

        
        

        <Stack.Screen
          name="Root"
          component={MainNavigator}
          options={{
            headerShown: false,
            useNativeDriver: true,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="CropDetails"
          component={CropDetailsScreen}
          options={{
            headerShown: false,
            useNativeDriver: true,
            gestureEnabled: false,
            cardStyleInterpolator: ({current: {progress}}) => ({
              cardStyle: {
                opacity: progress,
              },
            }),
          }}
        />

        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
           options={{
             headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
           }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
           options={{
             headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
           }}
        />

        <Stack.Screen
          name="Notification"
          component={Notification}
           options={{
             headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
           }}
        />

        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
           options={{
             headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
           }}
        />

         <Stack.Screen
          name="Popular"
          component={Popular}
           options={{
             headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
           }}
        />

        <Stack.Screen
          name="PopularScreen"
          component={PopularScreen}
           options={{
             headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
           }}
        />

        <Stack.Screen
          name="Contact"
          component={Contact}
          // options={{
          //   headerShown: false,
          // //   useNativeDriver: true,
          // //   gestureEnabled: false,
          // }}
        />

        <Stack.Screen
          name="Rate"
          component={Rate}
          // options={{
          //   headerShown: false,
          // //   useNativeDriver: true,
          // //   gestureEnabled: false,
          // }}
        />

        <Stack.Screen
          name="Test"
          component={Test}
          // options={{
          //   headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
          // }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
           options={{
             headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
           }}
        />

        <Stack.Screen
          name="Weather"
          component={Weather}
          options={{
            headerShown: false,
            useNativeDriver: true,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="Describe"
          component={Describe}
          options={{
            headerShown: false,
            useNativeDriver: true,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="Parcels"
          component={Parcels}
          options={{
            headerShown: false,
            useNativeDriver: true,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="LogoutScreen"
          component={LogoutScreen}
          // options={{
          //   headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
          // }}
        />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
