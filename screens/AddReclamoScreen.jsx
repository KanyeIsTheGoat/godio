import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddReclamoScreen = ({ navigation }) => {
  const [desperfecto, setDesperfecto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  {/*const [lugar, setLugar] = useState('');*/}
  const [tipoReclamo, setTipo] = useState('');
  const [photos, setPhotos] = useState([]);


  const handleAccept = async () => {
      try {
        const response = await fetch('http://192.168.0.18:8080/api/reclamos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            descripcion : descripcion,
            tipoReclamo : tipoReclamo,
            desperfecto : desperfecto
          }),
        });

        if (!response.ok) {
          throw new Error('Error al crear el reclamo');
        }

        Alert.alert('Promoción Creada', 'El reclamo ha sido creada exitosamente.');
        navigation.goBack(); // Regresar a la pantalla anterior
      } catch (error) {
        console.error('Error al crear el reclamo:', error);
        Alert.alert('Error', 'Hubo un problema al intentar crear el reclamo. Por favor, intenta nuevamente más tarde.');
      }
    };

      const handleCancel = () => {
        navigation.goBack(); // Regresar a la pantalla anterior
      };


  const handleAddPhoto = () => {
    if (photos.length < 5) {
      // Logic to add a photo
    } else {
      Alert.alert('Máximo Alcanzado', 'Solo puedes agregar hasta 5 fotos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Reclamo</Text>
      <TextInput
        style={styles.input}
        placeholder="Desperfecto"
        value={desperfecto}
        onChangeText={setDesperfecto}
        placeholderTextColor="#AAAAAA"
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        placeholderTextColor="#AAAAAA"
      />
      {/*}<TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={lugar}
        onChangeText={setLugar}
        placeholderTextColor="#AAAAAA"
      />*/}
      <TextInput
        style={styles.input}
        placeholder="Tipo desperfecto"
        value={tipoReclamo}
        onChangeText={setTipo}
        multiline
        placeholderTextColor="#AAAAAA"
      />
      <Text style={styles.photoLabel}>Fotos (máx. 5):</Text>
      <TouchableOpacity style={styles.photoButton} onPress={handleAddPhoto}>
        <Ionicons name="camera" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAccept} onPress={handleAccept}>
          <Text style={styles.buttonText}>Crear Reclamo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1F1F1F',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#333333',
    color: '#FFFFFF',
    textAlign: 'leftmargin',
  },
  photoLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  photoButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  buttonAccept: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  buttonCancel: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddReclamoScreen;
