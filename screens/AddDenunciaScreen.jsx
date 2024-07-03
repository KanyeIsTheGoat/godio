import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import RNPickerSelect from 'react-native-picker-select';

const AddDenunciaScreen = ({ navigation }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [causa, setCausa] = useState('');
    const [lugar, setLugar] = useState('');
    const [pruebas, setPruebas] = useState([]);
    const [denunciaTipo, setDenunciaTipo] = useState('DenunciaSitio'); // Default type
    const [sitios, setSitios] = useState([]);
    const [vecinos, setVecinos] = useState([]);
    const [inspectores, setInspectores] = useState([]);
    const [denunciado, setDenunciado] = useState(null);
    const [denuncianteId, setDenuncianteId] = useState(null);

    useEffect(() => {
        // Fetch sitios, vecinos, inspectores and denuncianteId from backend or local storage
        const fetchData = async () => {
            try {
                const sitioResponse = await axios.get('http://192.168.0.244:8080/api/sitios');
                setSitios(sitioResponse.data);
                
                const vecinoResponse = await axios.get('http://192.168.0.244:8080/api/vecinos');
                setVecinos(vecinoResponse.data);
                
                const inspectorResponse = await axios.get('http://192.168.0.244:8080/api/inspectores');
                setInspectores(inspectorResponse.data);
                
                // Suppose denuncianteId is stored in local storage
                const denuncianteId = await AsyncStorage.getItem('denuncianteId');
                setDenuncianteId(denuncianteId);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);

    const handleFilePicker = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({ multiple: true });
            if (!result.canceled && result.assets) {
                setPruebas([...pruebas, ...result.assets]);
            }
        } catch (err) {
            console.log('Error picking document:', err);
        }
    };

    const handleRemoveFile = (uri) => {
        setPruebas(pruebas.filter(file => file.uri !== uri));
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('causa', causa);
        formData.append('lugar', lugar);
        formData.append('estadoDenuncia', 'PENDING');
        formData.append('tipoDenuncia', denunciaTipo);
        formData.append('denunciante_id', denuncianteId);

        if (denunciaTipo === 'DenunciaSitio') {
            formData.append('sitio_id', denunciado);
        } else if (denunciaTipo === 'DenunciaVecino') {
            formData.append('denunciado_id', denunciado);
        } else if (denunciaTipo === 'DenunciaInspector') {
            formData.append('inspector_id', denunciado);
        }

        pruebas.forEach((file, index) => {
            formData.append(`pruebas[${index}]`, {
                uri: file.uri,
                type: file.mimeType,
                name: file.name
            });
        });

        axios.post('http://192.168.0.244:8080/api/denuncias', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log('Denuncia added successfully', response.data);
                Alert.alert('Denuncia Añadida', 'La denuncia se ha añadido correctamente.');
                navigation.goBack();
            })
            .catch(error => {
                console.error('There was an error adding the denuncia!', error);
                Alert.alert('Error', 'Hubo un error al añadir la denuncia.');
            });
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
                        { label: 'Denuncia Sitio', value: 'DenunciaSitio' },
                        { label: 'Denuncia Vecino', value: 'DenunciaVecino' },
                        { label: 'Denuncia Inspector', value: 'DenunciaInspector' },
                    ]}
                    style={pickerSelectStyles}
                />
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Seleccionar:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setDenunciado(value)}
                    items={
                        denunciaTipo === 'DenunciaSitio' ? 
                        sitios.map(sitio => ({ label: sitio.direccion, value: sitio.id })) : 
                        denunciaTipo === 'DenunciaVecino' ? 
                        vecinos.map(vecino => ({ label: vecino.nombre, value: vecino.id })) : 
                        inspectores.map(inspector => ({ label: inspector.nombre, value: inspector.id }))
                    }
                    style={pickerSelectStyles}
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
        paddingRight: 30, // to ensure the text is never behind the icon
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
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#333333',
    },
});

export default AddDenunciaScreen;
