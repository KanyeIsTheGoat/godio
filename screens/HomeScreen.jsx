import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.drawerLabel}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Promociones')}>
        <Text style={styles.drawerLabel}>Promociones</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Denuncias')}>
        <Text style={styles.drawerLabel}>Denuncias</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Reclamos')}>
        <Text style={styles.drawerLabel}>Reclamos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.drawerLabel}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const HomeScreen = ({ navigation }) => {
  const [activeMenu, setActiveMenu] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    fetchUser();
  }, []);

  const handleMenuPress = (menu) => {
    setActiveMenu(menu);
    navigation.navigate(menu);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MuniApp</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="notifications" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeMessage}>Municipalidad de San Isidro</Text>
        <Image source={require('../assets/municipio.jpg')} style={styles.image} />
      </View>
      <View style={styles.menu}>
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeMenu === 'Promociones' && styles.menuItemActive,
          ]}
          onPress={() => handleMenuPress('Promociones')}
        >
          <Icon name="pricetag" size={20} color="#FFFFFF" />
          <Text style={styles.menuLabel}>Promociones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeMenu === 'Denuncias' && styles.menuItemActive,
          ]}
          onPress={() => handleMenuPress('Denuncias')}
        >
          <Icon name="warning" size={20} color="#FFFFFF" />
          <Text style={styles.menuLabel}>Denuncias</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeMenu === 'Reclamos' && styles.menuItemActive,
          ]}
          onPress={() => handleMenuPress('Reclamos')}
        >
          <Icon name="document-text" size={20} color="#FFFFFF" />
          <Text style={styles.menuLabel}>Reclamos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ drawerStyle: styles.drawerStyle }}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
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
    paddingTop: 50,
    fontSize: 18,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeMessage: {
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  userInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#555555',
    borderRadius: 10,
  },
  userText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#333333',
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  menuItemActive: {
    backgroundColor: '#007BFF',
  },
  menuLabel: {
    color: '#FFFFFF',
    fontSize: 12,
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

export default HomeNavigator;
