import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPromotionScreen = ({ navigation }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [horarios, setHorarios] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contacto, setContacto] = useState('');
    const [fotos, setFotos] = useState([]);
    const [tipoPromocion, setTipoPromocion] = useState('DESCUENTO');
    const [sitios, setSitios] = useState([]);
    const [rubros, setRubros] = useState([]);
    const [sitio, setSitio] = useState(null);
    const [rubro, setRubro] = useState(null);
    const [vecinoId, setVecinoId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sitioResponse = await axios.get('http://192.168.0.244:8080/api/sitios');
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const parsedData = JSON.parse(userData);
                    setVecinoId(parsedData.id);
                    console.log(parsedData.id);
                    
                    sitioResponse.data.forEach(sitio => {
                      console.log(sitio.propietario.documento);
                    });

                    const filteredSitios = sitioResponse.data.filter(sitio => parseInt(sitio.propietario.documento) === parseInt(parsedData.id));
                    setSitios(filteredSitios);
                }
                
                const rubroResponse = await axios.get('http://192.168.0.244:8080/api/rubros');
                setRubros(rubroResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);

    const handleFilePicker = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({ multiple: true });
            setFotos([...fotos, ...result.assets]);
        } catch (err) {
            console.log('Error picking document:', err);
        }
    };

    const handleRemoveFile = (uri) => {
        setFotos(fotos.filter(file => file.uri !== uri));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('descripcion', descripcion);
        formData.append('tipoPromocion', tipoPromocion);
        formData.append('titulo', titulo);
        formData.append('horarios', horarios);
        formData.append('direccion', direccion);
        formData.append('contacto', contacto);
        formData.append('estadoPromocion', 'ACTIVA');
        formData.append('vecinoId', vecinoId);
    
        if (sitio) {
            formData.append('sitioId', sitio);
        }
        if (rubro) {
            formData.append('rubroId', rubro);
        }
    
        fotos.forEach((file, index) => {
            formData.append('fotos', {
                uri: file.uri,
                type: file.type,
                name: file.name
            });
        });
    
        try {
            const response = await axios.post('http://192.168.0.244:8080/api/promociones/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Promoción añadida exitosamente', response.data);
            Alert.alert('Promoción Añadida', 'La promoción se ha añadido correctamente.');
            navigation.goBack();
        } catch (error) {
            console.error('Error al añadir la promoción!', error);
            Alert.alert('Error', 'Hubo un error al añadir la promoción.');
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
            <Text style={styles.title}>Crear Promoción</Text>
            <TextInput
                style={styles.input}
                placeholder="Título"
                value={titulo}
                onChangeText={setTitulo}
                placeholderTextColor="#9A9A9A"
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
                placeholderTextColor="#9A9A9A"
            />
            <TextInput
                style={styles.input}
                placeholder="Horarios"
                value={horarios}
                onChangeText={setHorarios}
                placeholderTextColor="#9A9A9A"
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección"
                value={direccion}
                onChangeText={setDireccion}
                placeholderTextColor="#9A9A9A"
            />
            <TextInput
                style={styles.input}
                placeholder="Contacto"
                value={contacto}
                onChangeText={setContacto}
                placeholderTextColor="#9A9A9A"
            />
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Tipo de Promoción:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setTipoPromocion(value)}
                    items={[
                        { label: 'Descuento', value: 'DESCUENTO' },
                        { label: 'Oferta', value: 'OFERTA' },
                    ]}
                    style={pickerSelectStyles}
                    placeholder={{ label: "Seleccionar tipo de promoción", value: null }}
                />
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Sitio:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSitio(value)}
                    items={sitios.map(sitio => ({ label: sitio.direccion, value: sitio.idSitio }))}
                    style={pickerSelectStyles}
                    placeholder={{ label: "Seleccionar sitio", value: null }}
                />
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Rubro:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setRubro(value)}
                    items={rubros.map(rubro => ({ label: rubro.descripcion, value: rubro.idRubro }))}
                    style={pickerSelectStyles}
                    placeholder={{ label: "Seleccionar rubro", value: null }}
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

export default AddPromotionScreen;
