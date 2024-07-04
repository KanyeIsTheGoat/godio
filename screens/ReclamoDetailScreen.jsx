import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const ReclamoDetailScreen = ({ route, navigation }) => {
  const { reclamo, sitio } = route.params;
  console.log(reclamo);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{reclamo.desperfecto || 'Sin título'}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{reclamo.descripcion || 'Sin descripción'}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Lugar:</Text>
        <Text style={styles.value}>{reclamo.sitio.direccion || 'Sin lugar'}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{reclamo.estadoReclamo}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Fotos:</Text>
        {reclamo.photos && reclamo.photos.length > 0 ? (
          reclamo.photos.map((photo, index) => (
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
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
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

export default ReclamoDetailScreen;
