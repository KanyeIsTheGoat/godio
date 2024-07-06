import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('MisReclamos')}>
        <Text style={styles.drawerLabel}>Mis Reclamos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.drawerLabel}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const InspectorHomeScreen = ({ navigation }) => {
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    const fetchReclamos = async () => {
      try {
        const response = await axios.get('http://192.168.0.244:8080/api/reclamos');
        setReclamos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching reclamos:', error);
      }
    };

    fetchReclamos();
  }, []);

  const renderReclamoItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ReclamoDetail', { reclamo: item })}>
      <View style={styles.reclamoItem}>
        <Text style={styles.reclamoTitle}>{item.desperfecto}</Text>
        <Text style={styles.reclamoDescription}>{item.descripcion}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inspector Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="notifications" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={reclamos}
        renderItem={renderReclamoItem}
        keyExtractor={item => item.idReclamo.toString()}
        contentContainerStyle={styles.listContentContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddReclamo')}>
        <Text style={styles.addButtonText}>Añadir Reclamo</Text>
      </TouchableOpacity>
    </View>
  );
};

const InspectorNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ drawerStyle: styles.drawerStyle }}>
      <Drawer.Screen name="Inspector Home" component={InspectorHomeScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#333333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContentContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 100,
  },
  reclamoItem: {
    backgroundColor: '#333333',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  reclamoTitle: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  reclamoDescription: {
    fontSize: 14,
    color: '#9A9A9A',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  drawerContent: {
    backgroundColor: '#1F1F1F',
  },
  drawerItem: {
    padding: 15,
  },
  drawerLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  drawerStyle: {
    backgroundColor: '#1F1F1F',
  },
});

export default InspectorNavigator;
