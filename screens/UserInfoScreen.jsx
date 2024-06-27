// screens/UserInfoScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const UserInfoScreen = ({ navigation }) => {
  // Reemplaza estos valores con datos reales del usuario
  const userName = "John Doe";
  const userEmail = "john.doe@example.com";

  const handleMisDenuncias = () => {
    // Navegar a la pantalla Mis Denuncias
    navigation.navigate('MisDenuncias');
  };

  const handleMisReclamos = () => {
    // Navegar a la pantalla Mis Reclamos
    navigation.navigate('MisReclamos');
  };

  const handleCerrarSesion = () => {
    // Manejar la lógica de cierre de sesión y navegar a la pantalla de inicio de sesión
    Alert.alert('Cerrar Sesión', 'Has cerrado sesión exitosamente.');
    navigation.navigate('Login'); // Reemplaza 'Login' con el nombre real de tu pantalla de inicio de sesión
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola {userName}!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleMisDenuncias}>
          <Text style={styles.buttonText}>Mis Denuncias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMisReclamos}>
          <Text style={styles.buttonText}>Mis Reclamos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogout} onPress={handleCerrarSesion}>
          <Text style={styles.buttonLogoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  buttonLogout: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold', 
  },
  buttonLogoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserInfoScreen;


