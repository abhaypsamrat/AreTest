import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <Text testID="title" style={styles.title}>
        About Screen
      </Text>

      <TouchableOpacity
        testID="moreInfoButton"
        style={styles.button}
        onPress={() => navigation.navigate('MoreInfo')}>
        <Text style={styles.buttonText}>See Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    top: '40%',
    fontSize: 24,
    color: '#343a40',
    fontWeight: '600',
  },
  button: {
    top: '40%',
    backgroundColor: '#007bff',
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: '30%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
