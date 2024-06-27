// screens/PromocionDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PromocionDetailScreen = ({ route }) => {
  const { promocion } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{promocion.title}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{promocion.description}</Text>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.value}>{promocion.address}</Text>
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

export default PromocionDetailScreen;
