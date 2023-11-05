import React from 'react';
import {Text, View, Image} from 'react-native';

const Card = ({image, width, aspectRatio}) => {
  return (
    <View
      style={{
        
        width: width,
        height: width * aspectRatio,
        marginBottom :10,
        borderRadius: 10,
      }}>
        <Image source={image} style={{ width: '100%', height: '100%' }} resizeMode="cover"  />
      </View>
  );
};

export default Card;
