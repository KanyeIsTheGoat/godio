import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';
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
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleFilterVisibility}>
          <Text style={styles.icon}>🔍</Text>
        </TouchableOpacity>
      </View>
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
          <Button title="Aplicar Filtros" onPress={applyFilters} color="#1E90FF" />
        </View>
      )}
      <Text style={styles.title}>Denuncias</Text>
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  icon: {
    fontSize: 24,
    color: '#1E90FF',
  },
  filterContainer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    height: 40,
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E90FF',
  },
  denunciaItem: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  denunciaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  denunciaDescription: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#1E90FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DenunciasScreen;
