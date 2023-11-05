import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {fontType, colors} from '../../theme';
const FurnitureScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Architectura</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
          <Text style={styles.housePriceListHeaderTitle}>
            Category Furniture
          </Text>
        </View>
        <CategoryFurniture />
      </ScrollView>
    </View>
  );
};
const CategoryFurniture = () => {
  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity style={styles.categoryItem}>
        <Image
          source={require('../../images/Search_LivingRoom_8.jpeg')}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryText}>Living Room</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryItem}>
        <Image
          source={require('../../images/Search_BedRoom_7.jpeg')}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryText}>Bed Room</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryItem}>
        <Image
          source={require('../../images/Search_Kitchen_10.jpeg')}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryText}>Kitchen Room</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryItem}>
        <Image
          source={require('../../images/Search_BathRoom_7.jpeg')}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryText}>Bath Room</Text>
      </TouchableOpacity>
    </View>
  );
};
export default FurnitureScreen;

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
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 16,
  },
  categoryItem: {
    width: '48%', 
    backgroundColor: colors['white'],
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  categoryImage: {
    width: '110%',
    height: 220,
  },
  categoryText: {
    fontFamily: fontType['Pjs-ExtraBold'],
    fontSize: 16,
    marginTop: 8,
    position: 'absolute',
    bottom: 16,
    left: 10,
    color: 'white',
  },
});
