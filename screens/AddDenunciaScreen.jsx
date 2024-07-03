import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddDenunciaScreen = ({ navigation }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [causa, setCausa] = useState('');
    const [lugar, setLugar] = useState('');
    const [pruebas, setPruebas] = useState([]);
    const [denunciaTipo, setDenunciaTipo] = useState('DENUNCIA_SITIO');
    const [sitios, setSitios] = useState([]);
    const [vecinos, setVecinos] = useState([]);
    const [inspectores, setInspectores] = useState([]);
    const [denunciado, setDenunciado] = useState(null);
    const [denuncianteId, setDenuncianteId] = useState(null);
    const [opcionesDenunciado, setOpcionesDenunciado] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sitioResponse = await axios.get('http://192.168.0.244:8080/api/sitios');
                setSitios(sitioResponse.data);
                console.log(sitioResponse.data);
                
                const vecinoResponse = await axios.get('http://192.168.0.244:8080/api/vecinos');
                setVecinos(vecinoResponse.data);
                console.log(vecinoResponse.data);
                
                const inspectorResponse = await axios.get('http://192.168.0.244:8080/api/inspectores');
                setInspectores(inspectorResponse.data);
                console.log(inspectorResponse.data);
                
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const parsedData = JSON.parse(userData);
                    setDenuncianteId(parsedData.id);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);

    useEffect(() => {
        switch (denunciaTipo) {
            case 'DENUNCIA_SITIO':
                setOpcionesDenunciado(sitios.map(sitio => ({ label: sitio.direccion, value: sitio.idSitio })));
                break;
            case 'DENUNCIA_VECINO':
                setOpcionesDenunciado(vecinos.map(vecino => ({ label: vecino.nombre, value: vecino.documento })));
                break;
            case 'DENUNCIA_INSPECTOR':
                setOpcionesDenunciado(inspectores.map(inspector => ({ label: inspector.nombre, value: inspector.legajo })));
                break;
            default:
                setOpcionesDenunciado([]);
                break;
        }
    }, [denunciaTipo, sitios, vecinos, inspectores]);

    const handleFilePicker = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({ multiple: true });
            setPruebas([...pruebas, ...result.assets]);
        } catch (err) {
            console.log('Error picking document:', err);
        }
    };

    const handleRemoveFile = (uri) => {
        setPruebas(pruebas.filter(file => file.uri !== uri));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('descripcion', descripcion);
        formData.append('estadoDenuncia', 'ACTIVA');
        formData.append('tipoDenuncia', denunciaTipo);
        formData.append('titulo', titulo);
        formData.append('causa', causa);
        formData.append('lugar', lugar);
        formData.append('denuncianteId', denuncianteId);

        if (denunciaTipo === 'DENUNCIA_SITIO' && denunciado) {
            formData.append('sitioId', denunciado);
        } else if (denunciaTipo === 'DENUNCIA_VECINO' && denunciado) {
            formData.append('denunciadoId', denunciado);
        } else if (denunciaTipo === 'DENUNCIA_INSPECTOR' && denunciado) {
            formData.append('inspectorId', denunciado);
        }

        pruebas.forEach((file, index) => {
            const fileToUpload = {
                uri: file.uri,
                type: file.mimeType || 'application/octet-stream',
                name: file.name || `file-${index}`
            };
            formData.append('file', fileToUpload);
        });

        try {
            const response = await axios.post('http://192.168.0.244:8080/api/denuncias/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Denuncia added successfully', response.data);
            Alert.alert('Denuncia Añadida', 'La denuncia se ha añadido correctamente.');
            navigation.goBack();
        } catch (error) {
            console.error('There was an error adding the denuncia!', error);
            Alert.alert('Error', 'Hubo un error al añadir la denuncia.');
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
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Crear Denuncia</Text>
            <TextInput
                style={styles.input}
                placeholder="Titulo"
                value={titulo}
                onChangeText={setTitulo}
                placeholderTextColor="#9A9A9A"
            />
            <TextInput
                style={styles.input}
                placeholder="Descripcion"
                value={descripcion}
                onChangeText={setDescripcion}
                placeholderTextColor="#9A9A9A"
            />
            <TextInput
                style={styles.input}
                placeholder="Causa"
                value={causa}
                onChangeText={setCausa}
                placeholderTextColor="#9A9A9A"
            />
            <TextInput
                style={styles.input}
                placeholder="Lugar"
                value={lugar}
                onChangeText={setLugar}
                placeholderTextColor="#9A9A9A"
            />
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Tipo de Denuncia:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setDenunciaTipo(value)}
                    items={[
                        { label: 'Denuncia Sitio', value: 'DENUNCIA_SITIO' },
                        { label: 'Denuncia Vecino', value: 'DENUNCIA_VECINO' },
                        { label: 'Denuncia Inspector', value: 'DENUNCIA_INSPECTOR' },
                    ]}
                    style={pickerSelectStyles}
                    placeholder={{ label: "Seleccionar tipo de denuncia", value: null }}
                />
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Seleccionar:</Text>
                <RNPickerSelect
                    onValueChange={(value) => { 
                        console.log(value);
                        setDenunciado(value);
                    }}
                    items={opcionesDenunciado}
                    style={pickerSelectStyles}
                    placeholder={{ label: "Seleccionar denunciado", value: null }}
                />
            </View>
            <TouchableOpacity onPress={handleFilePicker} style={styles.fileButton}>
                <Text style={styles.fileButtonText}>Seleccionar Archivos</Text>
            </TouchableOpacity>
            <FlatList
                data={pruebas}
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

export default AddDenunciaScreen;
