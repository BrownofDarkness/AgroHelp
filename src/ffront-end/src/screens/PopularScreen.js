import React from 'react';
import {View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import {colors} from '../constants/theme';
import {PLACES, TOP_PLACES} from '../data';
import SectionHeader from '../components/shared/SectionHeader';
import ApiService from '../utils/ApiService';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Popular from '../components/Home/Popular';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const PopularScreen = () => {
  const [popularCultures,setPopularCultures] = useState([])
  const {token,user} = useAuth()
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
   ApiService.getPopularCultures(token).then(res=>res.json()).then(cultures=>{
    setPopularCultures(cultures)
    console.log(cultures[0].culture)
   }).catch(err=>console.log(err.message))
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    ApiService.getPopularCultures(token).then(res=>res.json()).then(cultures=>{
      setPopularCultures(cultures)
      console.log(cultures[0].culture)
     }).catch(err=>console.log(err.message))
    setTimeout(() => {

      setRefreshing(false);
    }, 2000);
  }, []);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <SectionHeader
        //   title="Other Crops"
        />

        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <SectionHeader
          title="All Crops"
          
        />
        <Popular list={popularCultures} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
//   backButton: {
//     position: 'absolute',
//     top: 100,
//     left: 100,
//     bottom: 100,
//     zIndex: 1,
//   },
});

export default PopularScreen;
