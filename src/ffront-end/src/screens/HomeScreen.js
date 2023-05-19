import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {colors} from '../constants/theme';
import MainHeader from '../components/shared/MainHeader';
import ScreenHeader from '../components/shared/ScreenHeader';
import TopPlacesCarousel from '../components/Home/TopPlacesCarousel';
import {PLACES, TOP_PLACES} from '../data';
import SectionHeader from '../components/shared/SectionHeader';
import CropsList from '../components/Home/CropsList';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <MainHeader title="Agro App" />
      <ScreenHeader mainTitle="Hello Borista" secondTitle="We offer just the Best" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopPlacesCarousel list={TOP_PLACES} />
        <SectionHeader
          title="Popular Crops"
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
