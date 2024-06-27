import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';

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
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleFilterVisibility}>
          <Text style={styles.icon}>🔍</Text>
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
            placeholder="Description"
            style={styles.input}
            value={filters.description}
            onChangeText={text => setFilters({ ...filters, description: text })}
          />
          <Button title="Apply Filters" onPress={applyFilters} />
        </View>
      )}
      <Text style={styles.title}>Promociones</Text>
      <FlatList
        data={filteredPromociones}
        renderItem={renderPromocionItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddPromocion')}>
        <Text style={styles.addButtonText}>Add Promociones</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  icon: {
    fontSize: 24,
  },
  filterContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  promocionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  promocionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  promocionDescription: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PromocionesScreen;
