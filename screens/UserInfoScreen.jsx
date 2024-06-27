// screens/UserInfoScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const UserInfoScreen = ({ navigation }) => {
  // Replace these with actual user data
  const userName = "John Doe";
  const userEmail = "john.doe@example.com";

  const handleMisDenuncias = () => {
    // Navigate to Mis Denuncias screen
    navigation.navigate('MisDenuncias');
  };

  const handleMisReclamos = () => {
    // Navigate to Mis Reclamos screen
    navigation.navigate('MisReclamos');
  };

  const handleCerrarSesion = () => {
    // Handle logout logic and navigate to the login page
    Alert.alert('Cerrar Sesión', 'Has cerrado sesión exitosamente.');
    navigation.navigate('Login'); // Replace 'Login' with the actual name of your login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Information</Text>
      <Text style={styles.userInfo}>Name: {userName}</Text>
      <Text style={styles.userInfo}>Email: {userEmail}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleMisDenuncias}>
          <Text style={styles.buttonText}>Mis Denuncias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMisReclamos}>
          <Text style={styles.buttonText}>Mis Reclamos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogout} onPress={handleCerrarSesion}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  buttonLogout: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserInfoScreen;

