import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {fontType, colors} from './src/theme';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {
    id: '1',
    title: 'Minimalist Concept',
    image: require('./src/images/Concept1.jpg'),
  },
  {
    id: '2',
    title: 'Modern Concept',
    image: require('./src/images/Concept2.jpg'),
  },
  {
    id: '3',
    title: 'Tropical Modern Concept',
    image: require('./src/images/Concept3.jpg'),
  },
];

const features = [
  {
    id: '4',
    title: 'Material',
    logo: require('./src/icons/Feature1.png'),
    backgroundColor: ['lightblue', 'lightcyan'],
  },
  {
    id: '5',
    title: 'Consultation',
    logo: require('./src/icons/Feature2.png'),
    backgroundColor: ['lightcoral', 'lightpink'],
  },
  {
    id: '6',
    title: 'Design Details',
    logo: require('./src/icons/Feature3.png'),
    backgroundColor: ['lightgreen', 'lightseagreen'],
  },
  {
    id: '7',
    title: 'Furniture',
    logo: require('./src/icons/Feature4.png'),
    backgroundColor: ['lightsalmon', 'lightsalmon'],
  },
  {
    id: '8',
    title: 'Unit Price',
    logo: require('./src/icons/Feature5.png'),
    backgroundColor: ['lightpink', 'lightpink'],
  },
  {
    id: '9',
    title: 'House Type',
    logo: require('./src/icons/Feature6.png'),
    backgroundColor: ['lightskyblue', 'lightskyblue'],
  },
  {
    id: '10',
    title: 'Architect Contact',
    logo: require('./src/icons/Feature7.png'),
    backgroundColor: ['lightseagreen', 'lightseagreen'],
  },
  {
    id: '11',
    title: 'Transaction',
    logo: require('./src/icons/Feature8.png'),
    backgroundColor: ['lightsteelblue', 'lightsteelblue'],
  },
];

const houseData = [
  {
    id: '101',
    title: 'Classic Italian House',
    image: require('./src/images/Concept4.jpg'),
    rating: 4.5,
    price: 2750000000,
  },
  {
    id: '102',
    title: 'Classic American House',
    image: require('./src/images/Concept5.jpg'),
    rating: 4.2,
    price: 2100000000,
  },
  {
    id: '103',
    title: 'Contemporary House',
    image: require('./src/images/Concept6.jpg'),
    rating: 4.0,
    price: 1850000000,
  },
  {
    id: '104',
    title: 'Scandinavian House',
    image: require('./src/images/Concept7.jpg'),
    rating: 4.6,
    price: 3200000000,
  },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Architectura</Text>
        <View style={styles.headerRight}>
          <Image
            source={require('./src/icons/notification.png')}
            style={styles.notificationIcon}
          />
          <Image source={require('./src/icons/user.jpg')} style={styles.logo} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for projects or ideas"
            placeholderTextColor="#999"
          />
          <Image
            source={require('./src/icons/search.png')}
            style={styles.searchIcon}
          />
        </View>
        <CarouselItem/>
        <Feature/>
        <PriceList/>
      </ScrollView>
    </View>
  );
};

const CarouselItem = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.imageOverlay} />
      <View style={styles.titleAndBookmarkContainer}>
        <TouchableOpacity style={styles.titleContainer} onPress={() => {}}>
          <Text style={styles.titleCarousel}>{item.title}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.bookmarkIconContainer} onPress={() => {}}>
        <Image
          source={require('./src/icons/bookmark.png')}
          style={styles.bookmarkIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        layout={'default'}
        data={data}
        renderItem={renderItem}
        sliderWidth={370}
        itemWidth={370}
        onSnapToItem={index => setActiveSlide(index)}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        contentContainerCustomStyle={styles.carouselContentContainer}
        autoplay={true}
        loop={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={0.7}
        inactiveDotScale={1.2}
      />
    </View>
  );
};

const Feature = () => {
  const columns = 8;
  const rows = 2;

  const featuresRows = [];

  for (let i = 0; i < rows; i++) {
    const rowElements = features.slice(i * columns, (i + 1) * columns);
    featuresRows.push(rowElements);
  }
  return (
    <>
      <View style={styles.featureHeader}>
        <Text style={styles.featureHeaderTitle}>Feature</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuresScrollView}>
        {featuresRows.map((row, rowIndex) => (
          <View style={styles.featuresRow} key={rowIndex}>
            {row.map((feature, featureIndex) => (
              <TouchableOpacity
                style={{
                  ...styles.feature,
                  marginLeft: 5,
                  marginRight: 5,
                  ...(feature.id === '7' ? styles.feature7 : {}),
                  ...(feature.id === '11' ? styles.feature8 : {}),
                }}
                key={feature.id}
                onPress={() => {}}>
                <LinearGradient
                  colors={feature.backgroundColor}
                  style={{
                    height: '100%',
                    width: '100%',
                    flex: 1,
                    borderRadius: 10,
                    padding: 12,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}>
                  <Image source={feature.logo} style={styles.featureLogo} />
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const PriceList = () => {
  return (
    <>
      <View style={styles.housePriceListHeader}>
        <Text style={styles.housePriceListHeaderTitle}>House Price List</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.houseListContainer}>
        {houseData.map((house, index) => (
          <TouchableOpacity
            style={styles.houseCard}
            key={house.id}
            onPress={() => {}}>
            <Image source={house.image} style={styles.houseImage} />
            <View style={styles.houseInfo}>
              <Text style={styles.houseTitle}>{house.title}</Text>
              <View style={styles.ratingContainer}>
                <Image
                  source={require('./src/icons/star.png')}
                  style={styles.starIcon}
                />
                <Text style={styles.ratingText}>{house.rating}</Text>
              </View>
              <Text
                style={
                  styles.priceText
                }>{`Rp ${house.price.toLocaleString()}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors['white'],
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors['black'],
    fontFamily: fontType['Mistrully'],
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationIcon: {
    width: 30,
    height: 30,
  },
  subheader: {
    fontSize: 16,
    color: '#555',
    margin: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 8,
    width: 350,
    height: 220,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    fontFamily: fontType['Pjs-ExtraBold'],
    bottom: 10,
    left: 10,
    color: 'white',
  },
  subtitle: {
    fontSize: 12,
    color: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    flex: 1,
    paddingLeft: 16,
    fontFamily: fontType['Pjs-ExtraLight'],
    fontSize: 16,
  },
  searchIcon: {
    width: 24,
    height: 24,
    margin: 8,
    tintColor: '#999',
  },
  carouselContainer: {
    alignItems: 'center',
  },
  titleAndBookmarkContainer: {
    position: 'relative',
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  titleCarousel: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    fontFamily: fontType['Pjs-ExtraBold'],
    bottom: 10,
    left: 10,
    color: 'white',
  },
  bookmarkIconContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  bookmarkIcon: {
    width: 20,
    height: 20,
  },
  navigationContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  navigationButton: {
    alignItems: 'center',
  },
  navigationIcon: {
    width: 30,
    height: 30,
  },
  navigationText: {
    fontSize: 12,
    color: colors['black'],
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors['black'],
  },
  paginationInactiveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors['grey'],
  },
  carouselContentContainer: {
    alignItems: 'center',
    marginTop: -20,
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  featuresScrollView: {
    marginTop: 10,
    paddingHorizontal: 16,
    alignSelf: 'stretch',
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  feature: {
    width: '22%',
    height: 100,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginLeft: 5,
    marginRight: 5,
  },
  feature7: {
    marginRight: 45,
  },
  feature8: {
    marginRight: 45,
  },
  featureLogo: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  featureTitle: {
    fontSize: 14,
    top: 50,
    left: 5,
    fontFamily: fontType['Pjs-Medium'],
    color: colors['black'],
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  featureHeaderTitle: {
    fontSize: 20,
    marginLeft: 3,
    fontWeight: 'bold',
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors['black'],
  },
  seeAllButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
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
    fontSize: 16,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    color: colors['black'],
  },
});

export default HomeScreen;
