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
  return (
    <>
      <View style={stylesPriceList.housePriceListHeader}>
        <Text style={stylesPriceList.housePriceListHeaderTitle}>
          House Price List
        </Text>
        <TouchableOpacity style={stylesPriceList.seeAllButton}>
          <Text style={stylesPriceList.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={stylesPriceList.houseListContainer}>
        {data.map((house, index) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </View>
    </>
  );
};

const HouseCard = ({house}) => {
  return (
    <TouchableOpacity style={stylesPriceList.houseCard} onPress={() => {}}>
      <Image source={house.image} style={stylesPriceList.houseImage} />
      <View style={stylesPriceList.houseInfo}>
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
        <View style={stylesPriceList.ratingContainer}>
          <Image
            source={require('../../icons/star.png')}
            style={stylesPriceList.starIcon}
          />
          <Text style={stylesPriceList.ratingText}>{house.rating}</Text>
        </View>
        <Text
          style={[
            stylesPriceList.priceText,
            {
              fontSize: getFontSizeForTitle(
                house.title,
                Dimensions.get('window').width,
              ),
            },
          ]}>
          {`Rp ${house.price.toLocaleString()}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PriceList;

const stylesPriceList = StyleSheet.create({
  houseListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    marginLeft: 6,
  },
  houseCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  houseImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  houseInfo: {
    padding: 12,
  },
  houseTitle: {
    fontFamily: fontType['Pjs-ExtraBold'],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Light'],
  },
  priceText: {
    fontSize: 16,
    marginTop: 8,
    fontFamily: fontType['Pjs-ExtraBold'],
  },
  housePriceListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  housePriceListHeaderTitle: {
    fontSize: 20,
    marginLeft: 3,
    fontFamily: fontType['Pjs-Bold'],
    color: colors['black'],
  },
  seeAllButton: {
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 16,
    color: colors['blue'],
    fontFamily: fontType['Pjs-SemiBold'],
    textDecorationLine: 'underline',
  },
});
