import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const Parcels = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddParcel = () => {
    navigation.navigate('AddParcelScreen'); // Navigates to the AddParcelScreen
  };

  const handleBoxPress = () => {
    navigation.navigate('HomeScreen'); // Navigates to the HomeScreen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.heading}>Your available Parcels</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.box} onPress={handleBoxPress}>
          <Image
            source={{ uri: 'data:image/jpeg;base64,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' }}
            style={styles.boxImage}
          />
          <Text style={styles.locationText}>Location</Text>
          <Text style={styles.elementText}>Bamenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={handleBoxPress}>
          {/* <Image
            source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }}
            style={styles.boxImage}
          /> */}
          <Text style={styles.locationText}>Location</Text>
          <Text style={styles.elementText}>Element</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={handleBoxPress}>
          <Image
            source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }}
            style={styles.boxImage}
          />
          <Text style={styles.locationText}>Location</Text>
          <Text style={styles.elementText}>Element</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={handleBoxPress}>
          <Image
            source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }}
            style={styles.boxImage}
          />
          <Text style={styles.locationText}>Location</Text>
          <Text style={styles.elementText}>Element</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.ButtonAdd}>
        <Button title="Add Parcel" onPress={handleAddParcel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
  },
  ButtonAdd: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  box: {
    width: 150,
    height: 200,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#025592', // Updated background color
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
  },
  boxImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF', // Updated text color
  },
  elementText: {
    fontSize: 16,
    color: '#FFFFFF', // Updated text color
  },
});

export default Parcels;
























// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from "@expo/vector-icons";

// const Parcels = () => {
//   const navigation = useNavigation();

//   const handleBackPress = () => {
//     navigation.goBack();
//   };

//   const handleAddParcel = () => {
//     navigation.navigate('AddParcelScreen'); // Navigates to the AddParcelScreen
//   };

//   const handleBoxPress = () => {
//     navigation.navigate('HomeScreen'); // Navigates to the BoxDetailsScreen
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
//         <Ionicons name="arrow-back" size={24} color="#000" />
//       </TouchableOpacity>
//       <Text style={styles.heading}>Your available Parcels</Text>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <TouchableOpacity style={styles.box} onPress={handleBoxPress}>
//           {/* <Image
//             source={{ uri: 'data:image/jpeg;base64,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' }}
//             style={styles.boxImage}
//           /> */}
//           <Image
//             source={{ uri: 'https://i.pinimg.com/originals/ab/46/8a/ab468adae1349cf1dec9186a744399ac.jpg' }}
//             style={styles.boxImage}
//           />
//           <Text style={styles.locationText}>Location</Text>
//           <Text style={styles.elementText}>Ngoundere</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.box} onPress={handleBoxPress}>
//           <Image
//             source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }}
//             style={styles.boxImage}
//           />
//           <Text style={styles.locationText}>Location</Text>
//           <Text style={styles.elementText}>Bamenda</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.box} onPress={handleBoxPress}>
//           <Image
//             source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }}
//             style={styles.boxImage}
//           />
//           <Text style={styles.locationText}>Location</Text>
//           <Text style={styles.elementText}>Yaounde</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.box} onPress={handleBoxPress}>
//           <Image
//             source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }}
//             style={styles.boxImage}
//           />
//           <Text style={styles.locationText}>Location</Text>
//           <Text style={styles.elementText}>Douala</Text>
//         </TouchableOpacity>
//       </ScrollView>
//       <View style={styles.ButtonAdd}>
//         <Button title="Add Parcel" onPress={handleAddParcel} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     backButton: {
//       position: 'absolute',
//       top: 20,
//       left: 10,
//       padding: 10,
//     },
//     heading: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginTop: 60,
//     },
//     ButtonAdd: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 20,
//     },
//     scrollContainer: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'center',
//     },
//     box: {
//       width: 150,
//       height: 200,
//       margin: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#f0f0f0',
//       borderRadius: 20,
//       borderWidth: 1,
//       borderColor: 'gray',
//       overflow: 'hidden',
//     },
//     boxImage: {
//       width: '100%',
//       height: '100%',
//       resizeMode: 'cover',
//       position: 'absolute',
//     },
//     locationText: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       marginBottom: 10,
//       textDecorationColor: '#fff'
//     },
//     elementText: {
//       fontSize: 16,
//     },
//   });
  

// export default Parcels;






// // import React from 'react';
// // import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { Ionicons } from "@expo/vector-icons";

// // const Parcels = () => {
// //   const navigation = useNavigation();

// //   const handleBackPress = () => {
// //     navigation.goBack();
// //   };

// //   const handleAddParcel = () => {
// //     navigation.navigate('AddParcelScreen'); // Navigates to the AddParcelScreen
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
// //         <Ionicons name="arrow-back" size={24} color="#000" />
// //       </TouchableOpacity>
// //       <Text style={styles.heading}>Your available Parcels</Text>
// //       <ScrollView contentContainerStyle={styles.scrollContainer}>
// //         <View style={styles.box}>
// //           <Image
// //             source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }}
// //             style={styles.boxImage}
// //           />
// //           <Text style={styles.locationText}>Location</Text>
// //           <Text style={styles.elementText}>Element</Text>
// //         </View>
// //         <View style={styles.box}>
// //           <Image
// //             source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }}
// //             style={styles.boxImage}
// //           />
// //           <Text style={styles.locationText}>Location</Text>
// //           <Text style={styles.elementText}>Element</Text>
// //         </View>
// //         <View style={styles.box}>
// //           <Image
// //             source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }}
// //             style={styles.boxImage}
// //           />
// //           <Text style={styles.locationText}>Location</Text>
// //           <Text style={styles.elementText}>Element</Text>
// //         </View>
// //         <View style={styles.box}>
// //           <Image
// //             source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }}
// //             style={styles.boxImage}
// //           />
// //           <Text style={styles.locationText}>Location</Text>
// //           <Text style={styles.elementText}>Element</Text>
// //         </View>
// //       </ScrollView>
// //       <View style={styles.ButtonAdd}>
// //         <Button title="Add Parcel" onPress={handleAddParcel} />
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   backButton: {
// //     position: 'absolute',
// //     top: 20,
// //     left: 10,
// //     padding: 10,
// //   },
// //   heading: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginTop: 60,
// //   },
// //   ButtonAdd: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //   },
// //   scrollContainer: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     justifyContent: 'center',
// //   },
// //   box: {
// //     width: 150,
// //     height: 200,
// //     margin: 10,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#f0f0f0',
// //     borderRadius: 20,
// //     borderWidth: 1,
// //     borderColor: 'gray',
// //     overflow: 'hidden',
// //   },
// //   boxImage: {
// //     width: '100%',
// //     height: '100%',
// //     resizeMode: 'cover',
// //     position: 'absolute',
// //   },
// //   locationText: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   elementText: {
// //     fontSize: 16,
// //   },
// // });

// // export default Parcels;

