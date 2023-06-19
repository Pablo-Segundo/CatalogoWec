import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductCard } from '../components/ProductCard';
import { Card, Button } from 'react-native-paper'
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import {   Box, Center, NativeBaseProvider } from "native-base";
import { useToast } from 'native-base';
import { Image } from 'react-native-svg';




// interface Props {
//   product: Product;
//   route: any;
// }

// export const ShoppingScreen = ({ route }: Props) => {
  export const ShoppingScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1);
    const [cart1, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0); 
    const toast = useToast();

  
    const cartShopping = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      const parsedCart = JSON.parse(storedCart);
      let total = 0;
      let productCount = 0; 
      parsedCart.forEach(item => {
        total += item.quantity * item.product_id.price;
        productCount += item.quantity; 
      });
      setCart(parsedCart);
      setTotalPrice(total);
      setTotalProducts(productCount); 
    };
  
    useEffect(() => {
      cartShopping();
    }, []);


    const deleteData = (index) => {
      const updatedCart = [...cart1];
      const deletedProduct = updatedCart[index];
      const updatedPrice = deletedProduct.quantity * deletedProduct.product_id.price;
  
      updatedCart.splice(index, 1);
  
      AsyncStorage.setItem('cart', JSON.stringify(updatedCart))
        .then(() => {
          setCart(updatedCart);
          setTotalPrice(totalPrice - updatedPrice);
          setTotalProducts(totalProducts - deletedProduct.quantity); 
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
            <Text style={styles.headerText}> Cantidad:</Text>
            <Text style={styles.headerText}> Precio: </Text>
          
          </View>
          <FlatList
            data={cart1}
            renderItem={({ item, index }) => (
              <View style={styles.container}>
                <View style={styles.tableRow}>
                 
                  <Text style={styles.rowText}>{item.product_id.name}</Text>
                  <Text style={styles.rowText}>( {item.quantity} ) X </Text>
                  <Text style={styles.rowText}>${item.price} </Text>
                  

                  <TouchableOpacity onPress={() => deleteData(index)}>
                    <Text style={styles.textelimit}>Eliminar</Text>

                  </TouchableOpacity>


                </View>
               </View>
            )}
          />

            <Card>
     <View>
    
      <Text style={styles.headerText}>Productos: ({totalProducts})</Text>
      <Text style={styles.headerText}>Total: ${totalPrice}</Text>
    </View>


   

    <View>
      <TextInput
        style={styles.discountCodeInput}
        placeholder="Código de descuento"
      
      />

    

      <Button
        onPress={() => {
          toast.show({
            render: () => {
              return (
                <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                  hola uwu
                </Box>
              );
            },
          });
        }}
        >
        comprar
      </Button>
    </View>
  </Card>
  
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
        color:'#1e90ff',
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
      discountCodeInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        
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
