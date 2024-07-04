import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { fetchDenunciaById } from '../api/denuncias';

const DenunciaDetailScreen = ({ route, navigation }) => {
  const { denuncia } = route.params;
  console.log(denuncia);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{denuncia.titulo || 'Sin título'}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{denuncia.descripcion || 'Sin descripción'}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{denuncia.estadoDenuncia}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Causa:</Text>
        <Text style={styles.value}>{denuncia.causa || 'Sin causa'}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Lugar:</Text>
        <Text style={styles.value}>{denuncia.lugar || 'Sin lugar'}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Fecha y Hora:</Text>
        <Text style={styles.value}>{new Date(denuncia.fechaHora).toLocaleString()}</Text>
      </View>

      {denuncia.sitioDenunciado && (
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Sitio Denunciado:</Text>
          <Text style={styles.value}>{denuncia.sitioDenunciado.descripcion}</Text>
        </View>
      )}
      
      {denuncia.denunciado && (
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Denunciado:</Text>
          <Text style={styles.value}>{`${denuncia.denunciado.nombre} ${denuncia.denunciado.apellido}`}</Text>
        </View>
      )}

      {denuncia.inspector && (
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Inspector Denunciado:</Text>
          <Text style={styles.value}>{`${denuncia.inspector.nombre} ${denuncia.inspector.apellido}`}</Text>
        </View>
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1F1F1F',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  filesButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  filesButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DenunciaDetailScreen;
