import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors, sizes, spacing} from '../../constants/theme';
import FavoriteButton from '../shared/FavoriteButton';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import Card from '../shared/Card/Card';
import CardMedia from '../shared/Card/CardMedia';
import CardContent from '../shared/Card/CardContent';

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = 220;

const Popular = ({list}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {list?.map((item, index) => {
        const {culture,favorite} = item
        return (
          <Card
            key={item.id}
            style={styles.card}
            onPress={() => {
              navigation.navigate('Describe', {culture});
            }}>
            <SharedElement id={`trip.${item.id}.image`} style={StyleSheet.absoluteFillObject}>
              <CardMedia source={{uri:culture.photo}} borderBottomRadius />
            </SharedElement>
            <CardContent style={styles.content}>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{culture.name}</Text>
                <Text style={styles.location} numberOfLines={1}>{culture.description}</Text>
              </View>
              <FavoriteButton onPress={() => {}} />
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  media: {
    flex: 1,
  },
  content: {
    paddingRight: spacing.m / 2,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    marginVertical: 4,
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 150,
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default Popular;