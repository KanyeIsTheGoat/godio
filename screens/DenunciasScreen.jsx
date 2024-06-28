import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchDenuncias } from '../api/denuncias';

const DenunciasScreen = ({ navigation }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
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
    setFilterModalVisible(!filterModalVisible);
  };

  const applyFilters = () => {
    setFilterModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={toggleFilterVisibility}>
        <Ionicons name="filter-outline" size={24} color="white" />
      </TouchableOpacity>
      <FlatList
        data={filteredDenuncias}
        renderItem={renderDenunciaItem}
        keyExtractor={item => item.idDenuncia.toString()}
        contentContainerStyle={styles.listContentContainer}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddDenuncia')}>
        <Text style={styles.addButtonText}>Añadir Denuncia</Text>
      </TouchableOpacity>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Promociones')}>
          <Ionicons name="pricetag" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Denuncias')}>
          <Ionicons name="alert-circle" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Reclamos')}>
          <Ionicons name="chatbubble" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Filtrar Denuncias</Text>
            <TextInput
              placeholder="Título"
              style={styles.input}
              value={filters.title}
              onChangeText={text => setFilters({ ...filters, title: text })}
              placeholderTextColor="#9A9A9A"
            />
            <TextInput
              placeholder="Tipo"
              style={styles.input}
              value={filters.type}
              onChangeText={text => setFilters({ ...filters, type: text })}
              placeholderTextColor="#9A9A9A"
            />
            <TouchableOpacity style={styles.closeButton} onPress={applyFilters}>
              <Text style={styles.closeButtonText}>Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  listContentContainer: {
    paddingBottom: 150, // Ensures space for the add button and menu
    paddingHorizontal: 10,
    paddingTop: 60, // Add padding to ensure filter button is not over denuncias
  },
  denunciaItem: {
    backgroundColor: '#333333',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  denunciaTitle: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  denunciaDescription: {
    fontSize: 14,
    color: '#9A9A9A',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#333333',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  filterButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    width: '100%',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default DenunciasScreen;






