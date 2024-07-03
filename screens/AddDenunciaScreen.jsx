import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Modal } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import { fetchVecinos, fetchInspectores, fetchSitios } from '../api/denuncias';

const AddDenunciaScreen = ({ navigation }) => {
  const [cause, setCause] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [place, setPlace] = useState('');
  const [type, setType] = useState('');
  const [denunciado, setDenunciado] = useState('');
  const [vecinos, setVecinos] = useState([]);
  const [inspectores, setInspectores] = useState([]);
  const [sitios, setSitios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

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

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        setFile(result);
      }
    } catch (error) {
      console.error("Error picking file: ", error);
    }
  };
  
  const removeFile = () => {
    setFile(null);
  };
  

  const handleAccept = async () => {
    if (!file) {
      Alert.alert('Error', 'Por favor, seleccione un archivo antes de guardar la denuncia.');
      return;
    }

    const formData = new FormData();
    formData.append('descripcion', description);
    formData.append('estadoDenuncia', 'PENDIENTE');
    formData.append('tipoDenuncia', type);
    formData.append('titulo', '');
    formData.append('causa', cause);
    formData.append('lugar', place);
    formData.append('sitioId', 1);
    formData.append('denunciadoId', 1);
    formData.append('denuncianteId', 1);
    formData.append('inspectorId', 1);
    formData.append('file', {
      uri: file.uri,
      type: file.mimeType,
      name: file.name,
    });

    try {
      await axios.post('http://<your-backend-url>/api/denuncias/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Denuncia Added', 'The denuncia has been added successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'There was an error adding the denuncia.');
      console.error("Error creating denuncia", error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const renderDenunciadoOptions = () => {
    let options = [];

    if (type === 'Vecino') {
      options = vecinos.map((vecino) => (
        <TouchableOpacity
          key={vecino.documento}
          style={[
            styles.optionButton,
            denunciado === vecino.documento && styles.optionButtonSelected
          ]}
          onPress={() => { setDenunciado(vecino.documento); setShowModal(false); }}
        >
          <Text style={styles.optionButtonText}>{`${vecino.nombre} ${vecino.apellido}`}</Text>
        </TouchableOpacity>
      ));
    } else if (type === 'Inspector') {
      options = inspectores.map((inspector) => (
        <TouchableOpacity
          key={inspector.legajo}
          style={[
            styles.optionButton,
            denunciado === inspector.legajo && styles.optionButtonSelected
          ]}
          onPress={() => { setDenunciado(inspector.legajo); setShowModal(false); }}
        >
          <Text style={styles.optionButtonText}>{`${inspector.nombre} ${inspector.apellido}`}</Text>
        </TouchableOpacity>
      ));
    } else if (type === 'Sitio') {
      options = sitios.map((sitio) => (
        <TouchableOpacity
          key={sitio.idSitio}
          style={[
            styles.optionButton,
            denunciado === sitio.idSitio && styles.optionButtonSelected
          ]}
          onPress={() => { setDenunciado(sitio.idSitio); setShowModal(false); }}
        >
          <Text style={styles.optionButtonText}>{sitio.descripcion}</Text>
        </TouchableOpacity>
      ));
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>{options}</ScrollView>
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView style={styles.container}>
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
      <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>Seleccionar Fecha</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={styles.selectedDate}>Fecha seleccionada: {date.toLocaleDateString()}</Text>
      <TextInput
        style={styles.input}
        placeholder="Lugar"
        value={place}
        onChangeText={setPlace}
        placeholderTextColor="#9A9A9A"
      />
      <TouchableOpacity onPress={pickFile} style={styles.fileButton}>
        <Text style={styles.fileButtonText}>Seleccionar Archivo</Text>
      </TouchableOpacity>
      {file ? (
    <View style={styles.fileItem}>
    <Text style={styles.selectedFile}>{file.name}</Text>
    <TouchableOpacity onPress={removeFile} style={styles.removeFileButton}>
      <Text style={styles.removeFileButtonText}>X</Text>
    </TouchableOpacity>
  </View>
) : (
  <Text style={styles.noFileSelected}>No se ha seleccionado ningún archivo.</Text>
)}
      <Text style={styles.label}>Tipo de Denunciado</Text>
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === 'Vecino' && styles.typeButtonSelected
          ]}
          onPress={() => setType('Vecino')}
        >
          <Text style={styles.typeButtonText}>Vecino</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === 'Inspector' && styles.typeButtonSelected
          ]}
          onPress={() => setType('Inspector')}
        >
          <Text style={styles.typeButtonText}>Inspector</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === 'Sitio' && styles.typeButtonSelected
          ]}
          onPress={() => setType('Sitio')}
        >
          <Text style={styles.typeButtonText}>Sitio</Text>
        </TouchableOpacity>
      </View>
      {type && (
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.selectButton}>
          <Text style={styles.selectButtonText}>Seleccionar {type}</Text>
        </TouchableOpacity>
      )}
      {renderDenunciadoOptions()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAccept} onPress={handleAccept}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  fileButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  fileButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedFile: {
    fontSize: 16,
    color: '#9A9A9A',
    flex: 1,
  },
  removeFileButton: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 10,
    marginLeft: 10,
  },
  removeFileButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
    marginTop: 15,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  typeButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#333333',
  },
  typeButtonSelected: {
    backgroundColor: '#007BFF',
  },
  typeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  optionButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#333333',
    marginBottom: 5,
  },
  optionButtonSelected: {
    backgroundColor: '#007BFF',
  },
  optionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  selectButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#1F1F1F',
    padding: 20,
    borderRadius: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddDenunciaScreen;
