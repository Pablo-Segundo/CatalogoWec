import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-paper';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';


// interface Props {
//   product: Product;
//   route: any;
// }

// export const ShoppingScreen = ({ route }: Props) => {
  export const ShoppingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [quantity, ProductName] = useState();

  const cartShopping = async() => {
    try {
         await AsyncStorage.setProducts();

    }catch (error) {
  
    }
  }

  // const { quantity, ProductName } = route.params;



  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>WAPIZIMA</Text>
        <TouchableOpacity
          style={styles.shoppingCartButton}
          onPress={() => navigation.navigate('Shopping', {})}
        >
          <View style={styles.shoppingCartIcon}>
            <Icon name="shopping-cart" size={30} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
      

      <TouchableOpacity style={styles.cardContainer} >
      <Card style={styles.cardContainer} onPress={() => navigation.navigate('datos')}>
        <Text style={styles.headerText}>Agregue su dirección </Text>
      </Card>
      </TouchableOpacity>
      

      
      

       <Text> hola uwu</Text>

   

     
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer:{
    height: '20%',
    display: 'flex',
    flexDirection: 'column',

  },
  productname:{
    fontSize: 15,
    fontWeight: 'bold',
    color:'black',
    marginVertical: 20,

  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    color:'black',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rowText: {
    fontSize: 14,
    color: 'black'
  },
  buyButton: {
    backgroundColor: '#D3AFD4',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  TextContainer: {
    color: 'black',
    position: 'absolute',
    top: 20,
    left: 25,
    zIndex: 1,
  },
  IconContainer: {
    position: 'absolute',
    top: 15,
    right: 25,
    zIndex: 1,
  },
  IconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  style:{
    height: '10%',
      backgroundColor: '#D3AFD4',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#D3AFD4',
  },

  shoppingCartButton: {
    marginRight: 10,
  },
  shoppingCartIcon: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#FFF',
  },

});