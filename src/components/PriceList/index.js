import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../theme';

const ItemSmall = ({item}) => {
  const navigation = useNavigation();
  console.log(item);
  return (
    <TouchableOpacity
      style={stylesPriceList.houseCard}
      onPress={() => navigation.navigate('DetailHouse', {houseId: item.id})}>
      <FastImage
        style={stylesPriceList.houseImage}
        source={{
          uri: item?.image,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={stylesPriceList.houseInfo}>
        <View style={stylesPriceList.houseTopInfo}>
          <Text style={stylesPriceList.categoryText}>
            {item?.category.name}
          </Text>
          <Text
            style={[
              stylesPriceList.priceText,
            ]}>{`Rp ${item?.price} ${item?.nominal}`}</Text>
        </View>
        <Text style={stylesPriceList.houseTitle}>{item?.title}</Text>
        <Text style={stylesPriceList.addressText}>{item?.address}</Text>
        <View style={stylesPriceList.propertyDetails}>
          <Text
            style={
              stylesPriceList.detailText
            }>{`LB ${item?.buildingArea} m²   `}</Text>
          <Text
            style={
              stylesPriceList.detailText
            }>{`LT ${item?.landArea} m²`}</Text>
        </View>
        <View style={stylesPriceList.divider} />
        <View style={stylesPriceList.featuresContainer}>
          <View style={stylesPriceList.featureIcon}>
            <Image
              source={require('../../icons/bathroom.png')}
              style={stylesPriceList.iconImage}
            />
            <Text style={stylesPriceList.iconText}>{`${item?.bathrooms}`}</Text>
          </View>
          <View style={stylesPriceList.featureIcon}>
            <Image
              source={require('../../icons/bedroom.png')}
              style={stylesPriceList.iconImage}
            />
            <Text style={stylesPriceList.iconText}>{`${item?.bedrooms}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemSmall;

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
  priceText: {
    color: colors.grey(),
    fontSize: 12,
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