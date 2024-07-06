import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserRole(parsedData.role);

          let response;
          if (parsedData.role === 'VECINO') {
            response = await axios.get(`http://192.168.0.244:8080/api/notificaciones/vecino/${parsedData.id}`);
          } else if (parsedData.role === 'INSPECTOR') {
            response = await axios.get(`http://192.168.0.244:8080/api/notificaciones/inspector/${parsedData.id}`);
          }

          if (response) {
            setNotifications(response.data);
          }
        }
      } catch (error) {
        console.error('Error al cargar las notificaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`http://192.168.0.244:8080/api/notificaciones/${id}`);
      setNotifications(notifications.filter(notification => notification.idNotificacion !== id));
    } catch (error) {
      console.error('Error al eliminar notificacion:', error);
    }
  };

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.descripcion}</Text>
      <TouchableOpacity onPress={() => handleDeleteNotification(item.idNotificacion)} style={styles.deleteButton}>
        <Ionicons name="trash" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.idNotificacion.toString()}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No hay notificaciones.</Text>}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#333333',
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  deleteButton: {
    marginLeft: 10,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#9A9A9A',
    textAlign: 'center',
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationsScreen;
