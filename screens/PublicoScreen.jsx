import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const { width: screenWidth } = Dimensions.get('window');

const PublicoScreen = ({ navigation }) => {
  const [promociones, setPromociones] = useState([]);
  const [images, setImages] = useState([
    require('../assets/sani.png')
  ]);

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
      <FlatList
        data={promociones}
        renderItem={renderPromocionItem}
        keyExtractor={(item) => item.idPromocion.toString()}
        contentContainerStyle={styles.listContentContainer}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
      />
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
});

export default PublicoScreen;
