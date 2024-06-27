import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchDenuncias } from '../api/denuncias';

const DenunciasScreen = ({ navigation }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({ title: '', type: '' });
  const [denuncias, setDenuncias] = useState([]);

  useEffect(() => {
    const loadDenuncias = async () => {
      try {
        const data = await fetchDenuncias();
        setDenuncias(data);
      } catch (error) {
        console.error("Error loading denuncias", error);
      }
    };

    loadDenuncias();
  }, []);

  const filteredDenuncias = denuncias.filter(
    d => (d.titulo ? d.titulo.includes(filters.title) : true) &&
         (d.tipoDenuncia ? d.tipoDenuncia.includes(filters.type) : true)
  );

  const renderDenunciaItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DenunciaDetail', { id: item.idDenuncia })}>
      <View style={styles.denunciaItem}>
        <Text style={styles.denunciaTitle}>{item.titulo || 'Sin título'}</Text>
        <Text style={styles.denunciaDescription}>{item.descripcion || 'Sin descripción'}</Text>
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
            placeholder="Título"
            style={styles.input}
            value={filters.title}
            onChangeText={text => setFilters({ ...filters, title: text })}
          />
          <TextInput
            placeholder="Tipo"
            style={styles.input}
            value={filters.type}
            onChangeText={text => setFilters({ ...filters, type: text })}
          />
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={filteredDenuncias}
        renderItem={renderDenunciaItem}
        keyExtractor={item => item.idDenuncia.toString()}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddDenuncia')}>
        <Text style={styles.addButtonText}>Añadir Denuncia</Text>
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
    backgroundColor: '#fff',
    elevation: 2, // Added slight elevation for a modern look
  },
  applyButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  denunciaItem: {
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
  denunciaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  denunciaDescription: {
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

export default DenunciasScreen;





