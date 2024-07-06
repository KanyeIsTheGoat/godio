import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const AddReclamoScreen = ({ navigation }) => {
    const [desperfecto, setDesperfecto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoReclamo, setTipoReclamo] = useState('');
    const [fotos, setFotos] = useState([]);
    const [sitios, setSitios] = useState([]);
    const [reclamanteId, setReclamanteId] = useState(null);
    const [reclamanteRol, setReclamanteRol] = useState('');
    const [sitioSeleccionado, setSitioSeleccionado] = useState(null);
    const [estadoReclamo] = useState('ACTIVO'); // Estado fijo para estadoReclamo

    useEffect(() => {
        const fetchSitios = async () => {
            try {
                const sitioResponse = await axios.get('http://192.168.0.18:8080/api/sitios');
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const parsedData = JSON.parse(userData);
                    const userId = parsedData.id;
                    const filteredSitios = sitioResponse.data.filter(sitio => sitio.propietario.id !== userId);
                    setSitios(filteredSitios);
                }
            } catch (error) {
                console.error('Error al obtener sitios:', error);
            }
        };

        const fetchUserData = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const parsedData = JSON.parse(userData);
                setReclamanteId(parsedData.id);
                setReclamanteRol(parsedData.role);
                setTipoReclamo(parsedData.role === 'INSPECTOR' ? 'RECLAMO_INSPECTOR' : 'RECLAMO_VECINO');
            }
        };

        fetchSitios();
        fetchUserData();
    }, []);

    const handleFilePicker = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({ multiple: true });
            setFotos([...fotos, ...result.assets]);
        } catch (err) {
            console.log('Error al elegir documento:', err);
        }
    };

    const handleRemoveFile = (uri) => {
        setFotos(fotos.filter(file => file.uri !== uri));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('descripcion', descripcion);
        formData.append('tipoReclamo', tipoReclamo);
        formData.append('desperfecto', desperfecto);
        formData.append('estadoReclamo', estadoReclamo); 

        if (reclamanteRol === 'VECINO') {
            formData.append('vecinoId', reclamanteId);
        } else if (reclamanteRol === 'INSPECTOR') {
            formData.append('inspectorId', reclamanteId);
        }

        if (sitioSeleccionado) {
            formData.append('sitioId', sitioSeleccionado);
        }

        fotos.forEach((file, index) => {
            formData.append('fotos', {
                uri: file.uri,
                type: file.type,
                name: file.name
            });
        });

        try {
            const response = await axios.post('http://192.168.0.18:8080/api/reclamos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Reclamo added successfully', response.data);
            Alert.alert('Reclamo Añadido', 'El reclamo se ha añadido correctamente.');
            navigation.goBack();
        } catch (error) {
            console.error('There was an error adding the reclamo!', error);
            Alert.alert('Error', 'Hubo un error al añadir el reclamo.');
        }
    };

    const renderFileItem = ({ item }) => (
        <View style={styles.fileItem}>
            <Text style={styles.selectedFile}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleRemoveFile(item.uri)} style={styles.removeFileButton}>
                <Text style={styles.removeFileButtonText}>X</Text>
            </TouchableOpacity>
        </View>
    );

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
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Seleccionar Sitio:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSitioSeleccionado(value)}
                    items={sitios.map(sitio => ({ label: sitio.direccion, value: sitio.idSitio }))}
                    style={pickerSelectStyles}
                    placeholder={{ label: "Seleccionar sitio", value: null }}
                />
            </View>
            <TouchableOpacity onPress={handleFilePicker} style={styles.fileButton}>
                <Text style={styles.fileButtonText}>Seleccionar Archivos</Text>
            </TouchableOpacity>
            <FlatList
                data={fotos}
                renderItem={renderFileItem}
                keyExtractor={(item) => item.uri}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonAccept} onPress={handleSubmit}>
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
    pickerContainer: {
        marginBottom: 15,
    },
    pickerLabel: {
        fontSize: 16,
        color: '#9A9A9A',
        marginBottom: 5,
    },
    fileButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
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

export default AddReclamoScreen;
