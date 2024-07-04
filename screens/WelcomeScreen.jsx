import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/sani.png')} style={styles.headerImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Todo acerca de tu municipio</Text>
        <Text style={styles.subtitle}>Realiza todas las acciones y busca tus lugares preferidos en tu barrio</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButtonText}>Registrarme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Publico')}>
          <Text style={styles.guestText}>Entrar como invitado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    padding: 20,
  },
  headerImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#9A9A9A',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 100,
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 100,
    marginBottom: 10,
    width: '100%',
  },
  registerButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestText: {
    color: '#1E90FF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
});

export default WelcomeScreen;
