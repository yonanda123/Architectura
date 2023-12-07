import React from 'react';
import {View, Image,StyleSheet} from 'react-native';

const Card = ({image, width, aspectRatio}) => {
  return (
    <View style={[styles.card, {width: width, height: width * aspectRatio}]}>
      <Image source={image} style={styles.image} resizeMode="cover" />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
