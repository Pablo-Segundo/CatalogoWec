import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Button } from 'react-native-paper';
import { useToast, Modal, useDisclose } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCreditCard, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

interface Props {
  product: Product;
  route: any;
}

export const ShoppingScreen = ({ product }: Props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const [cart1, setCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose} = useDisclose(); 
  const [datosGuardados, setDatosGuardados] = useState(null);
  
  const [selectedOption, setSelectedOption] = useState(null);



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

    const obtenerDatosGuardados = async () => {
      try {
        const datosGuardados = await AsyncStorage.getItem('datos');
        if (datosGuardados) {
          const datosParseados = JSON.parse(datosGuardados);
          const ultimoDatoGuardado = datosParseados[datosParseados.length - 1];
          setDatosGuardados(ultimoDatoGuardado);
        }
      } catch (error) {
        console.log('Error al obtener los datos guardados:', error);
      }
    };
  
    obtenerDatosGuardados();
  }, []);

  const decrementQuantity = (index) => {
    const updatedCart = [...cart1];
    const updatedProduct = updatedCart[index];
    if (updatedProduct.quantity > 1) {
      updatedProduct.quantity -= 1;
      const updatedPrice = updatedProduct.product_id.price;
      AsyncStorage.setItem('cart', JSON.stringify(updatedCart))
        .then(() => {
          setCart(updatedCart);
          setTotalPrice(totalPrice - updatedPrice);
          setTotalProducts(totalProducts - 1);
        })
        .catch(error => {});
    }
  };
  const incrementQuantity = (index) => {
    const updatedCart = [...cart1];
    const updatedProduct = updatedCart[index];
    updatedProduct.quantity += 1;
    const updatedPrice = updatedProduct.product_id.price;;
    AsyncStorage.setItem('cart', JSON.stringify(updatedCart))
      .then(() => {
        setCart(updatedCart);
        setTotalPrice(totalPrice + updatedPrice);
        setTotalProducts(totalProducts + 1);
      })
      .catch(error => {});
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


  const handleContinuar = () => {      
    {totalProducts}
    AsyncStorage.setItem('cart', JSON.stringify(cart1))
      .then(() => {  
        navigation.navigate('tarjetaScreen');
      })
      .catch(error => {
        console.error('Error al guardar en AsyncStorage:', error);
      });
  };

  const handleDeleteAll = () => {
    AsyncStorage.removeItem('cart')

    .then(() => {
      setCart([]);
      setTotalPrice(0);
      setTotalProducts(0);
    })
    .catch(error => {
      console.error('Error al borrar el carrito uwu:', error);
    });
};



  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerWITHE}>Carrito de compras </Text>

         {/* <TouchableOpacity style={styles.shoppingCartButton} onPress={() => navigation.navigate('Shopping')}>
          <View style={styles.shoppingCartIcon}>
            <Icon name="shopping-cart" size={30} color="#000" />
          </View>
        </TouchableOpacity> */}
        <View> 
        <TouchableOpacity  onPress={() => navigation.replace('mapaScreen', {owner:' '})}>
          <Card style={styles.cardcontainer}> 
          <View>
            {datosGuardados && (
              <Text style={styles.textgray}>Enviar a: {datosGuardados.nombre}</Text>
            )}
          </View>
            </Card>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.headerText}>Productos agregados  ({totalProducts}) </Text>

        {/*<View style={styles.tableHeader}>
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
                  </View>

                <View style={styles.rowContainer}>
                <Text style={styles.rowText}>( {item.quantity} ) X </Text>
                <Text style={styles.productPrice}>${item.price} </Text>
                  </View> 

                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decrementQuantity(index)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => incrementQuantity(index)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => deleteData(index)}>
                  <Text style={styles.textelimit}>Eliminar </Text>
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
            {/* <TextInput style={styles.discountCodeInput} placeholder="Código de descuento" /> */}

           
            <TouchableOpacity style={styles.buyButton} onPress={() => setShowModal(true)}>
        <Text style={styles.headerTextWhite}>Continuar</Text>
       </TouchableOpacity>
   
        <TouchableOpacity style={styles.buyButton} onPress={handleDeleteAll}>
           <Text style={styles.headerTextWhite}>Vaciar carrito  </Text>
        </TouchableOpacity>


           <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="500px">
        <Modal.CloseButton />
        <Modal.Header>Método de Pago</Modal.Header>
        <Modal.Body>
          <TouchableOpacity
            style={[
              styles.buyButtonText,
              selectedOption === 'Tarjeta' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect(' Tarjeta')}
          >
            <FontAwesomeIcon icon={faCreditCard} size={20} color="#000" />
            <Text style={styles.headerText}>Tarjeta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buyButtonText,
              selectedOption === 'PagoContraEntrega' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('PagoContraEntrega')}
          >
            <FontAwesomeIcon icon={faMoneyBill} size={20} color="#000" />
            <Text style={styles.headerText}>Pago contra entrega</Text>
          </TouchableOpacity>
        </Modal.Body>
        <TouchableOpacity onPress={handleContinuar} style={styles.buyButton}>
          <Text style={styles.headerTextWhite}>Continuar</Text>
        </TouchableOpacity>

      </Modal.Content>
    </Modal>
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
      headerTextWhite: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFF',
        padding: 2,
      }, 
      headerWITHE: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
        padding: 2,
      },
      textgray: {
        color: 'gray',
        fontSize: 18,
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
        backgroundColor: '#ff1493',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 25,
        marginHorizontal: 10,
       
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
        alignItems: 'center',
        borderWidth:1,
        padding: 10,
       marginBottom: 10,
        borderRadius:70,
        borderColor: '#ff1493'
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
        color: 'gray'
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
