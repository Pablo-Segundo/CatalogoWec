import * as React from 'react';
import { Text, View,Button, StyleSheet } from 'react-native';

import { NavigationTab } from './NavigationT';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PetañaScreen } from '../Products/1PestañasProduc';
import { ShoppingScreen } from '../Screens/shoppingcart';
// import { productsScreen } from '../Screens/products';



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
        name="shopping" 
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
         name="Products"
         component={ShoppingScreen}
         options={{
          
          headerShown: false,
         }}

        />
       
           



        </Stack.Navigator>
  ) 
}

 const styles = StyleSheet.create({
 

 })