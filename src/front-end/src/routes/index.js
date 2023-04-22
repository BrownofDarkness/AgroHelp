import React from 'react'
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

const index = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default index