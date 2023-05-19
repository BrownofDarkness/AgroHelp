import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import Icon from '../components/shared/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CropDetailsCard from '../components/CropDetails/CropDetailsCard/CropDetailsCard';
import * as Animatable from 'react-native-animatable';
import CropDetailsCarousel from '../components/CropDetails/CropDetailsCarousel';
import FavoriteButton from '../components/shared/FavoriteButton';

const CropDetailsScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const {trip} = route.params;
  const slides = [trip.image, ...trip.gallery];
  return (
    <View style={styles.container}>
      <Animatable.View
        style={[styles.backButton, {marginTop: insets.top}]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out">
        <Icon
          icon="Back"
          viewStyle={styles.backIcon}
          size={24}
          onPress={navigation.goBack}
        />
      </Animatable.View>
      <Animatable.View
        style={[styles.favoriteButton, {marginTop: insets.top}]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out">
        <FavoriteButton onPress={() => {}} />
      </Animatable.View>
      <CropDetailsCarousel slides={slides} id={trip.id} />
      <CropDetailsCard trip={trip} />
    </View>
  );
};

CropDetailsScreen.sharedElements = route => {
  const {trip} = route.params;
  return [
    {
      id: `trip.${trip.id}.image`,
    },
  ];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBox: {
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: sizes.width,
    height: sizes.height,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    left: spacing.l,
    zIndex: 1,
  },
  backIcon: {
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: sizes.radius,
    ...shadow.light,
  },
  favoriteButton: {
    position: 'absolute',
    right: spacing.l,
    zIndex: 1,
  },
});

export default CropDetailsScreen;
