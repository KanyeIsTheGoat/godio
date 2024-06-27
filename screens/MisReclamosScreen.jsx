// screens/MisReclamosScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const MisReclamosScreen = ({ navigation }) => {
  // Sample data for reclamos
  const reclamos = [
    { id: '1', title: 'Reclamo 1', type: 'Type 1', address: 'Address A', description: 'Description A' },
    { id: '2', title: 'Reclamo 2', type: 'Type 2', address: 'Address B', description: 'Description B' },
    // Add more reclamos as needed
  ];

  const renderReclamoItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ReclamoDetail', { reclamo: item })}>
      <View style={styles.reclamoItem}>
        <Text style={styles.reclamoTitle}>{item.title}</Text>
        <Text style={styles.reclamoDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Reclamos</Text>
      <FlatList
        data={reclamos}
        renderItem={renderReclamoItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  reclamoItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  reclamoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reclamoDescription: {
    fontSize: 16,
    color: '#666',
  },
});

export default MisReclamosScreen;
