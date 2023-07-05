import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// import { Image } from 'react-native';

const Menu = () => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState(null);
 
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Replace with your latitude and longitude values
        const latitude = 3.848,
          longitude = 11.502;
        const apiKey = 'acbc1629d4192a8cb3c8e6c6abd33fe0';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        const response = await axios.get(apiUrl);
        setWeather(response.data);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
    setSelectedButton(screenName);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Menu</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'HomeScreen' && styles.selectedButton]}
        onPress={() => handleButtonPress('HomeScreen')}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'SearchScreen' && styles.selectedButton]}
        onPress={() => handleButtonPress('SearchScreen')}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'ChatScreen' && styles.selectedButton]}
        onPress={() => handleButtonPress('ChatScreen')}
      >
        <Text style={styles.buttonText}>Chat Forum</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'Parcels' && styles.selectedButton]}
        onPress={() => handleButtonPress('Parcels')}
      >
        <Text style={styles.buttonText}>Choose Parcel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'Contact' && styles.selectedButton]}
        onPress={() => handleButtonPress('Contact')}
      >
        <Text style={styles.buttonText}>Contact Us</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'Rate' && styles.selectedButton]}
        onPress={() => handleButtonPress('Rate')}
      >
        <Text style={styles.buttonText}>Rate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'Weather' && styles.selectedButton]}
        onPress={() => handleButtonPress('Weather')}
      >
        <Text style={styles.buttonText}>Weather Forecast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'LogoutScreen' && styles.selectedButton]}
        onPress={() => handleButtonPress('LogoutScreen')}
        // {isLoggedIn && <Button title="Logout" onPress={handleLogout} />}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>



   {/* <Image source={require('./assets/weather-image.png')} style={styles.weatherImage} /> */}
      {/* <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>The weather in your area now is:</Text>
          <Text style={styles.weatherText}>10°C</Text>
        </View> */}
      {weather ? (
        <>
          <Text>Location: {weather?.name}</Text>
          <Text>Temperature: {weather?.main?.temp}°C</Text>
          <Text>Description: {weather?.weather[0].description}</Text>

          {/* <Image 
           style={styles.weatherImage}
           source={{
            uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
           }} 
          
          /> */}
        </>
      ) : (
        <Text>Loading weather data ...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 20,
    color: '#fff',
    // backgroundColor: '#000',
    borderRadius: 20,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    marginLeft: 120,
    marginTop: 30,
  },
  button: {
    backgroundColor: '#fafaf1',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#14321a',
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  weatherContainer: {
    marginTop: 170,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherImage: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
});

export default Menu;