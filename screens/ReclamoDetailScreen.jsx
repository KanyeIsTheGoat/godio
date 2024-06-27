// screens/ReclamoDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReclamoDetailScreen = ({ route }) => {
  const { reclamo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{reclamo.title}</Text>
      <Text style={styles.label}>Type:</Text>
      <Text style={styles.value}>{reclamo.type}</Text>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.value}>{reclamo.address}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{reclamo.description}</Text>
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
});

export default ReclamoDetailScreen;
