import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError('Failed to load data');
      console.log('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderUserCard = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text>{item.phone}</Text>
      <Text>{item.address.city}</Text>
      <Text>{item.company.name}</Text>
    </View>
  );

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Header />
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Welcome to User App</Text>
        <Text style={styles.subHeader}>Explore User Details</Text>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator
              testID="loading-indicator"
              size="large"
              color="blue"
            />
          </View>
        ) : (
          <FlatList
            data={users}
            keyExtractor={item => item.id.toString()}
            renderItem={renderUserCard}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
