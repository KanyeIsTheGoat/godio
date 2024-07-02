import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddPromotionScreen = ({ navigation }) => {
  const [titulo, setTitle] = useState('');
  const [descripcion, setDescription] = useState('');
  const [direccion, setDireccion] = useState('');
  const [horarios, setHours] = useState('');
  const [contacto, setContact] = useState('');



  const handleAccept = async () => {
    try {
      const response = await fetch('http://192.168.0.18:8080/api/promociones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descripcion : descripcion,
          titulo : titulo,
          horarios : horarios,
          direccion : direccion,
          contacto : contacto
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la promoción');
      }

      Alert.alert('Promoción Creada', 'La promoción ha sido creada exitosamente.');
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (error) {
      console.error('Error al crear la promoción:', error);
      Alert.alert('Error', 'Hubo un problema al intentar crear la promoción. Por favor, intenta nuevamente más tarde.');
    }
  };

  const handleCancel = () => {
    navigation.goBack(); // Regresar a la pantalla anterior
  };

  const handleAddPhoto = () => {
    if (photos.length < 5) {
      // Lógica para agregar una foto
    } else {
      Alert.alert('Máximo Alcanzado', 'Solo puedes agregar hasta 5 fotos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Promoción</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitle}
        placeholderTextColor="#AAAAAA"
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescription}
        placeholderTextColor="#AAAAAA"
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
        placeholderTextColor="#AAAAAA"
      />
      <TextInput
        style={styles.input}
        placeholder="Horarios"
        value={horarios}
        onChangeText={setHours}
        keyboardType="phone-pad"
        placeholderTextColor="#AAAAAA"
      />
      <TextInput
        style={styles.input}
        placeholder="Contacto"
        value={contacto}
        onChangeText={setContact}
        placeholderTextColor="#AAAAAA"
      />
      <Text style={styles.photoLabel}>Fotos (máx. 5):</Text>
      <TouchableOpacity style={styles.photoButton} onPress={handleAddPhoto}>
        <Ionicons name="camera" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAccept} onPress={handleAccept}>
          <Text style={styles.buttonText}>Crear Promoción</Text>
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
    textAlign: 'marginLeft',
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

export default AddPromotionScreen;
