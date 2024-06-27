// screens/MisDenunciasScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const MisDenunciasScreen = ({ navigation }) => {
  // Sample data for denuncias
  const denuncias = [
    { id: '1', title: 'Denuncia 1', type: 'Type 1', denunciado: 'Person A', place: 'Place A', cause: 'Cause A', description: 'Description A' },
    { id: '2', title: 'Denuncia 2', type: 'Type 2', denunciado: 'Person B', place: 'Place B', cause: 'Cause B', description: 'Description B' },
    // Add more denuncias as needed
  ];

  const renderDenunciaItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DenunciaDetail', { denuncia: item })}>
      <View style={styles.denunciaItem}>
        <Text style={styles.denunciaTitle}>{item.title}</Text>
        <Text style={styles.denunciaDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Denuncias</Text>
      <FlatList
        data={denuncias}
        renderItem={renderDenunciaItem}
        keyExtractor={item => item.id}
      />
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
  denunciaItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  denunciaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  denunciaDescription: {
    fontSize: 16,
    color: '#666',
  },
});

export default MisDenunciasScreen;

