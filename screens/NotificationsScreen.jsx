import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const NotificationsScreen = () => {
  // Sample data for notifications
  const notifications = [
    { id: '1', title: 'New Update Available', description: 'A new update has been released for the app.' },
    { id: '2', title: 'Promotion Alert', description: 'Check out the latest promotions in your area.' },
    { id: '3', title: 'Service Disruption', description: 'There will be a planned maintenance tomorrow.' },
    // Add more notifications as needed
  ];

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1F1F1F',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  notificationItem: {
    padding: 16,
    backgroundColor: '#333333',
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationDescription: {
    fontSize: 16,
    color: '#9A9A9A',
  },
});

export default NotificationsScreen;
