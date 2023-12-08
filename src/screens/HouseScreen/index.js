import React, {useState, useRef} from 'react';
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
} from 'react-native';
import {fontType, colors} from '../../theme';
import {houseData} from '../../../data';
import {PriceList} from '../../components';
import {useNavigation} from '@react-navigation/native';
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
  const handleNavigateToAddForm = () => {
    navigation.navigate('AddFormHouse');
  };
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 150);
  const recentY = diffClampY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
    extrapolate: 'clamp',
  });
  const [activeCategory, setActiveCategory] = useState(1);
  const filteredData = activeCategory
    ? houseData.filter(
        house => house.category === category[activeCategory - 1].label,
      )
    : houseData;
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
        contentContainerStyle={{paddingTop: 142}}>
        <View style={styles.housePriceListHeader}>
          <Text style={styles.housePriceListHeaderTitle}>House Price List</Text>
        </View>
        <View style={styles.cardPrizeList}>
          <PriceList data={filteredData} />
        </View>
      </Animated.ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleNavigateToAddForm}>
        <Image
          source={require('../../icons/plus.png')}
          style={styles.floatingButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
};
export default HouseScreen;

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0072ff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  floatingButtonImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
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
    tintColor: '#999',
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
    marginHorizontal: 16,
    paddingTop: 48,
  },
  housePriceListHeaderTitle: {
    fontSize: 20,
    marginLeft: 3,
    fontFamily: fontType['Pjs-Bold'],
    color: colors['black'],
  },
  cardPrizeList: {
    padding: 16,
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
