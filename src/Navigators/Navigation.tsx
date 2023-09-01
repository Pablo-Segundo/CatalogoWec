import * as React from 'react';
import { NavigationTab } from './NavigationT';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ProductsScreen } from '../Screens/Products/ProductsScreen';
import { ShoppingScreen } from '../Screens/ShoppingCartScreen';
import { MapScreen } from '../components/Map';
import { Direction } from '../Screens/DirectionScreen';
import { PaymentScreen } from '../Screens/PaymentScreen';
import { FavoritesScreen } from '../Screens/Products/FavoritesScreen';
import { Dimensions } from 'react-native';
import { HeaderRight } from '../components/header/HeaderRight';
import { Ventanauwu } from '../Screens/Products/vantanauwu';

const Stack = createNativeStackNavigator()
export const Navigation = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        statusBarColor:'#E3087E',
        headerTitleStyle: { 
          fontSize: Dimensions.get('window').width / 20 
        },
        headerTitleAlign: 'center',
        headerTintColor: '#E3087E',
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Wapizima"
        component={NavigationTab}
        options={{
          headerShown: false,
         
        }}
      />

      <Stack.Screen
        name="Shopping"
        component={ShoppingScreen}
        

      />
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          headerRight: props => {
            return <HeaderRight />;
          }
        }}

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
        name="ventana"
        component={Ventanauwu}
       
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerRight: props => {
            return <HeaderRight favorites={true} />;
          }
        }}
      />
    </Stack.Navigator>
  )
}


