import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSun, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    city: 'London',
    temperature: '25°C',
    description: 'Sunny',
    hourlyWeather: [
      { time: '10:00', temperature: '20°C' },
      { time: '11:00', temperature: '22°C' },
      { time: '12:00', temperature: '24°C' },
      { time: '13:00', temperature: '25°C' },
      { time: '14:00', temperature: '26°C' },
      { time: '15:00', temperature: '27°C' },
      { time: '16:00', temperature: '26°C' },
      { time: '17:00', temperature: '24°C' },
      { time: '18:00', temperature: '22°C' },
      { time: '19:00', temperature: '21°C' },
      { time: '20:00', temperature: '20°C' },
    ],
  });

  const toggleTemperature = () => {
    setWeatherData(prevData => {
      if (prevData.description === 'Sunny') {
        return {
          ...prevData,
          temperature: '15°C',
          description: 'Rainy',
        };
      } else {
        return {
          ...prevData,
          temperature: '25°C',
          description: 'Sunny',
        };
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={weatherData.description === 'Sunny' ? styles.sunnyCard : styles.rainyCard}>
        <View style={styles.icon}>
          <FontAwesomeIcon
            icon={weatherData.description === 'Sunny' ? faSun : faCloudShowersHeavy}
            size={48}
            color={weatherData.description === 'Sunny' ? '#ffcc00' : '#007bff'}
          />
        </View>
        <View style={styles.weatherDetails}>
          <Text style={styles.city}>{weatherData.city}</Text>
          <Text style={styles.temperature}>{weatherData.temperature}</Text>
          <Text style={styles.description}>{weatherData.description}</Text>
        </View>
        <Button title="Toggle Rainy Temperature" onPress={toggleTemperature} />
      </View>
      <View style={styles.chartContainer}>
        {/* Render your chart component here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  sunnyCard: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    padding: 20,
    borderRadius: 10,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 20,
  },
  rainyCard: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    padding: 20,
    borderRadius: 10,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  weatherDetails: {},
  city: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#343a40',
  },
  description: {
    color: '#868e96',
  },
  chartContainer: {
    maxWidth: 500,
  },
});

export default WeatherApp;








// import React, { useEffect, useState } from 'react';
// import {Text, View, Alert, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, RefreshControl} from 'react-native';
// import * as Location from 'expo-location';

// const apiKey= '14185f1156c42c917cf4d1f457cf3925'
// let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${apiKey}`;


// const Weather = () => {
//   const [forecast, setforecast] = useState(null);
//   const [refreshing, setrefreshing] = useState(null);

//   const loadForecast = async () => {
//     setrefreshing(true);
//     //ask for permission to access location
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission to access was denied');
//     }

//     //get location of the user 

//     let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    
//     //fetch weather data from the open weather API

//     const response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
//     const data = await response.json(); //convert response into json

//     if (!response.ok) {
//       Alert.alert('Error', 'something went wrong'); // if the response is not ok, it would display this error
//     }
//     else{
//       setforecast(data); // setting the data state
//     }

//     setrefreshing(false);
//   }

//   //using useEffect to run the rendered component

//   useEffect(() => {
//     loadForecast();
//   }, []);

//   if (!forecast){
//     return(
//       <SafeAreaView style={styles.loading} >
//         <ActivityIndicator size='large'/>
//       </SafeAreaView>
//     );
//   }

//   const current = forecast.current.weather[0];

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView refreshControl={
//         <RefreshControl 
//           refreshing = {refreshing} onRefresh={() => loadForecast()} 
//           />
//         }
//         style={{marginTop: 50}}
//       >
//         <Text style={styles.title}>
//           Current Weather
//         </Text>
//         <Text style={{alignItems:'center', textAlign:'center', fontSize: 18}}>
//           Your Location
//         </Text>


//       </ScrollView>
      
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ECDBBA',
//   },

//   title: {
//     textAlign:'center',
//     fontSize: 36,
//     fontWeight: 'bold',
//     color:'#C84B31',
//   }
//  })

// export default Weather;











//Description page 

// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const DescriptionPage = () => {
//   const navigation = useNavigation();

//   const handleGoBack = () => {
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
//         <Ionicons name="arrow-back" size={24} color="#ffffff" />
//       </TouchableOpacity>
//       <Image source={require('../../assets/images/sicks/cp-1.jpg')} style={styles.logo} />
//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <Text style={styles.title}> Description</Text>
//         <View style={styles.descriptionContainer}>
//           <Text style={styles.descriptionItem}>- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
//           <Text style={styles.descriptionItem}>- Sed fermentum risus et lectus tincidunt.</Text>
//           <Text style={styles.descriptionItem}>- Vitae dignissim velit elementum.</Text>
//           <Text style={styles.descriptionItem}>- Donec euismod, enim et fermentum gravida, ipsum velit pellentesque elit.</Text>
//           <Text style={styles.descriptionItem}>- Ut accumsan erat quam eu lectus.</Text>
//           <Text style={styles.descriptionItem}>- Aliquam sem lacus, congue eu augue id, gravida rutrum velit.</Text>
//           <Text style={styles.descriptionItem}>- Nulla facilisi.</Text>
//           <Text style={styles.descriptionItem}>- In hac habitasse platea dictumst.</Text>
//           <Text style={styles.descriptionItem}>- Sed convallis sapien eget arcu malesuada, vitae venenatis sapien malesuada.</Text>
//           <Text style={styles.descriptionItem}>- Nullam consectetur turpis in ex posuere, eget malesuada tellus congue.</Text>
//         </View>
//         <Text style={styles.title}> Fertilisation</Text>
//         <View style={styles.descriptionContainer}>
//           <Text style={styles.descriptionItem}>- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
//           <Text style={styles.descriptionItem}>- Sed fermentum risus et lectus tincidunt.</Text>
//           <Text style={styles.descriptionItem}>- Vitae dignissim velit elementum.</Text>
//           <Text style={styles.descriptionItem}>- Donec euismod, enim et fermentum gravida, ipsum velit pellentesque elit.</Text>
//           <Text style={styles.descriptionItem}>- Ut accumsan erat quam eu lectus.</Text>
//           <Text style={styles.descriptionItem}>- Aliquam sem lacus, congue eu augue id, gravida rutrum velit.</Text>
//           <Text style={styles.descriptionItem}>- Nulla facilisi.</Text>
//           <Text style={styles.descriptionItem}>- In hac habitasse platea dictumst.</Text>
//           <Text style={styles.descriptionItem}>- Sed convallis sapien eget arcu malesuada, vitae venenatis sapien malesuada.</Text>
//           <Text style={styles.descriptionItem}>- Nullam consectetur turpis in ex posuere, eget malesuada tellus congue.</Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     zIndex: 1,
//     padding: 8,
//     borderRadius: 5,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     alignSelf: 'flex-start',
//     marginTop: 70,
//     marginLeft: 20,
//     borderRadius: 10
//   },
//   contentContainer: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   descriptionContainer: {
//     marginBottom: 20,
//   },
//   descriptionItem: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
// });

// export default DescriptionPage;
