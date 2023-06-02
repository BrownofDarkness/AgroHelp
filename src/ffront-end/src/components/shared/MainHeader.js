import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from './Icon';
import { sizes, spacing } from '../../constants/theme';

const MainHeader = ({ title }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();


  const goToMainTabScreen = () => {
    navigation.navigate('Menu');
  };


  const goToNotificationScreen = () => {
    navigation.navigate('Notification');
  };

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <TouchableOpacity onPress={goToMainTabScreen}>
       <Icon icon="Hamburger" />
      </TouchableOpacity> 
      {/* <Icon icon="Hamburger" onPress={() => {}} /> */}
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={goToNotificationScreen}>
        <Icon icon="Notification" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    backgroundColor: '#025592',
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: '#ffffff'
  },
});

export default MainHeader;






// import React from 'react';
// import {Text, View, StyleSheet} from 'react-native';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import Icon from './Icon';
// import {sizes, spacing} from '../../constants/theme';
//import NotificationScreen from '../../screens/Home/Notification/NotificationScreen';

// const MainHeader = ({title}) => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();

//   const goToNotificationScreen = () => {
//     navigation.navigate('NotificationScreen');
//   };
//   return (
//     <View style={[styles.container, {marginTop: insets.top}]}>
//       <Icon icon="Hamburger" onPress={() => {}} />
//       <Text style={styles.title}>{title}</Text>
      // <TouchableOpacity onPress={goToNotificationScreen}>
      //   <Icon icon="Notification" />
      // </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: spacing.l,
//   },
//   title: {
//     fontSize: sizes.h3,
//     fontWeight: 'bold',
//   },
// });

// export default MainHeader;
