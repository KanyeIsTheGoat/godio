import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddPromotionScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [promoType, setPromoType] = useState('');
  const [business, setBusiness] = useState('');
  const [phone, setPhone] = useState('');
  const [hours, setHours] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleAccept = () => {
    // Add logic to save the promotion
    Alert.alert('Promotion Added', 'The promotion has been added successfully.');
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleCancel = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleAddPhoto = () => {
    if (photos.length < 5) {
      // Logic to add a photo
    } else {
      Alert.alert('Maximum Reached', 'You can only add up to 5 photos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Añadir Promoción</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#AAAAAA"
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de Promoción"
        value={promoType}
        onChangeText={setPromoType}
        placeholderTextColor="#AAAAAA"
      />
      <TextInput
        style={styles.input}
        placeholder="Negocio a Promocionar"
        value={business}
        onChangeText={setBusiness}
        placeholderTextColor="#AAAAAA"
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholderTextColor="#AAAAAA"
      />
      <TextInput
        style={styles.input}
        placeholder="Horarios Disponibles"
        value={hours}
        onChangeText={setHours}
        placeholderTextColor="#AAAAAA"
      />
      <TextInput
        style={styles.input}
        placeholder="Mail de Contacto"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#AAAAAA"
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor="#AAAAAA"
      />
      <Text style={styles.photoLabel}>Fotos (máx. 5):</Text>
      <TouchableOpacity style={styles.photoButton} onPress={handleAddPhoto}>
        <Ionicons name="camera" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAccept} onPress={handleAccept}>
          <Text style={styles.buttonText}>Añadir Promoción</Text>
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
