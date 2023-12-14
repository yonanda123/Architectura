import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  FurnitureScreen,
  HomeScreen,
  HouseScreen,
  ProfileScreen,
  RoomScreen,
  AddFormHouse,
  EditFormHouse,
} from '../screens';
import {Image} from 'react-native';
import {fontType, colors} from '../theme';
import {DetailHouse} from '../components';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.blue(),
        tabBarInactiveTintColor: colors.black(),
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontSize: 10,
          fontFamily: fontType['Pjs-Medium'],
        },
        tabBarIcon: ({focused, color}) => {
          let iconStyle = {
            width: 24,
            height: 24,
          };
          let iconName;
          if (route.name === 'HomeScreen') {
            iconName = focused
              ? require('../icons/home-dark.png')
              : require('../icons/home-light.png');
          } else if (route.name === 'HouseScreen') {
            iconName = focused
              ? require('../icons/house-dark.png')
              : require('../icons/house-light.png');
          } else if (route.name === 'RoomScreen') {
            iconName = focused
              ? require('../icons/room-dark.png')
              : require('../icons/room-light.png');
          } else if (route.name === 'FurnitureScreen') {
            iconName = focused
              ? require('../icons/furniture-dark.png')
              : require('../icons/furniture-light.png');
          } else if (route.name === 'ProfileScreen') {
            iconName = focused
              ? require('../icons/profile-dark.png')
              : require('../icons/profile-light.png');
          }
          return <Image source={iconName} style={iconStyle} />;
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="HouseScreen"
        component={HouseScreen}
        options={{
          tabBarLabel: 'House',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="RoomScreen"
        component={RoomScreen}
        options={{
          tabBarLabel: 'Room',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="FurnitureScreen"
        component={FurnitureScreen}
        options={{
          tabBarLabel: 'Furniture',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailHouse"
        component={DetailHouse}
        options={{
          title: 'Detail House',
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="AddFormHouse"
        component={AddFormHouse}
        options={{
          title: 'Detail House',
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="EditFormHouse"
        component={EditFormHouse}
        options={{
          title: 'Detail House',
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};
export default Router;
