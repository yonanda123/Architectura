import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {fontType, colors} from '../../theme';
import {PriceList} from '../../components';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const category = [
  {id: 1, label: 'Classic'},
  {id: 2, label: 'Contemporary'},
  {id: 3, label: 'Minimalist'},
  {id: 4, label: 'Modern'},
  {id: 5, label: 'Industrial'},
  {id: 6, label: 'Tropical'},
  {id: 7, label: 'Mediterranean'},
];
const ItemCategory = ({item, activeCategory, setActiveCategory}) => {
  return (
    <TouchableOpacity
      style={[
        styleCategory.button,
        activeCategory === item.id ? styleCategory.active : {},
      ]}
      onPress={() => setActiveCategory(item.id)}>
      <Text
        style={[
          styleCategory.label,
          activeCategory === item.id ? styleCategory.activeText : {},
        ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};
const FlatListCategory = ({activeCategory, setActiveCategory}) => {
  return (
    <FlatList
      data={category}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <ItemCategory
          item={item}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}
      ItemSeparatorComponent={() => <View style={{width: 10}} />}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
const HouseScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [propertyData, setPropertyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const subscriber = firestore()
      .collection('property')
      .onSnapshot(querySnapshot => {
        const property = [];
        const categories = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          property.push({
            ...data,
            id: documentSnapshot.id,
          });
          categories.push({
            id: documentSnapshot.id,
            label: {id: data.category.id, name: data.category.name},
          });
        });
        setPropertyData(property);
        setCategoryData(categories);
        setLoading(false);
      });
    return () => subscriber();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('property')
        .onSnapshot(querySnapshot => {
          const properties = [];
          querySnapshot.forEach(documentSnapshot => {
            properties.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setPropertyData(properties);
          setRefreshing(false);
        });
    }, 1500);
  }, []);
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 150);
  const recentY = diffClampY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
    extrapolate: 'clamp',
  });
  const [activeCategory, setActiveCategory] = useState(1);
  const filteredData = activeCategory
    ? propertyData.filter(
        house =>
          house.category.id === activeCategory &&
          category.find(cat => cat.id === activeCategory)?.label ===
            house.category.name,
      )
    : propertyData;
  console.log(categoryData);
  console.log(propertyData);
  console.log(filteredData);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Architectura</Text>
        <TouchableWithoutFeedback>
          <View style={styles.bar}>
            <Image
              source={require('../../icons/search.png')}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for projects or ideas"
              placeholderTextColor="#999"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Animated.View
        style={[styles.headerContainer, {transform: [{translateY: recentY}]}]}>
        <FlatListCategory
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 10,
          paddingVertical: 20,
          paddingTop: 142,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.housePriceListHeader}>
          <Text style={styles.housePriceListHeaderTitle}>House Price List</Text>
        </View>
        {loading ? (
          <ActivityIndicator size={'large'} color={colors.blue()} />
        ) : (
          filteredData.map((item, index) => (
            <PriceList item={item} key={index} />
          ))
        )}
      </Animated.ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddFormHouse')}>
        <Image
          source={require('../../icons/pencil.png')}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
    </View>
  );
};
export default HouseScreen;

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: colors.blue(),
    padding: 15,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 10,
    shadowColor: colors.blue(),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 16,
    paddingBottom: 16,
    position: 'absolute',
    top: 0,
    zIndex: 1000,
    right: 0,
    left: 0,
    backgroundColor: '#f2f2f2',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fontType['Mist'],
  },
  bar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: colors.grey(0.05),
    borderRadius: 20,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 16,
  },
  headerContainer: {
    position: 'absolute',
    backgroundColor: '#f2f2f2',
    zIndex: 999,
    top: 118,
    left: 0,
    right: 0,
    elevation: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  housePriceListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
  },
  housePriceListHeaderTitle: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors['black'],
  },
  container: {
    flex: 1,
  },
});

const styleCategory = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderColor: colors.grey(0.15),
    borderWidth: 1,
    backgroundColor: colors.grey(0.03),
  },
  label: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.65),
  },
  text: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    paddingVertical: 5,
  },
  active: {
    backgroundColor: colors.blue(),
  },
  activeText: {
    color: colors.white(),
  },
});
