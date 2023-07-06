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




const Stack = createNativeStackNavigator()


export const Navigation = ()=> {
  return (
      
    <Stack.Navigator>
        <Stack.Screen
        name="uwu" 
        component={NavigationTab}
        options={{ headerStyle: { backgroundColor: '#d3afd4', },
          // tabBarLabel: 'Inico ' ,
          headerShown: false,
          
        }}
         />
           <Stack.Screen
        name="Shopping" 
        component={ShoppingScreen}
        options={{ headerStyle: { backgroundColor: '#d3afd4', },
          
          headerShown: false,
          
        }}
         />


        <Stack.Screen
        name="pestanas" 
        component={PetañaScreen}
        options={{
          
          headerShown: false,
          
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
        options={{ headerStyle: { backgroundColor: '#d3afd4', },
          
          headerShown: false,
    
        }}
         />
       <Stack.Screen
        name="mapaScreen" 
        component={MapScreen}
        options={{ headerStyle: { backgroundColor: '#d3afd4', },
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
        options={{ headerStyle: { backgroundColor: '#d3afd4', },
          headerShown: false,
        }}
         />






        </Stack.Navigator>
  ) 
}

 const styles = StyleSheet.create({
 

 })