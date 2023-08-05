import * as React from 'react';
import { Text, View,Button, StyleSheet } from 'react-native';
import { NavigationTab } from './NavigationT';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PetañaScreen } from '../Products/ProductsScreen';
import { ShoppingScreen } from '../Screens/shoppingcart';
import { MapScreen } from '../components/Map';
import { Direction } from '../Screens/directionsP';
import { TarjetaScreen } from '../Screens/Tarjeta';
import { FavoritesScreen } from '../Products/Favorites';
import { CategoriesScreen } from '../Screens/CategoriesScreen';
import { useEffect } from 'react';
import { usePermissions } from '../hook/usePermission';



const Stack = createNativeStackNavigator()
export const Navigation = ()=> {
  
  
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="uwu"
        component={NavigationTab}
        options={{ headerStyle: { backgroundColor: '#D3AFD4', },
          // tabBarLabel: 'Inico ' ,
          headerShown: false,
        }}
         />
           <Stack.Screen
        name="Shopping"
        component={ShoppingScreen}
        options={{ headerStyle: { backgroundColor: '#D3AFD4'},
          headerShown: false,
        }}
         />
        <Stack.Screen
        name="pestanas"
        component={PetañaScreen}
        options={{ headerStyle: { backgroundColor: '#D3AFD4',textColor:'white' },
        headerShown: false ,
      }}
        />
        <Stack.Screen
        name="appprueba "
        component={Direction}
        options={{
          headerShown: false,
        }}
        />
       <Stack.Screen
        name="Direction"
        component={Direction}
        options={{ headerStyle: { backgroundColor: '#D3AFD4', },
          headerShown: false,
        }}
         />
       <Stack.Screen
        name="mapaScreen"
        component={MapScreen}
        options={{ headerStyle: { backgroundColor: '#D3AFD4', },
          headerShown: false,
        }}
         />
       <Stack.Screen
        name="tarjetaScreen"
        component={TarjetaScreen}
        options={{
          headerShown: false,
        }}
        />
       <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ headerStyle: { backgroundColor: '#D3AFD4', },
          headerShown: false,
        }}
         />

     



         

        </Stack.Navigator>
  )
}
 const styles = StyleSheet.create({
 })

