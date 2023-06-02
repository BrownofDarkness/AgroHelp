import React from 'react';
import {View, StyleSheet, ScrollView,RefreshControl} from 'react-native';
import {colors} from '../constants/theme';
import MainHeader from '../components/shared/MainHeader';
import ScreenHeader from '../components/shared/ScreenHeader';
import TopPlacesCarousel from '../components/Home/TopPlacesCarousel';
import {PLACES, TOP_PLACES} from '../data';
import SectionHeader from '../components/shared/SectionHeader';
import CropsList from '../components/Home/CropsList';
import ApiService from '../utils/ApiService';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const HomeScreen = () => {
  const [recommendedCultures,setRecommendedCultures] = useState([])
  const {token,user} = useAuth()
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
   ApiService.getRecommendedCultures(token).then(res=>res.json()).then(cultures=>{
    setRecommendedCultures(cultures)
    console.log(cultures[0].culture)
   }).catch(err=>console.log(err.message))
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    ApiService.getRecommendedCultures(token).then(res=>res.json()).then(cultures=>{
      setRecommendedCultures(cultures)
      console.log(cultures[0].culture)
     }).catch(err=>console.log(err.message))
    setTimeout(() => {

      setRefreshing(false);
    }, 2000);
  }, []);
  
  return (
    <View style={styles.container}>
      <MainHeader title="Agro App" />
      <ScreenHeader mainTitle={`Hello ${user.username}`} secondTitle="We offer just the Best" />
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}>
      <SectionHeader
          title="Cultivatable Crops"
        />
        <TopPlacesCarousel list={recommendedCultures} />
        <SectionHeader
          title="Other Crops"
          buttonTitle="See All"
          onPress={() => {}}
        />
        <CropsList list={PLACES} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default HomeScreen;
