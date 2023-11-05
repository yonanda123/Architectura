import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {fontType, colors} from '../../theme';
import {roomData} from '../../../data';
import Card from '../../components/Card'; 
const categories = [
  {id: 1, label: 'Living Room'},
  {id: 2, label: 'Bed Room'},
  {id: 3, label: 'Kitchen'},
  {id: 4, label: 'Bath Room'},
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
      data={categories}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <ItemCategory
          item={item}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}
      ItemSeparatorComponent={() => <View style={{width: 10}} />}
      contentContainerStyle={{paddingHorizontal: 16}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
const RoomScreen = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const filteredData = activeCategory
    ? roomData.filter(
        house => house.category === categories[activeCategory - 1].label,
      )
    : roomData;
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
        <GridView filteredData={filteredData} />
      </ScrollView>
    </View>
  );
};
const GridView = ({filteredData}) => {
  const width = Dimensions.get('window').width / 2.22;
  return (
    <View style={{flexDirection: 'row', padding: 16}}>
      <View style={{marginRight: 5}}>
        {filteredData
          .filter((_, i) => i % 2 === 0)
          .map(item => (
            <Card
              image={item.image}
              aspectRatio={item.aspectRatio}
              width={width}
              key={item.id}
            />
          ))}
      </View>
      <View style={{marginLeft: 5}}>
        {filteredData
          .filter((_, i) => i % 2 !== 0)
          .map(item => (
            <Card
              image={item.image}
              aspectRatio={item.aspectRatio}
              width={width}
              key={item.id}
            />
          ))}
      </View>
    </View>
  );
};
export default RoomScreen;

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
  subheader: {
    fontSize: 16,
    color: '#555',
    margin: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
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
  active: {
    backgroundColor: colors.blue(),
  },
  activeText: {
    color: colors.white(),
  },
});
