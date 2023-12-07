import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {fontType, colors} from '../../theme';
import {useNavigation} from '@react-navigation/native';
const getFontSizeForTitle = (title, containerWidth) => {
  const titleLength = title.length;
  if (titleLength <= 20) {
    return 13.4;
  } else {
    const maxFontSize = 12.2;
    const minFontSize = 10;
    const maxWidth = containerWidth * 0.9;
    const desiredWidth = maxWidth * 0.9;
    const fontSize = (desiredWidth / titleLength) * 1.5;
    return Math.min(maxFontSize, Math.max(minFontSize, fontSize));
  }
};
const PriceList = ({data}) => {
  const navigation = useNavigation();
  return (
    <>
      {data.map((house, index) => (
        <HouseCard key={house.id} house={house} navigation={navigation} />
      ))}
    </>
  );
};
const HouseCard = ({ house, navigation }) => {
  const handleHousePress = () => {
    navigation.navigate('DetailHouse', {house});
  };
  return (
    <TouchableOpacity
      style={stylesPriceList.houseCard}
      onPress={handleHousePress}>
      <Image source={house.image} style={stylesPriceList.houseImage} />
      <View style={stylesPriceList.houseInfo}>
        <View style={stylesPriceList.houseTopInfo}>
          <Text style={stylesPriceList.categoryText}>{house.category}</Text>
          <Text style={[stylesPriceList.priceText]}>{`Rp ${house.price}`}</Text>
        </View>
        <Text
          style={[
            stylesPriceList.houseTitle,
            {
              fontSize: getFontSizeForTitle(
                house.title,
                Dimensions.get('window').width,
              ),
            },
          ]}>
          {house.title}
        </Text>
        <Text style={stylesPriceList.addressText}>{house.address}</Text>
        <View style={stylesPriceList.propertyDetails}>
          <Text
            style={
              stylesPriceList.detailText
            }>{`LB ${house.buildingArea} m²   `}</Text>
          <Text
            style={
              stylesPriceList.detailText
            }>{`LT ${house.landArea} m²`}</Text>
        </View>
        <View style={stylesPriceList.divider} />
        <View style={stylesPriceList.featuresContainer}>
          <View style={stylesPriceList.featureIcon}>
            <Image
              source={require('../../icons/bathroom.png')}
              style={stylesPriceList.iconImage}
            />
            <Text style={stylesPriceList.iconText}>{`${house.bathrooms}`}</Text>
          </View>
          <View style={stylesPriceList.featureIcon}>
            <Image
              source={require('../../icons/bedroom.png')}
              style={stylesPriceList.iconImage}
            />
            <Text style={stylesPriceList.iconText}>{`${house.bedrooms}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default PriceList;

const stylesPriceList = StyleSheet.create({
  houseCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 11,
  },
  houseImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  houseInfo: {
    flex: 1,
    padding: 12,
  },
  houseTopInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  houseTitle: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 16,
    marginTop: 5,
  },
  categoryText: {
    color: colors.blue(),
    fontSize: 12,
    fontFamily: fontType['Pjs-ExtraBold'],
  },
  addressText: {
    color: colors.grey(),
    fontSize: 12,
    marginTop: 5,
    fontFamily: fontType['Pjs-Medium'],
  },
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  detailText: {
    color: colors.grey(),
    fontSize: 12,
    fontFamily: fontType['Pjs-Medium'],
  },
  priceText:{
    color: colors.grey(),
    fontSize:12,
    fontFamily: fontType['Pjs-bold'],
  },
  divider: {
    height: 1,
    backgroundColor: colors.grey(0.4),
    marginVertical: 10,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  featureIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  iconImage: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  iconText: {
    color: colors.grey(),
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
  },
});
