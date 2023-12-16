import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {fontType, colors} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const fetchProfileData = () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = firestore().collection('users').doc(userId);
          const unsubscribeProfile = userRef.onSnapshot(doc => {
            if (doc.exists) {
              const userData = doc.data();
              setProfileData(userData);
            } else {
              console.error('User document not found.');
            }
          });
          return () => {
            unsubscribeProfile();
          };
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, []);
  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Architectura</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileImageContainer}>
          <FastImage
            style={styles.profileImage}
            source={{
              uri: profileData?.photoUrl,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <TouchableOpacity style={styles.editButton}>
            <Image
              source={require('../../icons/edit.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{profileData?.fullName}</Text>
          <Text style={styles.userEmail}>{profileData?.email}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              source={require('../../icons/setting.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Settings</Text>
            <Image
              source={require('../../icons/next.png')}
              style={styles.customArrowIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              source={require('../../icons/detail.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Project Details</Text>
            <Image
              source={require('../../icons/next.png')}
              style={styles.customArrowIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              source={require('../../icons/userManagement.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>User Management</Text>
            <Image
              source={require('../../icons/next.png')}
              style={styles.customArrowIcon}
            />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuItem}>
            <Image
              source={require('../../icons/information.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Information</Text>
            <Image
              source={require('../../icons/next.png')}
              style={styles.customArrowIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Image
              source={require('../../icons/logout.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Logout</Text>
            <Image
              source={require('../../icons/next.png')}
              style={styles.customArrowIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  customArrowIcon: {
    position: 'absolute',
    right: 20,
    width: 24,
    height: 24,
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
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginTop: 20,
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editButton: {
    width: 40,
    height: 40,
    backgroundColor: '#0072ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  editIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  userName: {
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
    fontFamily: fontType['Pjs-Regular'],
  },
  editProfileButton: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#0072ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  editProfileButtonText: {
    color: '#0072ff',
    fontSize: 16,
    textAlign: 'center',
  },
  menuContainer: {
    marginTop: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  menuText: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Medium'],
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
