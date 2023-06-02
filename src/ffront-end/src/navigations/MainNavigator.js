import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import {StatusBar} from 'react-native';
import CropDetailsScreen from '../screens/CropDetailsScreen';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Notification from '../screens/Home/Notification/Notification';
import Menu from '../screens/Main-TabNav';
import SearchScreen from '../screens/SearchScreen';
import ChatScreen from '../screens/ChatScreen';
import Contact from '../screens/Contact-us';
import Rate from '../screens/Rate';
import Test from '../screens/Test';
// import AddParcelScreen from '../screens/Home/Parcel/AddParcel';
import DescriptionPage from '../screens/DescriptionPage';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import { useAuth } from '../context/AuthContext';



const Stack = createSharedElementStackNavigator();

const MainNavigator = () => {

  const {token} = useAuth()

  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator>
      {/* <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
            useNativeDriver: true,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="AddParcelScreen"
          component={AddParcelScreen}
           options={{
             headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
           }}
        />*/}
        <Stack.Screen
          name="Root"
          component={TabNavigator}
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
          name="DescriptionPage"
          component={DescriptionPage}
          options={{
            headerShown: false,
            useNativeDriver: true,
            gestureEnabled: false,
          }}
        />
        
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          //   useNativeDriver: true,
          //   gestureEnabled: false,
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
          name="ChatScreen"
          component={ChatScreen}
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
          name="Notification"
          component={Notification}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
