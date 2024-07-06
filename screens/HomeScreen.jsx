import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('MisDenuncias')}>
        <Text style={styles.drawerLabel}>Mis Denuncias</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('MisReclamos')}>
        <Text style={styles.drawerLabel}>Mis Reclamos</Text>
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
  const [images, setImages] = useState([
    require('../assets/sani.png')
  ]);
  const [services, setServices] = useState([
    require('../assets/eco.png'),
    require('../assets/bocas.png'),
    require('../assets/run.png'),
    require('../assets/tels.png'),
  ]);

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SIM</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="notifications" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeMessage}>San Isidro Municipio</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScrollView}
        >
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.image} />
          ))}
        </ScrollView>
        <Text style={styles.servicesTitle}>Descubre lo Mejor de San Isidro</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScrollView}
        >
          {services.map((service, index) => (
            <Image key={index} source={service} style={styles.image} />
          ))}
        </ScrollView>
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
    </ScrollView>
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
    padding: 30,
    backgroundColor: '#333333',
  },
  headerTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'San Francisco',
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
    fontFamily: 'Roboto',
  },
  imageScrollView: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {

    width: screenWidth - 60,
    height: 300,
    borderRadius: 30,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  servicesTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'left',
    fontFamily: 'Montserrat',
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
    padding: 10,
    borderRadius: 10,

  },

  menuLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Roboto',
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
    fontFamily: 'Roboto',
  },
  drawerStyle: {
    backgroundColor: '#1F1F1F',
  },
});

export default HomeNavigator;
