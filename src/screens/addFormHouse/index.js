import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {fontType, colors} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
const AddFormHouse = () => {
  const [choosenLabel, setChoosenLabel] = useState('Juta');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const prizeOptions = ['Juta', 'Miliar'];
  const dataCategory = [
    {id: 1, name: 'Classic'},
    {id: 2, name: 'Contemporary'},
    {id: 3, name: 'Minimalist'},
    {id: 4, name: 'Modern'},
    {id: 5, name: 'Industrial'},
    {id: 7, name: 'Mediterranean'},
  ];
  const [propertyData, setPropertyData] = useState({
    title: '',
    price: '',
    category: {},
    address: '',
    buildingArea: '',
    landArea: '',
    bathrooms: '',
    bedrooms: '',
    rating: 0,
    description: '',
  });
  const roundedRating = parseFloat(propertyData.rating.toFixed(1));
  const handleChange = (key, value) => {
    setPropertyData({
      ...propertyData,
      [key]: value,
    });
  };
  const handleRatingChange = increment => {
    const newRating = Math.min(5, Math.max(1, propertyData.rating + increment));
    setPropertyData({
      ...propertyData,
      rating: newRating,
    });
  };
  const handleAddProperty = async () => {
    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const reference = storage().ref(`propertyImages/${filename}`);

    setLoading(true);
    try {
      await reference.putFile(image);
      const url = await reference.getDownloadURL();
      await firestore().collection('property').add({
        title: propertyData.title,
        image: url,
        price: propertyData.price,
        category: propertyData.category,
        address: propertyData.address,
        buildingArea: propertyData.buildingArea,
        landArea: propertyData.landArea,
        bathrooms: propertyData.bathrooms,
        bedrooms: propertyData.bedrooms,
        description: propertyData.description,
        rating: roundedRating,
        createdAt: new Date(),
        nominal: choosenLabel,
      });
      setLoading(false);
      console.log('Property added!');
      navigation.navigate('HouseScreen');
    } catch (e) {
      console.log(e);
    }
  };

  const handleImagePick = async () => {
    ImagePicker.openPicker({
      width: 1920,
      height: 1080,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../icons/left.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.headerTitle}>Add Property</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          <Text style={styles.caption}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={propertyData.title}
            onChangeText={text => handleChange('title', text)}
          />
          <Text style={styles.caption}>Price</Text>
          <View style={styles.priceContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder="Price"
              value={propertyData.price}
              onChangeText={text => handleChange('price', text)}
              keyboardType="numeric"
            />
            <Picker
              selectedValue={choosenLabel}
              style={styles.prizePicker}
              onValueChange={(itemValue, itemIndex) => {
                setChoosenLabel(itemValue);
              }}>
              {prizeOptions.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
            </Picker>
          </View>
          <Text style={styles.caption}>Category</Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const bgColor =
                item.id === propertyData.category?.id
                  ? colors.blue()
                  : colors.grey(0.1);
              const color =
                item.id === propertyData.category?.id
                  ? colors.white()
                  : colors.grey();
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange('category', {id: item.id, name: item.name})
                  }
                  style={[category.item, {backgroundColor: bgColor}]}>
                  <Text style={[category.name, {color: color}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.caption}>Address</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Address"
            value={propertyData.address}
            onChangeText={text => handleChange('address', text)}
            multiline
          />
          <Text style={styles.caption}>Building Area (m²)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Building Area"
              value={propertyData.buildingArea}
              onChangeText={text => handleChange('buildingArea', text)}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} disabled={true}>
              <Text style={styles.buttonText}>m²</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.caption}>Land Area (m²)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Land Area"
              value={propertyData.landArea}
              onChangeText={text => handleChange('landArea', text)}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} disabled={true}>
              <Text style={styles.buttonText}>m²</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.caption}>Bathrooms</Text>
          <TextInput
            style={styles.input}
            placeholder="Bathrooms"
            value={propertyData.bathrooms}
            onChangeText={text => handleChange('bathrooms', text)}
            keyboardType="numeric"
          />
          <Text style={styles.caption}>Bedrooms</Text>
          <TextInput
            style={styles.input}
            placeholder="Bedrooms"
            value={propertyData.bedrooms}
            onChangeText={text => handleChange('bedrooms', text)}
            keyboardType="numeric"
          />
          <Text style={styles.caption}>Rating</Text>
          <View style={styles.ratingContainer}>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleRatingChange(-0.1)}>
              <Image
                source={require('../../icons/minus.png')}
                style={styles.ratingImage}
              />
            </TouchableOpacity>
            <Text style={styles.ratingText}>
              <Text style={styles.ratingText}>
                {propertyData.rating.toFixed(1)}
              </Text>
            </Text>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleRatingChange(0.1)}>
              <Image
                source={require('../../icons/add.png')}
                style={styles.ratingImage}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.caption}>Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Description"
            multiline
            value={propertyData.description}
            onChangeText={text => handleChange('description', text)}
          />
          <Text style={styles.caption}>Image</Text>
          {image ? (
            <View style={{position: 'relative'}}>
              <FastImage
                style={{width: '100%', height: 127, borderRadius: 5}}
                source={{
                  uri: image,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  borderRadius: 25,
                }}
                onPress={() => setImage(null)}>
                <Image
                  source={require('../../icons/plus.png')}
                  style={{
                    width: 24,
                    height: 24,
                    transform: [{rotate: '45deg'}],
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={handleImagePick}>
              <View
                style={[
                  styles.input,
                  {
                    gap: 10,
                    paddingVertical: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Image
                  source={require('../../icons/add-image.png')}
                  style={{
                    marginTop: 16,
                    width: 40,
                    height: 40,
                  }}
                />
                <Text
                  style={{
                    fontFamily: fontType['Pjs-Regular'],
                    fontSize: 12,
                    color: colors.grey(0.6),
                  }}>
                  Upload Thumbnail
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddProperty}>
            <Text style={styles.buttonText}>Add Property</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && (
        <View style={category.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.blue()} />
        </View>
      )}
    </View>
  );
};
export default AddFormHouse;

const category = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.black(0.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  item: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 4,
  },
  name: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
  },
});
const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
  },
  ratingButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 5,
  },
  ratingImage: {
    width: 20,
    height: 20,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 12,
    color: colors.black(),
    marginBottom: 8,
    marginTop: 8,
    fontFamily: fontType['Pjs-Regular'],
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black(),
    fontFamily: fontType['Pjs-Bold'],
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -1,
    marginRight: 4,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: colors.grey(0.5),
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontFamily: fontType['Pjs-Regular'],
    marginRight: 4,
  },
  addButton: {
    backgroundColor: colors.blue(),
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Bold'],
  },
  button: {
    backgroundColor: colors.blue(),
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 4,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderColor: colors.grey(0.5),
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    paddingHorizontal: 12,
    fontFamily: fontType['Pjs-Regular'],
  },
  prizePicker: {
    width: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    fontFamily: fontType['Pjs-Regular'],
  },
});
