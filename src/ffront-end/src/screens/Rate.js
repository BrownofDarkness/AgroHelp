import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Rate = () => {
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();

  const handleRateApp = () => {
    // Implement the logic for rating the app
    console.log('Rating the app:', rating);
    // You can send the rating to your server or perform any other actions
  };

  const handleLater = () => {
    // Implement the logic for handling "Rate Later" action
    // console.log('Remind me later...');
    navigation.goBack();
  };

  const handleNeverRate = () => {
    // Implement the logic for handling "Never Rate" action
    // console.log('Never rate the app...');
    navigation.goBack();
  };

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate the App</Text>
      <Text style={styles.description}>Enjoying the app? Please take a moment to rate it!</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            style={styles.starButton}
            onPress={() => handleStarPress(star)}
          >
            <Ionicons
              name={star <= rating ? 'ios-star' : 'ios-star-outline'}
              size={40}
              color={star <= rating ? '#ffc107' : '#cccccc'}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.rateButton} onPress={handleRateApp}>
        <Text style={styles.buttonText}>Rate Now</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.laterButton} onPress={handleLater}>
        <Text style={styles.buttonText}>Remind Me Later</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.neverRateButton} onPress={handleNeverRate}>
        <Text style={styles.buttonText}>Never Rate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  starButton: {
    marginRight: 5,
  },
  rateButton: {
    backgroundColor: '#45a049',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  laterButton: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  neverRateButton: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Rate;