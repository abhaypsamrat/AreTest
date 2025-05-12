import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Screen</Text>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#343a40',
    fontWeight: '600',
  },
});
