import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// import { Image } from 'react-native';

const Menu = () => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Fetch weather data from API based on user's location
    // Replace 'API_KEY' and 'latitude,longitude' with the appropriate values
    fetch(`https://api.weatherapi.com/v1/current.json?key=acbc1629d4192a8cb3c8e6c6abd33fe0&q=latitude,longitude`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setWeather(data)})
      .catch(error => console.error(error));
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

      {/* <TouchableOpacity
        style={[styles.button, selectedButton === 'Parcels' && styles.selectedButton]}
        onPress={() => handleButtonPress('Parcels')}
      >
        <Text style={styles.buttonText}>Change Soil</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={[styles.button, selectedButton === 'DescriptionPage' && styles.selectedButton]}
        onPress={() => handleButtonPress('DescriptionPage')}
      >
        <Text style={styles.buttonText}>Test Description</Text>
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

      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>The weather in your area now is:</Text>
          <Text style={styles.weatherText}>{weather?.current?.temp_c}°C</Text>
        </View>
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
  },
  heading: {
    fontSize: 24,
    marginLeft: 120,
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
  // weatherImage: {
  //   width: 50,
  //   height: 50,
  //   resizeMode: 'contain',
  // },
});

export default Menu;








// const LogoutScreen = ({ navigation }) => {
//   useEffect(() => {
//     logout();
//   }, []);

//   const logout = async () => {
//     try {
//       // Make an API call to your Django backend to perform the logout action
//       await axios.post('https://your-django-backend/logout/');

//       // Clear user data from AsyncStorage or any other storage mechanism
//       await AsyncStorage.clear();

//       // Redirect the user to the login screen
//       navigation.replace('Login');
//     } catch (error) {
//       console.log('Logout error:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Logging out...</Text>
//     </View>
//   );
// };





// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faSun, faMoon, faCloud, faCloudRain, faBolt, faSnowflake, faSmog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

// const Menu = () => {
//   const [weather, setWeather] = useState(null);

//   useEffect(() => {
//     fetchWeatherData();
//   }, []);

//   const fetchWeatherData = () => {
//     // Fetch weather data using an API
//     fetch('https://api.openweathermap.org/data/2.5/weather?q={YOUR_LOCATION}&appid={YOUR_API_KEY}&units=metric')
//       .then(response => response.json())
//       .then(data => {
//         setWeather(null);// replace with "data" to get user weather
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   const getWeatherIcon = (iconCode) => {
//     // Icon mapping logic goes here
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* <Text style={styles.heading}>Menu</Text> */}

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Button 1</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Button 2</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Button 3</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Button 4</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Button 5</Text>
//       </TouchableOpacity>

//       {weather && (
//         <View style={styles.weather}>
//           <Text style={styles.weatherHeading}>Weather</Text>
//           <FontAwesomeIcon icon={getWeatherIcon(weather.weather[0].icon)} style={styles.weatherIcon} />
//           <Text style={styles.weatherInfo}>Temperature: {weather.main.temp}°C</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f2f2f2',
//   },
//   heading: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#f2f2f2',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#14321a',
//     textAlign: 'center',
//   },
//   weather: {
//     marginTop: 20,
//     alignItems: 'center',
//     backgroundColor: '#e8e8e8',
//     padding: 20,
//     borderRadius: 5,
//   },
//   weatherHeading: {
//     fontSize: 24,
//     marginBottom: 10,
//   },
//   weatherIcon: {
//     fontSize: 48,
//     marginBottom: 10,
//   },
//   weatherInfo: {
//     fontSize: 16,
//   },
// });

// export default Menu;
