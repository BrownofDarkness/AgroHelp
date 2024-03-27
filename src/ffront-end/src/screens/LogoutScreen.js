import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    try {
      // Clear the user's authentication token from AsyncStorage
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.clear()

      // Redirect the user to the login screen
      navigation.replace('Login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logging out...</Text>
    </View>
  );
};

export default LogoutScreen;
