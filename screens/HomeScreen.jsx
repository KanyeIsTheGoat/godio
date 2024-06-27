// screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import PromocionesScreen from './PromocionesScreen';
import ReclamosScreen from './ReclamosScreen';
import DenunciasScreen from './DenunciasScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
          <Ionicons name="person-circle-outline" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Promociones') {
              iconName = 'pricetag-outline';
            } else if (route.name === 'Reclamos') {
              iconName = 'alert-circle-outline';
            } else if (route.name === 'Denuncias') {
              iconName = 'megaphone-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#000080',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: true, 
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 0,
          },
        })}
      >
        <Tab.Screen name="Promociones" component={PromocionesScreen} />
        <Tab.Screen name="Reclamos" component={ReclamosScreen} />
        <Tab.Screen name="Denuncias" component={DenunciasScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Helvetica', // Cambia esta propiedad según la fuente que prefieras
  },
});

export default HomeScreen;


