import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.drawerLabel}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Promociones')}>
        <Text style={styles.drawerLabel}>Promotions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Denuncias')}>
        <Text style={styles.drawerLabel}>Denuncias</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Reclamos')}>
        <Text style={styles.drawerLabel}>Reclamos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.drawerLabel}>Log Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const HomeScreen = ({ navigation }) => {
  const [activeMenu, setActiveMenu] = useState('');

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
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="notifications" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeMessage}>Municipalidad de San Isidro</Text>
        <Image source={require('C:/Users/bauti/ProyectosReact/godio/assets/municipio.jpg')} style={styles.image} />
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
          <Text style={styles.menuLabel}>Promotions</Text>
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
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
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
