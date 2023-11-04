import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import {fontType, colors} from './src/theme';
import LinearGradient from 'react-native-linear-gradient';
import {CarouselData, features, houseData} from './data';
import {PriceList} from './src/components';

const App = () => {
  return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Architectura</Text>
          <View style={styles.headerRight}>
            <Image
              source={require('./src/icons/notification.png')}
              style={styles.notificationIcon}
            />
            <Image
              source={require('./src/icons/user.jpg')}
              style={styles.logo}
            />
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
          <Carousel />
          <Feature />
          <PriceList data={houseData} />
        </ScrollView>
      </View>
  );
};

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const handleNext = () => {
    if (activeSlide < CarouselData.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      setActiveSlide(0);
    }
  };
  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      handleNext();
      carouselRef.current.scrollTo({
        x: activeSlide * Dimensions.get('window').width,
        animated: true,
      });
    }, 3000);
    return () => {
      clearInterval(autoplayInterval);
    };
  }, [activeSlide]);

  return (
    <View style={stylesCorousel.carouselContainer}>
      <ScrollView
        ref={carouselRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const slideWidth = Dimensions.get('window').width;
          const currentIndex = event.nativeEvent.contentOffset.x / slideWidth;
          setActiveSlide(Math.round(currentIndex));
        }}>
        {CarouselData.map((item, index) => (
          <View key={item.id} style={stylesCorousel.slide}>
            <Image source={item.image} style={stylesCorousel.image} />
            <Text style={stylesCorousel.title}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
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
      <View style={stylesFeature.featureHeader}>
        <Text style={stylesFeature.featureHeaderTitle}>Feature</Text>
        <TouchableOpacity style={stylesFeature.seeAllButton}>
          <Text style={stylesFeature.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={stylesFeature.featuresScrollView}>
        {featuresRows.map((row, rowIndex) => (
          <View style={stylesFeature.featuresRow} key={rowIndex}>
            {row.map((feature, featureIndex) => (
              <TouchableOpacity
                style={{
                  ...stylesFeature.feature,
                  marginLeft: 5,
                  marginRight: 5,
                  ...(feature.id === '7' ? stylesFeature.feature7 : {}),
                  ...(feature.id === '11' ? stylesFeature.feature8 : {}),
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
                  <Image
                    source={feature.logo}
                    style={stylesFeature.featureLogo}
                  />
                  <Text style={stylesFeature.featureTitle}>
                    {feature.title}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default App;

const stylesFeature = StyleSheet.create({
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
    fontFamily: fontType['Pjs-ExtraBold'],
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

const stylesCorousel = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    marginBottom: 18,
    width: Dimensions.get('window').width,
  },
  slide: {
    width: Dimensions.get('window').width,
    height: 220,
    alignItems: 'center',
  },
  image: {
    width: 355,
    height: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    bottom: 16,
    left: 30,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
  },
});

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
    fontFamily: fontType['Mist'],
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
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 16,
  },
  searchIcon: {
    width: 24,
    height: 24,
    margin: 8,
    tintColor: '#999',
  },
});
