import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    if (navigation && navigation.openDrawer) {
      navigation.openDrawer();
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{marginTop: 20}}>Profile Screen</Text>
      <Button title="Open Menu" onPress={openDrawer} />
    </View>
  );
};

export default ProfileScreen;
