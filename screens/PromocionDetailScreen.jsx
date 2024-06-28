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
    padding: 20,
    backgroundColor: '#1F1F1F',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#9A9A9A',
  },
});

export default PromocionDetailScreen;
