import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
//import { fetchReclamosByUser } from '../api/reclamos';

const MisReclamosScreen = ({ navigation }) => {
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReclamos = async () => {
      try {
        const userId = 1; // Replace with logic to get the logged-in user's ID
        const data = await fetchReclamosByUser(userId);
        setReclamos(data);
      } catch (error) {
        console.error("Error loading reclamos", error);
      } finally {
        setLoading(false);
      }
    };

    loadReclamos();
  }, []);

  const renderReclamoItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ReclamoDetail', { id: item.id })}>
      <View style={styles.reclamoItem}>
        <Text style={styles.reclamoTitle}>{item.title}</Text>
        <Text style={styles.reclamoDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (reclamos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No tienes reclamos</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Reclamos</Text>
      <FlatList
        data={reclamos}
        renderItem={renderReclamoItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1F1F1F',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
  },
  loadingText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  noDataText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  reclamoItem: {
    padding: 16,
    backgroundColor: '#333333',
    borderRadius: 10,
    marginBottom: 10,
  },
  reclamoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  reclamoDescription: {
    fontSize: 16,
    color: '#9A9A9A',
  },
});

export default MisReclamosScreen;
