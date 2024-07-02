import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.244:8080/auth/login', {
        id,
        password
      });
      if (response.data === 'VECINO') {
        navigation.navigate('Home');
      } else if (response.data === 'INSPECTOR') {
        navigation.navigate('Inspector');
      } else {
        setMessage('Credenciales inválidas');
      }
    } catch (error) {
      setMessage('Error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.subtitle}>Ingrese su documento o legajo y contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Documento o Legajo"
          placeholderTextColor="#9A9A9A"
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#9A9A9A"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signUp}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#1F1F1F',
  },
  formContainer: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#9A9A9A',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#555555',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUp: {
    color: '#1E90FF',
    textAlign: 'center',
    fontSize: 16,
  },
  message: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
});

export default LoginScreen;
