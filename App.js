// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import UserInfoScreen from './screens/UserInfoScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import PromocionesScreen from './screens/PromocionesScreen';
import DenunciasScreen from './screens/DenunciasScreen';
import ReclamosScreen from './screens/ReclamosScreen';
import AddPromotionScreen from './screens/AddPromotionScreen';
import AddDenunciaScreen from './screens/AddDenunciaScreen';
import AddReclamoScreen from './screens/AddReclamoScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import MisReclamosScreen from './screens/MisReclamosScreen';
import MisDenunciasScreen from './screens/MisDenunciasScren';
import ReclamoDetailScreen from './screens/ReclamoDetailScreen';
import DenunciaDetailScreen from './screens/DenunciaDetailScreen';
import PromocionDetailScreen from './screens/PromocionDetailScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserInfo" component={UserInfoScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Promociones" component={PromocionesScreen} />
        <Stack.Screen name="Denuncias" component={DenunciasScreen} />
        <Stack.Screen name="Reclamos" component={ReclamosScreen} />
        <Stack.Screen name="AddPromotion" component={AddPromotionScreen} />
        <Stack.Screen name="AddDenuncia" component={AddDenunciaScreen} />
        <Stack.Screen name="AddReclamo" component={AddReclamoScreen} />
        <Stack.Screen name="MisDenuncias" component={MisDenunciasScreen} />
        <Stack.Screen name="MisReclamos" component={MisReclamosScreen} />
        <Stack.Screen name="ReclamoDetail" component={ReclamoDetailScreen} />
        <Stack.Screen name="DenunciaDetail" component={DenunciaDetailScreen} />
        <Stack.Screen name="PromocionDetail" component={PromocionDetailScreen} />




      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
