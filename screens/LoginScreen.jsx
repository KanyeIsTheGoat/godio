import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>Ingrese su mail y contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9A9A9A"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9A9A9A"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUp}>Registrarse</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#9A9A9A',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#333333',
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
});

export default LoginScreen;

