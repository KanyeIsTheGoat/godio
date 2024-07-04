import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPromotionScreen = ({ navigation }) => {
  const [titulo, setTitle] = useState('');
  const [descripcion, setDescription] = useState('');
  const [direccion, setDireccion] = useState('');
  const [horarios, setHours] = useState('');
  const [contacto, setContact] = useState('');
  const [sitios, setSitios] = useState([]);
  const [vecinos, setVecinos] = useState([]);
  const [tipoPromocion, setPromocion] = useState('');
  const [vecinoId, setVecinoId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sitioResponse = await axios.get('http://192.168.0.18:8080/api/sitios');
                setSitios(sitioResponse.data);
                console.log(sitioResponse.data);

                const vecinoResponse = await axios.get('http://192.168.0.18:8080/api/vecinos');
                setVecinos(vecinoResponse.data);
                console.log(vecinoResponse.data);

                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const parsedData = JSON.parse(userData);
                    setVecinoId(parsedData.id);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

  const handleSubmit = async () => {
          const formData = new FormData();
          formData.append('titulo', titulo);
          formData.append('descripcion', descripcion);
          formData.append('tipoPromocion', tipoPromocion);
          formData.append('contacto', contacto);
          formData.append('direccion', direccion);
          formData.append('horarios', horarios);
          formData.append('sitios', setSitios);
          formData.append('vecinoId', vecinoId);


          {/*}pruebas.forEach((file, index) => {
              formData.append('pruebas', {
                  uri: file.uri,
                  type: file.type,
                  name: file.name
              });
          });*/}

          try {
              const response = await axios.post('http://192.168.0.18:8080/api/promociones/upload', formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });
              console.log('Promoción added successfully', response.data);
              Alert.alert('Promoción Añadida', 'La promoción se ha añadido correctamente.');
              navigation.goBack();
          } catch (error) {
              console.error('There was an error adding the promoción!', error);
              Alert.alert('Error', 'Hubo un error al añadir la promoción.');
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

      <View style={styles.pickerContainer}>
       <Text style={styles.pickerLabel}>Seleccionar:</Text>
       <RNPickerSelect
        onValueChange={(value) => {
               console.log(value);
                 setSitios(value);
                   }}

               style={pickerSelectStyles}
                  placeholder={{ label: "Seleccionar sitio", value: null }}/>
                  </View>

      <Text style={styles.photoLabel}>Fotos (máx. 5):</Text>
      <TouchableOpacity style={styles.photoButton} onPress={handleAddPhoto}>
        <Ionicons name="camera" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAccept} onPress={handleSubmit}>
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: 'white',
        paddingRight: 30,
        backgroundColor: '#333333',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 8,
        color: 'white',
        paddingRight: 30,
        backgroundColor: '#333333',
    },
});

export default AddPromotionScreen;
