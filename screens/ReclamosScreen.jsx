import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';

const ReclamosScreen = ({ navigation }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({ title: '', type: '' });

  const reclamos = [
    { id: '1', title: 'Reclamo 1', type: 'Type 1', address: 'Address A', description: 'Description A' },
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
            placeholder="Type"
            style={styles.input}
            value={filters.type}
            onChangeText={text => setFilters({ ...filters, type: text })}
          />
          <Button title="Apply Filters" onPress={applyFilters} />
        </View>
      )}
      <Text style={styles.title}>Reclamos</Text>
      <FlatList
        data={filteredReclamos}
        renderItem={renderReclamoItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddReclamo')}>
        <Text style={styles.addButtonText}>Add Reclamos</Text>
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

export default ReclamosScreen;
