import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
