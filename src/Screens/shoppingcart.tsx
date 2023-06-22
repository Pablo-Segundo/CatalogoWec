import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Card, Button } from 'react-native-paper';
import { Box, Center, NativeBaseProvider } from 'native-base';
import { useToast, Modal, useDisclose,Actionsheet } from 'native-base';
import { Navigation } from '../Navigators/Navigation';

interface Props {
  product: Product;
  route: any;
}

export const ShoppingScreen = ({ product }: Props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const [cart1, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose} = useDisclose();

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

  const decrementQuantity = () => {
   
  };

  const incrementQuantity = () => {
   
  };

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
      .catch(error => {});
      
  };

  return (
    <>

     
      <View style={styles.header}>
        <Text style={styles.headerWITHE}>Carrito de compras </Text>
        
         {/* <TouchableOpacity style={styles.shoppingCartButton} onPress={() => navigation.navigate('Shopping')}>
          <View style={styles.shoppingCartIcon}>
            <Icon name="shopping-cart" size={30} color="#000" />
          </View>
        </TouchableOpacity>   */}

        <View> 
        <TouchableOpacity  onPress={() => navigation.navigate('upload')}>
          <Card style={styles.cardcontainer}> 
            <View>
            <Text> Selecciona tu direccion </Text>
            </View> 
            </Card>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.headerText}>Productos agregados  ({totalProducts}) </Text>

        {/* <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Nombre: </Text>
          <Text style={styles.headerText}> Cantidad:</Text>
          <Text style={styles.headerText}> Precio: </Text>
        </View> */}

        <FlatList
  data={cart1}
  renderItem={({ item, index }) => (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.multimedia[0].images['400x400'] }} />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.rowText}>{item.product_id.name}</Text>
            <Text style={styles.rowText}>( {item.quantity} ) X </Text>
            <Text style={styles.productPrice}>${item.price} </Text>
          </View>

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decrementQuantity}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => deleteData(index)}>
            <Text style={styles.textelimit}>Eliminar</Text>
          </TouchableOpacity>
        </View>
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
            <TextInput style={styles.discountCodeInput} placeholder="Código de descuento" />

            <Button onPress={() => setShowModal(true)}>Continuar</Button>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Método de Pago </Modal.Header>
                <Modal.Body>
                  <Button> Tarjeta </Button>
                  <Button> Pagos contra entrega </Button>
                </Modal.Body>
                <Modal.Footer>
                  <Center>
                    <Button onPress={() => navigation.navigate('mapaapi')}> Conntinuar </Button>
                  </Center>
                </Modal.Footer>
              </Modal.Content>
            </Modal>

            {/* <Button
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
            </Button> */}
          </View>
          </Card>
      </View>
    </>
  );
};

    const styles = StyleSheet.create({
      header: {
       
        padding: 30,
        backgroundColor: '#debdce',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
      },
      image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin: 10,
      },
      textelimit: {
        color: '#1e90ff',
      },
      headerText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        padding: 2,
      },      
      headerWITHE: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ff',
        padding: 2,
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
      tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        color: 'black',
      },
      productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color:'#1e90ff',
       
        
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
      quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
      quantityButton: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 15,
      },
      quantity: {
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
      },
      discountCodeInput: {
        borderWidth: 10,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      imageContainer: {
        width: 120,
        marginRight: 15,
      },
      detailsContainer: {
        flex: 1,
      },
      cardcontainer: {
        padding: 20,
      },
    });


