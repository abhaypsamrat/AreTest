import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  MORE_INFO_TEST_IDS,
  MORE_INFO_TEXT,
} from '../constants/moreInfoConstants';

export default function MoreInfo() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading} testID={MORE_INFO_TEST_IDS.heading}>
        {MORE_INFO_TEXT.heading}
      </Text>
      <Text style={styles.paragraph} testID={MORE_INFO_TEST_IDS.description}>
        This screen provides more detailed information about the app features.
      </Text>

      <TouchableOpacity
        testID={MORE_INFO_TEST_IDS.showButton}
        style={styles.button}
        onPress={() => setVisible(!visible)}>
        <Text style={styles.buttonText}>
          {visible ? 'Hide Details' : 'Show Details'}
        </Text>
      </TouchableOpacity>

      {visible && (
        <Text testID={MORE_INFO_TEST_IDS.details}>
          {MORE_INFO_TEXT.details}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
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
