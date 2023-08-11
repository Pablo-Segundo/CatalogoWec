import * as React from 'react';
import { NavigationTab } from './NavigationT';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PetañaScreen } from '../Screens/Products/ProductsScreen';
import { ShoppingScreen } from '../Screens/ShoppingCartScreen';
import { MapScreen } from '../components/Map';
import { Direction } from '../Screens/DirectionScreen';
import { PaymentScreen } from '../Screens/PaymentScreen';
import { FavoritesScreen } from '../Screens/Products/FavoritesScreen';

const Stack = createNativeStackNavigator()
export const Navigation = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Wapizima"
        component={NavigationTab}
      />

      <Stack.Screen
        name="Shopping"
        component={ShoppingScreen}

      />
      <Stack.Screen
        name="pestanas"
        component={PetañaScreen}

      />
      <Stack.Screen
        name="appprueba "
        component={Direction}

      />
      <Stack.Screen
        name="Direction"
        component={Direction}

      />
      <Stack.Screen
        name="mapaScreen"
        component={MapScreen}

      />
      <Stack.Screen
        name="tarjetaScreen"
        component={PaymentScreen}

      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
    </Stack.Navigator>
  )
}


