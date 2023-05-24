import * as React from 'react';
import { Text, View,Button, StyleSheet } from 'react-native';

import { NavigationTab } from './NavigationT';
import { KistScreen } from '../Products/4Kits';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PetañaScreen } from '../Products/1PestañasProduc';
import { CejasScreen } from '../Products/2CejasProduc';
import { ShoppingScreen } from '../Screens/shoppingcart';

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
        name="pestañas" 
        component={PetañaScreen}
        options={{
          
          headerShown: false,
          
        }}
        />
        <Stack.Screen 
        name="Kits" 
        component={KistScreen}
        options={{
          headerShown: false,
        }}
        />
        {/* <Stack.Screen 
        name="Kits" 
        component={KistScreen}
        options={{
          headerShown: false,
        }}
        /> */}
           <Stack.Screen 
        name="Cejas" 
        component={CejasScreen}
        options={{
          headerShown: false,
        }}
        />



        </Stack.Navigator>
  ) 
}

 const styles = StyleSheet.create({
 

 })