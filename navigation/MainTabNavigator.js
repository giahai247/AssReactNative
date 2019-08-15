import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SuasanphamScreen from '../screens/SuasanphamScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Setting: SettingsScreen,
  Suasanpham: SuasanphamScreen
  
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const AddStack = createStackNavigator({
  Links: LinksScreen,
});

AddStack.navigationOptions = {
  tabBarLabel: 'Add new',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  AddStack
});
