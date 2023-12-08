import * as React from 'react';
import { NavigationTab } from './NavigationT';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductsScreen } from '../Screens/Products/ProductsScreen';
import { ShoppingScreen } from '../Screens/ShoppingCartScreen';
import { MapScreen } from '../components/Map';
import { Direction } from '../Screens/DirectionScreen';
import { PaymentScreen } from '../Screens/PaymentScreen';
import { FavoritesScreen } from '../Screens/Products/FavoritesScreen';
import { Dimensions } from 'react-native';
import { HeaderRight } from '../components/header/HeaderRight';
import { Ventanauwu } from '../Screens/Products/vantanauwu';
import { DatosPScreen } from '../Screens/DatosPScreen';
//import { Brands } from '../Styles/brands';
import { Brands } from '../Screens/Brands/Brands';
import { Recently } from '../components/Recently';
import { SearchScreen } from '../Screens/SearchScreen';



const Stack = createNativeStackNavigator()
export const Navigation = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        statusBarColor: '#E3087E',
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
        options={{
          headerShown: true,
          animation: 'slide_from_bottom',
          animationTypeForReplace: 'push',
        }}


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
        options={{
          headerShown: true,
          animation: 'slide_from_bottom',
          animationTypeForReplace: 'push',
        }}
      />
      <Stack.Screen
        name="ventana"
        component={Ventanauwu}

      />
      <Stack.Screen
        name="Datos"
        component={DatosPScreen}

      />
      <Stack.Screen
        name="Recently"
        component={Recently}

      />
      <Stack.Screen
        name='Search'
        component={SearchScreen}
        options={{
          headerShown: true,
          animation: 'slide_from_bottom',
          animationTypeForReplace: 'push',
          headerRight: props => {
            return <HeaderRight />;
          }
        }}
      />

      <Stack.Screen
        name="brands"
        component={Brands}
        options={{
          headerRight: props => {
            return <HeaderRight />;
          }
        }}

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


