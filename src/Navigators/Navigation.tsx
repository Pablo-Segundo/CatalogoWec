import * as React from 'react';
import { Text, View,Button, StyleSheet } from 'react-native';

import { NavigationTab } from './NavigationT';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PetañaScreen } from '../Products/ProductsScreen';
import { ShoppingScreen } from '../Screens/shoppingcart';
import { ShoppingTest } from '../Screens/shhoppinTEXT';
import { direction } from '../Screens/DireccionPerson';



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
        name="products"
        component={ShoppingTest}
        options={{
          headerShown: true,
        }}
        />

        <Stack.Screen
        name='datos'
        component={direction}
        options={{
          headerShown: false,
        }}
        />
           



        </Stack.Navigator>
  ) 
}

 const styles = StyleSheet.create({
 

 })