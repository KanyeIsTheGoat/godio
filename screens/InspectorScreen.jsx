import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('AddReclamo')}>
        <Text style={styles.drawerLabel}>Añadir Reclamo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.drawerLabel}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const InspectorHomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState(''); // Este estado almacenará el nombre del usuario

  useEffect(() => {
    // Simulación de la obtención del nombre del usuario desde la base de datos
    // Reemplazar esto con la lógica de obtención real de datos
    const fetchUserName = async () => {
      const fetchedName = 'John Doe'; // Supongamos que obtuvimos este nombre desde la base de datos
      setUserName(fetchedName);
    };

    fetchUserName();
  }, []);

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
      <View style={styles.content}>
        <Text style={styles.welcomeMessage}>Bienvenido Inspector {userName}</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AddReclamo')}
        >
          <Icon name="document-text" size={30} color="#FFFFFF" />
          <Text style={styles.menuLabel}>Añadir Reclamo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InspectorNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ drawerStyle: styles.drawerStyle }}>
      <Drawer.Screen name="InspectorHome" component={InspectorHomeScreen} options={{ headerShown: false }} />
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeMessage: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#333333',
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  menuLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 5,
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
