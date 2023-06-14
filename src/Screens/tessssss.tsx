import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductCard } from '../components/ProductCard';
import { Card } from 'react-native-paper'
import { err } from 'react-native-svg/lib/typescript/xml';


export const ShoppingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const cartShopping = async () => {
    const storedCart = await AsyncStorage.getItem('cart');
    const parsedCart = JSON.parse(storedCart);
    let total = 0;
    parsedCart.forEach(item => {
      total += item.quantity * item.product_id.price;
    });
    setCart(parsedCart);
    setTotalPrice(total);
  };
  useEffect(() => {
    cartShopping();
  }, []);
  


  const deleteData = (index) => {
    const updatedCart = [...cart];
    const deletedProduct = updatedCart.splice(index, 1)[0];
    const updatedPrice = deletedProduct.quantity * deletedProduct.product_id.price;
    AsyncStorage.setItem('cart', JSON.stringify(updatedCart))
      .then(() => {
        setCart(updatedCart);
        setTotalPrice(totalPrice - updatedPrice);
        
      })
      .catch(error => {
       
      });
  };
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>WAPIZIMA</Text>
        <TouchableOpacity
          style={styles.shoppingCartButton}
          onPress={() => navigation.navigate('Shopping')}
        >
          <View style={styles.shoppingCartIcon}>
            <Icon name="shopping-cart" size={30} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.headerText}>Productos agregados </Text>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Nombre: </Text>
          <Text style={styles.headerText}>Cantidad:</Text>
          <Text style={styles.headerText}>Precio: </Text>
        </View>
        <FlatList
          data={cart}
          renderItem={({ item, index }) => (
            <View style={styles.container}>
              <View style={styles.tableRow}>
                <Text style={styles.rowText}>{item.product_id.name}</Text>
                <Text style={styles.rowText}>{item.quantity}</Text>
                <Text style={styles.rowText}>{item.product_id.price}</Text>
                <TouchableOpacity onPress={() => deleteData(index)}>
                  <Text style={styles.textelimit}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View>
          <Text style={styles.headerText}>Precio total: {totalPrice}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>
        </View>
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
      textelimit: {
        color: 'black',
      },
      headerText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        padding: 5,
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
        padding: 20,
        backgroundColor: '#FFF',
      },
      cardContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
      },
      card: {
        height: '50%',
      
      
        
        
      },
      table: {
        marginBottom: 16,
      },
      tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        color: 'black',
      },
      tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      
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