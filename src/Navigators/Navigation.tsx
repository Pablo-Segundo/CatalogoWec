import * as React from 'react';
import { Text, View,Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//-
import HomeScreen from '../Screens/HomeScreen';
import prueba from '../Screens/prueba'
import Home from '../Screens/Home';
import HomeVentas from './ventasprueba/HomeVentas';




const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
        name="uwu" 
        component={HomeScreen}
        options={{ headerStyle: { backgroundColor: '#d3afd4', },
          tabBarLabel: 'Inico ' ,
          headerShown: true,
          tabBarIcon: ({color , size}) => (
            <MaterialCommunityIcons name="home-outline" color={'black'} size={size} />
          ),
        }}
        
         />
        <Tab.Screen 
        name="Compras" 
        component={prueba}
        options={{
          tabBarLabel: 'Compras ' ,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="basket-outline" color={'black'} size={size} />
          ),
        }}
        
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

 const styles = StyleSheet.create({
 

 })