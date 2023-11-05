import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { fontType, colors } from '../../theme';
import { houseData } from '../../../data';
import { PriceList } from '../../components';
const category = [
  { id: 1, label: 'Classic' },
  { id: 2, label: 'Contemporary' },
  { id: 3, label: 'Minimalist' },
  { id: 4, label: 'Modern' },
  { id: 5, label: 'Industrial' },
  { id: 6, label: 'Tropical' },
  { id: 7, label: 'Mediterranean' },
];
const ItemCategory = ({ item, activeCategory, setActiveCategory }) => {
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
const FlatListCategory = ({ activeCategory, setActiveCategory }) => {
  return (
    <FlatList
      data={category}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <ItemCategory
          item={item}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
const HouseScreen = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const filteredData = activeCategory
    ? houseData.filter(
        house => house.category === category[activeCategory - 1].label,
      )
    : houseData;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Architectura</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <FlatListCategory
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for projects or ideas"
            placeholderTextColor="#999"
          />
          <Image
            source={require('../../icons/search.png')}
            style={styles.searchIcon}
          />
        </View>
        <View style={styles.housePriceListHeader}>
          <Text style={styles.housePriceListHeaderTitle}>House Price List</Text>
        </View>
        <View style={styles.cardPrizeList}>
          <PriceList data={filteredData} />
        </View>
      </ScrollView>
    </View>
  );
};
export default HouseScreen;

const styles = StyleSheet.create({
  housePriceListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
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
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
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