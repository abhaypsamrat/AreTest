import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation(); // Hook to access navigation

  const openDrawer = () => {

    console.log('kkkkkkkkkkk', openDrawer);
    if (navigation && navigation.openDrawer) {

    
      navigation.openDrawer(); // Opens the Drawer
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Open Menu" onPress={openDrawer} />
      <Text style={{marginTop: 20}}>Profile Screen</Text>
    </View>
  );
};

export default ProfileScreen;
