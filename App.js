import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigator from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import PromocionesScreen from './screens/PromocionesScreen';
import DenunciasScreen from './screens/DenunciasScreen';
import ReclamosScreen from './screens/ReclamosScreen';
import PromocionDetailScreen from './screens/PromocionDetailScreen';
import DenunciaDetailScreen from './screens/DenunciaDetailScreen';
import ReclamoDetailScreen from './screens/ReclamoDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1F1F1F',
          },
          headerTintColor: '#FFFFFF',
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegistrationScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Home" component={HomeNavigator} options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="Promociones" component={PromocionesScreen} options={{ title: 'Promotions' }} />
        <Stack.Screen name="Denuncias" component={DenunciasScreen} options={{ title: 'Denuncias' }} />
        <Stack.Screen name="Reclamos" component={ReclamosScreen} options={{ title: 'Reclamos' }} />
        <Stack.Screen name="PromocionDetail" component={PromocionDetailScreen} options={{ title: 'Promotion Detail' }} />
        <Stack.Screen name="DenunciaDetail" component={DenunciaDetailScreen} options={{ title: 'Denuncia Detail' }} />
        <Stack.Screen name="ReclamoDetail" component={ReclamoDetailScreen} options={{ title: 'Reclamo Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
