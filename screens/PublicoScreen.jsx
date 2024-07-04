import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchPromociones } from '../api/promociones';

const { width: screenWidth } = Dimensions.get('window');

const PublicoScreen = ({ navigation }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({ title: '', type: '' });
  const [promociones, setPromociones] = useState([]);
  const [images, setImages] = useState([
    require('../assets/sani.png')
  ]);

  useEffect(() => {
    const loadPromociones = async () => {
      try {
        const data = await fetchPromociones();
        setPromociones(data);
      } catch (error) {
        console.error("Error cargando promociones", error);
      }
    };

    loadPromociones();
  }, []);

  const filteredPromociones = promociones.filter(
    d => (d.titulo ? d.titulo.includes(filters.title) : true) &&
         (d.tipoPromocion ? d.tipoPromocion.includes(filters.type) : true)
  );

  const renderPromocionItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PromocionDetail', { promocion: item })}>
      <View style={styles.promocionItem}>
        <Text style={styles.promocionTitle}>{item.titulo}</Text>
        <Text style={styles.promocionDescription}>{item.descripcion}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>San Isidro Municipio</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageScrollView}
      >
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.image} />
        ))}
      </ScrollView>
      <Text style={styles.subTitle}>Descubre las mejores promociones de la zona!</Text>
      <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
        <Ionicons name="filter" size={24} color="white" />
      </TouchableOpacity>
      <FlatList
        data={filteredPromociones}
        renderItem={renderPromocionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Filtros</Text>
            <TextInput
              style={styles.input}
              placeholder="Buscar por titulo"
              placeholderTextColor="#9A9A9A"
              value={filters.title}
              onChangeText={(text) => setFilters({ ...filters, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Filtrar por tipo"
              placeholderTextColor="#9A9A9A"
              value={filters.type}
              onChangeText={(text) => setFilters({ ...filters, type: text })}
            />
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
  mainTitle: {
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  imageScrollView: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: screenWidth - 60,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    resizeMode: 'contain', // Ajusta la imagen para que se vea completa sin recortar
  },
  subTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  listContentContainer: {
    paddingBottom: 150, // Ensures space for the add button and menu
    paddingHorizontal: 10,
    paddingTop: 60, // Add padding to ensure filter button is not over promotions
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

export default PublicoScreen;
