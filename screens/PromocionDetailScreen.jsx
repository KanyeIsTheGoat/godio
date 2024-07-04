import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const PromocionDetailScreen = ({ route }) => {
  const { promocion } = route.params;
  console.log(promocion);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{promocion.titulo || 'Sin título'}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{promocion.descripcion || 'Sin descripción'}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Dirección:</Text>
        <Text style={styles.value}>{promocion.direccion || 'Sin dirección'}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Horarios:</Text>
        <Text style={styles.value}>{promocion.horarios || 'Sin horarios'}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{promocion.contacto || 'Sin contacto'}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Tipo de Promoción:</Text>
        <Text style={styles.value}>{promocion.tipoPromocion || 'Sin tipo'}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Fotos:</Text>
        {promocion.photos && promocion.photos.length > 0 ? (
          promocion.photos.map((photo, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: photo }} style={styles.image} />
            </View>
          ))
        ) : (
          <Text style={styles.value}>No hay fotos disponibles</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1F1F1F',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  detailContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9A9A9A',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
});

export default PromocionDetailScreen;
