import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import ApiService from '../utils/ApiService';

const Test = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const {parcel} = route.params;
  const {token} = useAuth()
  const [suggestedCultures,setSuggestedCultures] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  console.log(route.params)
  const handleYesButtonPress = () => {
    // Redirect to AddParcel screen
    // Implement navigation for the Add Parcel Screen 
    navigation.navigate('AddParcelScreen');
  };

  useEffect(()=>{
    if(parcel){

      ApiService.suggestCulturesToParcel(parcel.id,token).then(res=>res.json()).then(data=>{
        setSuggestedCultures(data);
      }).catch(err=>console.log(err.message))
    }
  },[])

  const handleNoButtonPress = () => {
    setShowPopup(false);
    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
      // Redirect to Home screen after 6 seconds
      navigation.navigate('HomeScreen');
    }, 5000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Soil Characteristics in chosen Area</Text>
      <Text style={styles.listHeading}>Below are some characteristics in relation to the soils found in {parcel?.name}</Text>
      <View style={styles.listContainer}>
         <Text style={styles.listItem}>- Rich loamy soil with excellent drainage.</Text>
         <Text style={styles.listItem}>- High organic content, promoting healthy plant growth.</Text>
         <Text style={styles.listItem}>- Neutral pH level, suitable for a wide range of crops.</Text>
         <Text style={styles.listItem}>- Well-aerated soil, allowing optimal root development.</Text>
         <Text style={styles.listItem}>- Moderate clay content, providing good moisture retention.</Text>
         <Text style={styles.listItem}>- Low sand content, preventing excessive water drainage.</Text>
         <Text style={styles.listItem}>- Fertile soil, ideal for agricultural activities.</Text>
         <Text style={styles.listItem}>- Nutrient-rich composition, supporting robust plant growth.</Text>
         <Text style={styles.listItem}>- Good soil structure, facilitating easy cultivation and root penetration.</Text>
         <Text style={styles.listItem}>- Minimal presence of rocks or debris, minimizing obstruction during farming operations.</Text>
      </View>
      <Text style={styles.heading}>Best growing crops</Text>
      <View style={styles.listContainer}>
        {suggestedCultures && suggestedCultures.map(culture=>(

         <Text key={culture.id} style={styles.listItem}>- {culture.name}</Text>
        ))}
         {/* <Text style={styles.listItem}>- Beans</Text>
         <Text style={styles.listItem}>- Cassava</Text>
         <Text style={styles.listItem}>- Tomatoes</Text> */}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setShowPopup(true)}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>

      {/* Popup for "Do you want to add another location?" */}
      <Modal visible={showPopup} transparent>
        <View style={styles.popup}>
          <Text style={styles.popupText}>Do you want to add another location?</Text>
          <View style={styles.popupButtons}>
            <TouchableOpacity style={styles.yesButton} onPress={handleYesButtonPress}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noButton} onPress={handleNoButtonPress}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Popup for "Thanks!!! Your information has been saved successfully." */}
      <Modal visible={showSuccessPopup} transparent>
        <View style={styles.successPopup}>
          <Text style={styles.successPopupText}>Thanks!!! Your information has been saved successfully.</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  listHeading: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
  },
  listContainer: {
    marginBottom: 20,
  },
  listItem: {
    fontSize: 12.9,
    marginBottom: 5,
    textAlign: 'left',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popup: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  popupButtons: {
    flexDirection: 'row',
  },
  yesButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  noButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  successPopup: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successPopupText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});

export default Test;