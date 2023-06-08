import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-paper';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductCard } from '../components/ProductCard';

// interface Props {
//   product: Product;
//   route: any;
// }

// export const ShoppingScreen = ({ route }: Props) => {
  export const ShoppingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [quantity, ProductName] = useState();
const [cart1 ,setCart]= useState([]);

  const cartShopping = async() => {
      const  cart   =   await AsyncStorage.getItem('cart');
      setCart(JSON.parse(cart));
  }
  useEffect(() => {
    cartShopping();
  }, []);

  return (
    <>
  <View style={styles.header}>
    <Text style={styles.headerText}>WAPIZIMA</Text>
    <TouchableOpacity
      style={styles.shoppingCartButton}
      // onPress={() => navigation.navigate('Shopping', {})}
    >
      <View style={styles.shoppingCartIcon}>
        <Icon name="shopping-cart" size={30} color="#000" />
      </View>
    </TouchableOpacity>
  </View>
     
  <View style={styles.container}>
    

    

    <Text style={styles.headerText}>Productos</Text> 
    <FlatList
        data={cart1}
        renderItem={({ item }) => (
          <Text style={{color:'black'} }>
            {item.product_id.name}
          </Text>
      )}/>
  </View>
</>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#D3AFD4',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  shoppingCartButton: {
    marginRight: 10,
  },
  shoppingCartIcon: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    height: '15%',
  
   
    
    
  },
  table: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    color: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rowText: {
    fontSize: 14,
    color: 'black',
  },
  buyButton: {
    backgroundColor: '#D3AFD4',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  cardcontent: {
    backgroundColor: '#dcdcdc',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});