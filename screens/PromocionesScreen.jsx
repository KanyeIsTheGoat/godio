import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const PromocionesScreen = ({ navigation }) => {
  const [promociones, setPromociones] = useState([]);

  useEffect(() => {
    const loadPromociones = async () => {
      try {
        const response = await axios.get('http://192.168.0.244:8080/api/promociones');
        setPromociones(response.data);
      } catch (error) {
        console.error("Error cargando promociones", error);
      }
    };

    loadPromociones();
  }, []);

  const renderPromocionItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PromocionDetail', { promocion: item })}>
      <View style={styles.promocionItem}>
        <Text style={styles.promocionTitle}>{item.titulo}</Text>
        <Text style={styles.promocionDescription}>{item.descripcion}</Text>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item) => (item.id ? item.id.toString() : Math.random().toString());

  return (
    <View style={styles.container}>
      <FlatList
        data={promociones}
        renderItem={renderPromocionItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContentContainer}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPromotion')}>
        <Text style={styles.addButtonText}>Añadir Promociones</Text>
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
  promocionItem: {
    backgroundColor: '#333333',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  promocionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  promocionDescription: {
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

export default PromocionesScreen;
