import React from 'react';
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
import AddPromotionScreen from './screens/AddPromotionScreen';
import UserInfoScreen from './screens/UserInfoScreen';
import AddReclamoScreen from './screens/AddReclamoScreen';
import AddDenunciaScreen from './screens/AddDenunciaScreen';
import MisDenunciasScreen from './screens/MisDenunciasScreen';
import MisReclamosScreen from './screens/MisReclamosScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import InspectorNavigator from './screens/InspectorScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1F1F1F',
          },
          headerTintColor: '#FFFFFF',
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegistrationScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Home" component={HomeNavigator} options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="Promociones" component={PromocionesScreen} options={{ title: 'Promotions' }} />
        <Stack.Screen name="Denuncias" component={DenunciasScreen} options={{ title: 'Denuncias' }} />
        <Stack.Screen name="Reclamos" component={ReclamosScreen} options={{ title: 'Reclamos' }} />
        <Stack.Screen name="PromocionDetail" component={PromocionDetailScreen} options={{ title: 'Promotion Detail' }} />
        <Stack.Screen name="DenunciaDetail" component={DenunciaDetailScreen} options={{ title: 'Denuncia Detail' }} />
        <Stack.Screen name="ReclamoDetail" component={ReclamoDetailScreen} options={{ title: 'Reclamo Detail' }} />
        <Stack.Screen name="AddPromotion" component={AddPromotionScreen} options={{ title: 'Add Promotion' }} />
        <Stack.Screen name="Profile" component={UserInfoScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="AddReclamo" component={AddReclamoScreen} options={{ title: 'Add Reclamo' }} />
        <Stack.Screen name="AddDenuncia" component={AddDenunciaScreen} options={{ title: 'Add Denuncia' }} />
        <Stack.Screen name="MisDenuncias" component={MisDenunciasScreen} options={{ title: 'Mis Denuncias' }} />
        <Stack.Screen name="MisReclamos" component={MisReclamosScreen} options={{ title: 'Mis Reclamos' }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notificaciones' }} />
        <Stack.Screen name="InspectorHome" component={InspectorNavigator} options={{ title: 'Inspector Home', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
