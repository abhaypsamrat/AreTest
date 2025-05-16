import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearEmail} from '../redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const email = useSelector(state => state?.auth?.email);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('userData');
    dispatch(clearEmail(email));
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.userText}>👤 {email || 'Guest'}</Text>
        </View>
        <TouchableOpacity onPress={handleSignOut}>
          <Icon name="logout" color="white" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1E1E2F',
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#1E1E2F',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    color: '#cccccc',
    fontSize: 14,
  },
});
