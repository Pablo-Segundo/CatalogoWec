import * as React from 'react';
import { Text, View,Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
import { useNavigation } from '@react-navigation/native';



const Stack = createNativeStackNavigator()
export const Navigation = ()=> {
  const navigation = useNavigation();
  
  
  return (
    <Stack.Navigator>
           <Stack.Screen
              name="Wapizima"
              component={NavigationTab}
              options={{
                headerStyle: { backgroundColor: '#debdce' },
                headerTintColor: '#fff', 
                headerShown: true,
                headerTitleContainerStyle: { width: '100%', alignSelf: 'center'}, 
                headerRight: () => (
                  <TouchableOpacity
                    style={styles.IconContainer}
                    onPress={() => navigation.navigate('Shopping')}
                    // onPress={() => navigation.navigate('Shopping', { totalProducts: cartCount })}
                  >
                    <View style={styles.IconCircle}>
                      <Icon name="cart-outline" size={35} color="#000" />
                      {/* {cartCount > 0 && <ShoppingCartBadge count={cartCount} />} */}
                    </View>
                  </TouchableOpacity>
                ),
              }}
            />

           <Stack.Screen
        name="Shopping"
        component={ShoppingScreen}
        options={{ headerStyle: { backgroundColor: '#debdce'},
          headerShown: true ,
          
        }}
         />
        <Stack.Screen
        name="pestanas"
        component={PetañaScreen}
        options={{ headerStyle: { backgroundColor: '#debdce'},
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
        headerTintColor: '#fff', 
          headerShown: false ,
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

  IconContainer: {
    marginRight: 15,
  },
  IconCircle: {
    width: 45,
    height:  45,
    borderRadius: 25,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

 })

