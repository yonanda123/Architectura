import React,  { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../theme';
const getFontSizeForTitle = (title, containerWidth) => {
  const titleLength = title.length;
  if (titleLength <= 20) {
    return 20;
  } else {
    const maxFontSize = 16;
    const minFontSize = 16;
    const maxWidth = containerWidth * 0.9;
    const desiredWidth = maxWidth * 0.9;
    const fontSize = (desiredWidth / titleLength) * 1.5;
    return Math.min(maxFontSize, Math.max(minFontSize, fontSize));
  }
};
const HouseDetail = ({route}) => {
  const {house} = route.params;
  const navigation = useNavigation();
  const [isLoveActive, setIsLoveActive] = useState(false);
  const handleBackButton = () => {
    navigation.goBack();
  };
  const handleLoveButton = () => {
    setIsLoveActive(!isLoveActive);
  };
  return (
    <View style={styles.container}>
      <Image source={house.image} style={styles.houseImage} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
          <Image
            source={require('../../icons/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoveButton} style={styles.loveButton}>
          <Image
            source={
              isLoveActive
                ? require('../../icons/love-dark.png')
                : require('../../icons/love-light.png')
            }
            style={styles.loveIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerOverlay}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.category}>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>{house.category}</Text>
            </TouchableOpacity>
            <View style={styles.ratingContainer}>
              <Image
                source={require('../../icons/star.png')}
                style={styles.ratingIcon}
              />
              <Text style={styles.ratingText}>{house.rating}</Text>
            </View>
          </View>
          <View style={styles.containerRowPrice}>
            <Text
              style={[
                styles.houseTitle,
                {
                  fontSize: getFontSizeForTitle(
                    house.title,
                    Dimensions.get('window').width,
                  ),
                },
              ]}>
              {house.title}
            </Text>
            <View style={styles.priceContainer}>
              <Image
                source={require('../../icons/money.png')}
                style={styles.priceIcon}
              />
              <Text style={styles.priceText}>{`Rp ${house.price}`}</Text>
            </View>
          </View>
          <View style={styles.addressContainer}>
            <Image
              source={require('../../icons/location.png')}
              style={styles.locationIcon}
            />
            <Text style={styles.addressText}>{house.address}</Text>
          </View>
          <View style={styles.propertyDetails}>
            <View style={styles.LBContainer}>
              <Image
                source={require('../../icons/BuildingArea.png')}
                style={styles.BuildingAreaIcon}
              />
              <Text
                style={
                  styles.detailText
                }>{`LB ${house.buildingArea} m²   `}</Text>
            </View>
            <View style={styles.LTContainer}>
              <Image
                source={require('../../icons/SurfaceArea.png')}
                style={styles.BuildingAreaIcon}
              />
              <Text style={styles.detailText}>{`LT ${house.landArea} m²`}</Text>
            </View>
          </View>
          <Text style={styles.RoomText}>Room</Text>
          <View style={styles.featuresContainer}>
            <View style={styles.featureIcon}>
              <Image
                source={require('../../icons/bathroom.png')}
                style={styles.iconImage}
              />
              <Text style={styles.iconText}>{`${house.bathrooms} Baths`}</Text>
            </View>
            <View style={styles.featureIcon}>
              <Image
                source={require('../../icons/bedroom.png')}
                style={styles.iconImage}
              />
              <Text style={styles.iconText}>{`${house.bedrooms} Rooms`}</Text>
            </View>
          </View>
          <Text style={styles.RoomText}>Description</Text>
          <Text style={styles.descriptionText}>{house.description}</Text>
        </ScrollView>
      </View>
      <View style={styles.bottomNavigation}>
      <TouchableOpacity style={styles.messageButton}>
          <Image
            source={require('../../icons/chat99.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity style={styles.cartButton}>
          <Image
            source={require('../../icons/add-cart99.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HouseDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    top: 16,
    position: 'absolute',
    width: '100%',
  },
  loveButton: {
    justifyContent: 'flex-end',
  },
  loveIcon: {
    width: 28,
    height: 28,
    marginTop: 4,
  },
  backButton: {
    justifyContent: 'flex-start',
  },
  backIcon: {
    width: 28,
    height: 28,
    marginTop: 4,
  },
  houseImage: {
    width: '100%',
    height: 300,
  },
  containerOverlay: {
    position: 'absolute',
    top: 260,
    left: 0,
    right: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.white(),
  },
  scrollViewContent: {
    top: 12,
    padding: 24,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryButton: {
    backgroundColor: colors.blue(),
    borderRadius: 12,
    paddingVertical: 6,
    alignItems: 'center',
    width: 100,
  },
  categoryButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fontType['Pjs-ExtraBold'],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    color: colors.grey(),
    fontFamily: fontType['Pjs-Medium'],
  },
  houseTitle: {
    fontSize: 20,
    marginTop: 18,
    fontFamily: fontType['Pjs-ExtraBold'],
  },
  containerRowPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  priceIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  priceText: {
    fontSize: 16,
    color: colors.blue(),
    fontFamily: fontType['Pjs-Medium'],
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  BuildingAreaIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
    marginTop: 2,
  },
  addressText: {
    fontSize: 16,
    color: colors.grey(),
    fontFamily: fontType['Pjs-Medium'],
  },
  propertyDetails: {
    flexDirection: 'row',
    marginTop: 20,
  },
  LBContainer: {
    flexDirection: 'row',
  },
  LTContainer: {
    flexDirection: 'row',
  },
  RoomText: {
    fontSize: 16,
    marginTop: 20,
    color: colors.black(),
    fontFamily: fontType['Pjs-ExtraBold'],
  },
  detailText: {
    fontSize: 16,
    marginRight: 20,
    color: colors.grey(),
    fontFamily: fontType['Pjs-Medium'],
  },
  featuresContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  featureIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  iconImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  iconText: {
    fontSize: 16,
    color: colors.grey(),
    fontFamily: fontType['Pjs-Medium'],
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 12,
    color: 'black',
    fontFamily: fontType['Pjs-Medium'],
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    height: 56,
    borderTopWidth: 1,
    borderTopColor: colors.grey(0.3),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  messageButton: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.grey(0.2),
  },
  buyNowButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.blue(),
    paddingVertical: 16,
  },
  buyNowText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fontType['Pjs-Medium'],
  },
});
