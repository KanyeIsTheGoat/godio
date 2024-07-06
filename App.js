import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigator from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
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
import MisDenunciasScreen from './screens/MisDenunciasScren';
import MisReclamosScreen from './screens/MisReclamosScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import InspectorScreen from './screens/InspectorScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import PublicoScreen from './screens/PublicoScreen';


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
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrarse', headerShown: false }} />
        <Stack.Screen name="Home" component={HomeNavigator} options={{ title: 'MuniAPP', headerShown: false }} />
        <Stack.Screen name="Promociones" component={PromocionesScreen} options={{ title: 'Promociones' }} />
        <Stack.Screen name="Denuncias" component={DenunciasScreen} options={{ title: 'Denuncias' }} />
        <Stack.Screen name="Reclamos" component={ReclamosScreen} options={{ title: 'Reclamos' }} />
        <Stack.Screen name="PromocionDetail" component={PromocionDetailScreen} options={{ title: 'Detalle' }} />
        <Stack.Screen name="DenunciaDetail" component={DenunciaDetailScreen} options={{ title: 'Detalle' }} />
        <Stack.Screen name="ReclamoDetail" component={ReclamoDetailScreen} options={{ title: 'Detalle' }} />
        <Stack.Screen name="AddPromotion" component={AddPromotionScreen} options={{ title: 'Añadir Promocion' }} />
        <Stack.Screen name="Profile" component={UserInfoScreen} options={{ title: 'Perfil' }} />
        <Stack.Screen name="AddReclamo" component={AddReclamoScreen} options={{ title: 'Agregar Reclamo' }} />
        <Stack.Screen name="AddDenuncia" component={AddDenunciaScreen} options={{ title: 'Agregar Denuncia' }} />
        <Stack.Screen name="MisDenuncias" component={MisDenunciasScreen} options={{ title: 'Mis Denuncias' }} />
        <Stack.Screen name="MisReclamos" component={MisReclamosScreen} options={{ title: 'Mis Reclamos' }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notificaciones' }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: '' }} />
        <Stack.Screen name="Inspector" component={InspectorScreen} options={{ title: 'Inspector' }} />
        <Stack.Screen name="Publico" component={PublicoScreen} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
