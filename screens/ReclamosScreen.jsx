import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchReclamos } from '../api/reclamos';

/*const testData = [
  { id: '1', title: 'Reclamo 1', description: 'Description of reclamo 1' },
  { id: '2', title: 'Reclamo 2', description: 'Description of reclamo 2' },
  { id: '3', title: 'Reclamo 3', description: 'Description of reclamo 3' },
];*/

const ReclamosScreen = ({ navigation }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [filters, setFilters] = useState({ title: '', type: '' });
    const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    const loadReclamos = async () => {
      try {
        const data = await fetchReclamos();
        setReclamos(data);
      } catch (error) {
        console.error("Error cargando reclamos.", error);
      }
    };
    loadReclamos();
  }, []);

const filteredReclamos = reclamos.filter(
    d => (d.titulo ? d.titulo.includes(filters.title) : true) &&
         (d.tipoReclamo ? d.tipoReclamo.includes(filters.type) : true)
  );

  const renderReclamoItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ReclamoDetail', { reclamo: item.idReclamo })}>
      <View style={styles.reclamoItem}>
        <Text style={styles.reclamoTitle}>{item.desperfecto || 'Sin título'}</Text>
        <Text style={styles.reclamoDescription}>{item.descripcion || 'Sin descripción'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
        <Ionicons name="filter" size={24} color="white" />
      </TouchableOpacity>
      <FlatList
        data={filteredReclamos}
        renderItem={renderReclamoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddReclamo')}>
        <Text style={styles.addButtonText}>Añadir Reclamo</Text>
      </TouchableOpacity>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Promociones')}>
          <Ionicons name="pricetag" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Denuncias')}>
          <Ionicons name="warning" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Reclamos')}>
          <Ionicons name="document-text" size={24} color="white" />
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
            <Text style={styles.modalTitle}>Filtrar Reclamos</Text>
            <TextInput style={styles.input} placeholder="Titulo" placeholderTextColor="#9A9A9A" />
            <TextInput style={styles.input} placeholder="Tipo" placeholderTextColor="#9A9A9A" />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Aplicar</Text>
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
    paddingTop: 60, // Add padding to ensure filter button is not over reclamos
  },
  reclamoItem: {
    backgroundColor: '#333333',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  reclamoTitle: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  reclamoDescription: {
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

export default ReclamosScreen;


