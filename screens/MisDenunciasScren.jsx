import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchDenunciasByUser } from '../api/denuncias';

const MisDenunciasScreen = ({ navigation }) => {
  const [denuncias, setDenuncias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDenuncias = async () => {
      try {
        const userId = 1; // Replace with logic to get the logged-in user's ID
        const data = await fetchDenunciasByUser(userId);
        setDenuncias(data);
      } catch (error) {
        console.error("Error loading denuncias", error);
      } finally {
        setLoading(false);
      }
    };

    loadDenuncias();
  }, []);

  const renderDenunciaItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DenunciaDetail', { id: item.id })}>
      <View style={styles.denunciaItem}>
        <Text style={styles.denunciaTitle}>{item.title}</Text>
        <Text style={styles.denunciaDescription}>{item.description}</Text>
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

  if (denuncias.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No tienes denuncias</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Denuncias</Text>
      <FlatList
        data={denuncias}
        renderItem={renderDenunciaItem}
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
  denunciaItem: {
    padding: 16,
    backgroundColor: '#333333',
    borderRadius: 10,
    marginBottom: 10,
  },
  denunciaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  denunciaDescription: {
    fontSize: 16,
    color: '#9A9A9A',
  },
});

export default MisDenunciasScreen;
