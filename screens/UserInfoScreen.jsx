import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const UserInfoScreen = ({ navigation }) => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
  };

  const handleLogout = () => {

    console.log('User logged out');
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MisDenuncias')}
      >
        <Text style={styles.buttonText}>Mis Denuncias</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MisReclamos')}
      >
        <Text style={styles.buttonText}>Mis Reclamos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  detailContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9A9A9A',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonLogout: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserInfoScreen;
