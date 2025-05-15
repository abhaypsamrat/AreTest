import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  MORE_INFO_TEST_IDS,
  MORE_INFO_TEXT,
} from '../constants/moreInfoConstants';
import {useSelector} from 'react-redux';

export default function MoreInfo() {
  const data = useSelector(state => state?.task?.tasks || []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading} testID={MORE_INFO_TEST_IDS.heading}>
        {MORE_INFO_TEXT.heading}
      </Text>

      <ScrollView contentContainerStyle={styles.taskList}>
        {data.length > 0 ? (
          data.map((task, index) => (
            <View key={index} style={styles.taskCard}>
              <Text style={styles.taskIndex}>#{index + 1}</Text>
              <Text style={styles.taskText}>{task}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No tasks available</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2f3542',
    marginBottom: 20,
    alignSelf: 'center',
  },
  taskList: {
    paddingBottom: 20,
  },
  taskCard: {
    backgroundColor: '#f5f6fa',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#777',
  },
  taskIndex: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e90ff',
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    color: '#2f3542',
    flexShrink: 1,
  },
  emptyText: {
    fontSize: 16,
    color: '#a4b0be',
    textAlign: 'center',
    marginTop: 50,
  },
});
