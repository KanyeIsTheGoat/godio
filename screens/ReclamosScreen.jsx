import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const ReclamosScreen = ({ navigation }) => {
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    const loadReclamos = async () => {
      try {
        const response = await axios.get('http://192.168.0.244:8080/api/reclamos');
        setReclamos(response.data);
      } catch (error) {
        console.error("Error cargando reclamos.", error);
      }
    };
    loadReclamos();
  }, []);

  const renderReclamoItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ReclamoDetail', { reclamo: item })}>
      <View style={styles.reclamoItem}>
        <Text style={styles.reclamoTitle}>{item.desperfecto || 'Sin título'}</Text>
        <Text style={styles.reclamoDescription}>{item.descripcion || 'Sin descripción'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reclamos}
        renderItem={renderReclamoItem}
        keyExtractor={item => item.idReclamo.toString()}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  listContentContainer: {
    paddingBottom: 150,
    paddingHorizontal: 10,
    paddingTop: 60,
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
});

export default ReclamosScreen;
