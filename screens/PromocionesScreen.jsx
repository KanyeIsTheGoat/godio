import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PromocionesScreen = ({ navigation }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({ title: '', description: '' });

  const promociones = [
    { id: '1', title: 'Promotion 1', description: 'Description 1', address: 'Address 1' },
    { id: '2', title: 'Promotion 2', description: 'Description 2', address: 'Address 2' },
  ];

  const filteredPromociones = promociones.filter(
    p => p.title.includes(filters.title) && p.description.includes(filters.description)
  );

  const renderPromocionItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PromocionDetail', { promocion: item })}>
      <View style={styles.promocionItem}>
        <Text style={styles.promocionTitle}>{item.title}</Text>
        <Text style={styles.promocionDescription}>{item.description}</Text>
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
      <TouchableOpacity style={styles.filterButton} onPress={toggleFilterVisibility}>
        <Ionicons name="filter-outline" size={24} color="black" />
      </TouchableOpacity>
      {filterVisible && (
        <View style={styles.filterContainer}>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={filters.title}
            onChangeText={text => setFilters({ ...filters, title: text })}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={filters.description}
            onChangeText={text => setFilters({ ...filters, description: text })}
          />
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={filteredPromociones}
        renderItem={renderPromocionItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddPromotion')}>
        <Text style={styles.addButtonText}>Add Promocion</Text>
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
  filterButton: {
    alignItems: 'flex-end',
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
  promocionItem: {
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
  promocionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  promocionDescription: {
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

export default PromocionesScreen;


