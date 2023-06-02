import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DescriptionPage = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>
      <Image source={require('../../assets/images/sicks/cp-1.jpg')} style={styles.logo} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}> Description</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionItem}>- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          <Text style={styles.descriptionItem}>- Sed fermentum risus et lectus tincidunt.</Text>
          <Text style={styles.descriptionItem}>- Vitae dignissim velit elementum.</Text>
          <Text style={styles.descriptionItem}>- Donec euismod, enim et fermentum gravida, ipsum velit pellentesque elit.</Text>
          <Text style={styles.descriptionItem}>- Ut accumsan erat quam eu lectus.</Text>
          <Text style={styles.descriptionItem}>- Aliquam sem lacus, congue eu augue id, gravida rutrum velit.</Text>
          <Text style={styles.descriptionItem}>- Nulla facilisi.</Text>
          <Text style={styles.descriptionItem}>- In hac habitasse platea dictumst.</Text>
          <Text style={styles.descriptionItem}>- Sed convallis sapien eget arcu malesuada, vitae venenatis sapien malesuada.</Text>
          <Text style={styles.descriptionItem}>- Nullam consectetur turpis in ex posuere, eget malesuada tellus congue.</Text>
        </View>
        <Text style={styles.title}> Fertilisation</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionItem}>- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          <Text style={styles.descriptionItem}>- Sed fermentum risus et lectus tincidunt.</Text>
          <Text style={styles.descriptionItem}>- Vitae dignissim velit elementum.</Text>
          <Text style={styles.descriptionItem}>- Donec euismod, enim et fermentum gravida, ipsum velit pellentesque elit.</Text>
          <Text style={styles.descriptionItem}>- Ut accumsan erat quam eu lectus.</Text>
          <Text style={styles.descriptionItem}>- Aliquam sem lacus, congue eu augue id, gravida rutrum velit.</Text>
          <Text style={styles.descriptionItem}>- Nulla facilisi.</Text>
          <Text style={styles.descriptionItem}>- In hac habitasse platea dictumst.</Text>
          <Text style={styles.descriptionItem}>- Sed convallis sapien eget arcu malesuada, vitae venenatis sapien malesuada.</Text>
          <Text style={styles.descriptionItem}>- Nullam consectetur turpis in ex posuere, eget malesuada tellus congue.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'flex-start',
    marginTop: 70,
    marginLeft: 20,
    borderRadius: 10
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionItem: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DescriptionPage;








// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const DescriptionPage = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Illness Description</Text>
//       <Text style={styles.description}>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum risus et lectus
//         tincidunt, vitae dignissim velit elementum. Donec euismod, enim et fermentum gravida, ipsum
//         velit pellentesque elit, ut accumsan erat quam eu lectus. Aliquam sem lacus, congue eu augue
//         id, gravida rutrum velit. Nulla facilisi. In hac habitasse platea dictumst. Sed convallis
//         sapien eget arcu malesuada, vitae venenatis sapien malesuada. Nullam consectetur turpis in
//         ex posuere, eget malesuada tellus congue.
//       </Text>
//       <Text style={styles.title}>Fertilisation</Text>
//       <Text style={styles.description}>
//         Integer eu lacus suscipit, mattis elit in, suscipit sem. Ut a arcu sem. Morbi at ex sapien.
//         Nam in arcu finibus, viverra velit eu, faucibus nisi. Fusce commodo tempor justo, vitae
//         dapibus justo malesuada ac. Sed aliquam, mi a vestibulum egestas, felis ligula dictum
//         lectus, ut facilisis erat elit sed velit.
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#ffffff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 15,
//   },
// });

// export default DescriptionPage;
