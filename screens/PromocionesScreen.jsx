import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-web';

const testData = [
  { id: '1', title: 'Promotion 1', description: 'Description of promotion 1' },
  { id: '2', title: 'Promotion 2', description: 'Description of promotion 2' },
  { id: '2', title: 'Promotion 2', description: 'Description of promotion 2' },
  { id: '2', title: 'Promotion 2', description: 'Description of promotion 2' },
  { id: '2', title: 'Promotion 2', description: 'Description of promotion 2' },
  { id: '2', title: 'Promotion 2', description: 'Description of promotion 2' },
  { id: '2', title: 'Promotion 2', description: 'Description of promotion 2' },
  { id: '2', title: 'Promotion 2', description: 'Description of promotion 2' },
  { id: '2', title: 'Promotion 2', description: 'Description of promotion 2' },
  { id: '2', title: 'Promotion 2', description: 'Description of promotion 2' },
  { id: '2', title: 'Promotion 2', description: 'Description of promotion 2' },




];

const PromocionesScreen = ({ navigation }) => {
  const renderPromocionItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PromocionDetail', { promocion: item })}>
      <View style={styles.promocionItem}>
        <Text style={styles.promocionTitle}>{item.title}</Text>
        <Text style={styles.promocionDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
    <View style={styles.container}>
      <FlatList
        data={testData}
        renderItem={renderPromocionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPromotion')}>
        <Text style={styles.addButtonText}>Add Promotion</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: '#1F1F1F',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  listContentContainer: {
    paddingBottom: 100, // Ensures space for the add button
  },
  promocionItem: {
    display: "flex",
    backgroundColor: '#333333',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  promocionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  promocionDescription: {
    fontSize: 14,
    color: '#9A9A9A',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default PromocionesScreen;

