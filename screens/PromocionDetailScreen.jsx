import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PromocionDetailScreen = ({ route, navigation }) => {
  const { promocion } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{promocion.titulo}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{promocion.descripcion}</Text>
        <Text style={styles.label}>Dirección:</Text>
        <Text style={styles.value}>{promocion.direccion}</Text>
        <Text style={styles.label}>Horarios:</Text>
        <Text style={styles.value}>{promocion.horarios}</Text>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{promocion.contacto}</Text>
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
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#333333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  detailContainer: {
    padding: 16,
    backgroundColor: '#333333',
    borderRadius: 10,
    margin: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
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
