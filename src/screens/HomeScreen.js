import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
      <FontAwesome
        name="user-circle"
        size={50}
        color="#007bff"
        style={styles.icon}
      />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.info}>{item.phone}</Text>
        <Text style={styles.info}>{item.address.city}</Text>
        <Text style={styles.company}>{item.company.name}</Text>
      </View>
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
    <SafeAreaView style={styles.safeArea}>
      <Header />
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
          numColumns={2}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    padding: 5,
    margin: 10,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    elevation: 4,
    alignItems: 'center',
  },
  cardContent: {
    paddingHorizontal: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  email: {
    fontSize: 12,
    color: '#555',
  },
  info: {
    fontSize: 12,
    color: '#777',
  },
  company: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
