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
      <Text style={styles.title}>Añadir Denuncia</Text>
      <TextInput
        style={styles.input}
        placeholder="Causa"
        value={cause}
        onChangeText={setCause}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
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
      />
      <Picker
        selectedValue= {type}
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
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#1E90FF',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
  dateButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 8,
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
    color: '#666',
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonAccept: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  buttonCancel: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddDenunciaScreen;
