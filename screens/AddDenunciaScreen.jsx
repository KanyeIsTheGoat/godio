import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createDenuncia } from '../api/denuncias';
import { fetchVecinos, fetchInspectores, fetchSitios } from '../api/denuncias';

const AddDenunciaScreen = ({ navigation }) => {
  const [cause, setCause] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [place, setPlace] = useState('');
  const [type, setType] = useState('');
  const [denunciado, setDenunciado] = useState('');
  const [vecinos, setVecinos] = useState([]);
  const [inspectores, setInspectores] = useState([]);
  const [sitios, setSitios] = useState([]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const vecinosData = await fetchVecinos();
        const inspectoresData = await fetchInspectores();
        const sitiosData = await fetchSitios();
        setVecinos(vecinosData);
        setInspectores(inspectoresData);
        setSitios(sitiosData);
      } catch (error) {
        console.error("Error loading options", error);
      }
    };

    loadOptions();
  }, []);

  const handleAccept = async () => {
    const newDenuncia = {
      causa: cause,
      descripcion: description,
      fechaHora: date,
      lugar: place,
      tipoDenuncia: type,
      denunciado
    };

    try {
      await createDenuncia(newDenuncia);
      Alert.alert('Denuncia Added', 'The denuncia has been added successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'There was an error adding the denuncia.');
      console.error("Error creating denuncia", error);
    }
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const renderDenunciadoOptions = () => {
    if (type === 'Vecino') {
      return (
        <Picker
          selectedValue={denunciado}
          onValueChange={(itemValue) => setDenunciado(itemValue)}
          style={styles.picker}
        >
          {vecinos.map((vecino) => (
            <Picker.Item key={vecino.documento} label={`${vecino.nombre} ${vecino.apellido}`} value={vecino.documento} />
          ))}
        </Picker>
      );
    } else if (type === 'Inspector') {
      return (
        <Picker
          selectedValue={denunciado}
          onValueChange={(itemValue) => setDenunciado(itemValue)}
          style={styles.picker}
        >
          {inspectores.map((inspector) => (
            <Picker.Item key={inspector.legajo} label={`${inspector.nombre} ${inspector.apellido}`} value={inspector.legajo} />
          ))}
        </Picker>
      );
    } else if (type === 'Sitio') {
      return (
        <Picker
          selectedValue={denunciado}
          onValueChange={(itemValue) => setDenunciado(itemValue)}
          style={styles.picker}
        >
          {sitios.map((sitio) => (
            <Picker.Item key={sitio.idSitio} label={sitio.descripcion} value={sitio.idSitio} />
          ))}
        </Picker>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Denuncia</Text>
      <TextInput
        style={styles.input}
        placeholder="Causa"
        value={cause}
        onChangeText={setCause}
        placeholderTextColor="#9A9A9A"
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#9A9A9A"
      />
      <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>Seleccionar Fecha</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <Text style={styles.selectedDate}>Fecha seleccionada: {date.toLocaleDateString()}</Text>
      <TextInput
        style={styles.input}
        placeholder="Lugar"
        value={place}
        onChangeText={setPlace}
        placeholderTextColor="#9A9A9A"
      />
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Vecino" value="Vecino" />
        <Picker.Item label="Inspector" value="Inspector" />
        <Picker.Item label="Sitio" value="Sitio" />
      </Picker>
      {renderDenunciadoOptions()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAccept} onPress={handleAccept}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#333333',
    color: '#FFFFFF',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  dateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  dateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDate: {
    fontSize: 16,
    color: '#9A9A9A',
    marginBottom: 12,
  },
  picker: {
    height: 50,
    color: '#FFFFFF',
    backgroundColor: '#333333',
    marginBottom: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  buttonAccept: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  buttonCancel: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddDenunciaScreen;
