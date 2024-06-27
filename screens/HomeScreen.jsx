// screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import PromocionesScreen from './PromocionesScreen';
import ReclamosScreen from './ReclamosScreen';
import DenunciasScreen from './DenunciasScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
          <Ionicons name="person-circle-outline" size={32} color="black" />
        </TouchableOpacity>
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
        })}
        tabBarOptions={{
          activeTintColor: '#000080',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Promociones" component={PromocionesScreen} />
        <Tab.Screen name="Reclamos" component={ReclamosScreen} />
        <Tab.Screen name="Denuncias" component={DenunciasScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
