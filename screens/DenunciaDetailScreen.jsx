import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { fetchDenunciaById } from '../api/denuncias';
import FileViewer from '../api/FileHandler';

const DenunciaDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [denuncia, setDenuncia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filesVisible, setFilesVisible] = useState(false);

  useEffect(() => {
    const loadDenuncia = async () => {
      try {
        const data = await fetchDenunciaById(id);
        setDenuncia(data);
      } catch (error) {
        console.error("Error loading denuncia", error);
      } finally {
        setLoading(false);
      }
    };

    loadDenuncia();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  if (!denuncia) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Denuncia no encontrada</Text>
      </View>
    );
  }

  const toggleFilesVisibility = () => {
    setFilesVisible(!filesVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{denuncia.titulo || 'Sin título'}</Text>
      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.value}>{denuncia.descripcion || 'Sin descripción'}</Text>
      <Text style={styles.label}>Estado:</Text>
      <Text style={styles.value}>{denuncia.estadoDenuncia}</Text>
      <Text style={styles.label}>Tipo:</Text>
      <Text style={styles.value}>{denuncia.tipoDenuncia}</Text>
      <Text style={styles.label}>Causa:</Text>
      <Text style={styles.value}>{denuncia.causa || 'Sin causa'}</Text>
      <Text style={styles.label}>Lugar:</Text>
      <Text style={styles.value}>{denuncia.lugar || 'Sin lugar'}</Text>
      <Text style={styles.label}>Fecha y Hora:</Text>
      <Text style={styles.value}>{new Date(denuncia.fechaHora).toLocaleString()}</Text>
      <Text style={styles.label}>Denunciante:</Text>
      <Text style={styles.value}>{denuncia.denunciante ? `${denuncia.denunciante.nombre} ${denuncia.denunciante.apellido}` : 'Sin denunciante'}</Text>
      
      {denuncia.sitioDenunciado && (
        <View>
          <Text style={styles.label}>Sitio Denunciado:</Text>
          <Text style={styles.value}>{denuncia.sitioDenunciado.descripcion}</Text>
        </View>
      )}
      
      {denuncia.denunciado && (
        <View>
          <Text style={styles.label}>Denunciado:</Text>
          <Text style={styles.value}>{`${denuncia.denunciado.nombre} ${denuncia.denunciado.apellido}`}</Text>
        </View>
      )}

      {denuncia.inspector && (
        <View>
          <Text style={styles.label}>Denunciado:</Text>
          <Text style={styles.value}>{`${denuncia.inspector.nombre} ${denuncia.inspector.apellido}`}</Text>
        </View>
      )}

      <TouchableOpacity onPress={toggleFilesVisibility} style={styles.filesButton}>
        <Text style={styles.filesButtonText}>{filesVisible ? 'Ocultar Archivos' : 'Mostrar Archivos'}</Text>
      </TouchableOpacity>

      {filesVisible && <FileViewer files={denuncia.pruebas} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E90FF',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#1E90FF',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  filesButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 8,
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
