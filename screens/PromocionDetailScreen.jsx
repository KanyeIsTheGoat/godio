import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PromocionDetailScreen = ({ route }) => {
  const { promocion } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{promocion.title}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{promocion.description}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{promocion.address}</Text>
      </View>
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
});

export default PromocionDetailScreen;
