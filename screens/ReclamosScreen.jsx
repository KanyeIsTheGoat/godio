import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReclamosScreen = ({ navigation }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({ title: '', type: '' });

  const reclamos = [
    { id: '1', title: 'Reclamo 1', type: 'Type 1', address: 'Address A', description: 'Description A' },
    { id: '2', title: 'Reclamo 2', type: 'Type 2', address: 'Address B', description: 'Description B' },
    { id: '2', title: 'Reclamo 2', type: 'Type 2', address: 'Address B', description: 'Description B' },
    { id: '2', title: 'Reclamo 2', type: 'Type 2', address: 'Address B', description: 'Description B' },
    { id: '2', title: 'Reclamo 2', type: 'Type 2', address: 'Address B', description: 'Description B' },
    { id: '2', title: 'Reclamo 2', type: 'Type 2', address: 'Address B', description: 'Description B' },
    { id: '2', title: 'Reclamo 2', type: 'Type 2', address: 'Address B', description: 'Description B' },

  ];

  const filteredReclamos = reclamos.filter(
    r => r.title.includes(filters.title) && r.type.includes(filters.type)
  );

  const renderReclamoItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ReclamoDetail', { reclamo: item })}>
      <View style={styles.reclamoItem}>
        <Text style={styles.reclamoTitle}>{item.title}</Text>
        <Text style={styles.reclamoDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  const applyFilters = () => {
    setFilterVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleFilterVisibility}>
          <Ionicons name="filter-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {filterVisible && (
        <View style={styles.filterContainer}>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={filters.title}
            onChangeText={text => setFilters({ ...filters, title: text })}
          />
          <TextInput
            placeholder="Type"
            style={styles.input}
            value={filters.type}
            onChangeText={text => setFilters({ ...filters, type: text })}
          />
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={filteredReclamos}
        renderItem={renderReclamoItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddReclamo')}>
        <Text style={styles.addButtonText}>Add Reclamo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  filterContainer: {
    marginBottom: 10,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderRadius: 8,
  },
  applyButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  reclamoItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  reclamoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  reclamoDescription: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#007BFF', // Cambiado al azul de la app
    paddingVertical: 10,
    paddingHorizontal: 15, // Ajustado para acortar de izquierda y derecha
    borderRadius: 20, // Más redondeado
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default ReclamosScreen;

