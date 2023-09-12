import React, { useEffect, useState, useCallback,useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Image,  } from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Button } from 'react-native-paper';
import { useToast, Modal, useDisclose, Row, Actionsheet } from 'native-base'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartShopping, faCreditCard, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Toast}  from 'react-native-toast-message/lib/src/Toast';
import { CartContext } from '../context/cart/CartContext';

interface Props {
  product: Product;
  route: any;
}

export const ShoppingScreen = ({product} : Props) => {
  const route = useRoute();
  const navigation = useNavigation();
   const [quantity, setQuantity] = useState();
  // const [cart1, setCart] = useState(0);
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const { isOpen, onOpen, onClose} = useDisclose();
  const [datosGuardados, setDatosGuardados] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<'Tarjeta' | 'PagoContraEntrega' | null>(null);

  
  const {cart} = useContext(CartContext); 
  const {removeItemFromCart , clearCart, incrementQuantity, decrementQuantity, addToCart } = useContext(CartContext);
  const { totalProducts, totalPrice } = useContext(CartContext);
 


  const cartShopping = async () => {
    const storedCart = await AsyncStorage.getItem('cart');
 
  };

const filterdatos = async () => {
  try {
    const storedCart = await AsyncStorage.getItem('cart');
    if (storedCart) {
      const cart = JSON.parse(storedCart);

      
      const regularProductsCart = cart.filter(
        (item) =>
          item.product_id.category !== '62b0d1135911da2ebfdc92c3' && item.product_id.discount === 0
      
      );
      
      const discountProductsCart = cart.filter(
        (item) => item.product_id.discount > 0

      );
     
    
      const wapizimaCanvasCart = cart.filter(
        (item) => item.product_id.category === '62b0d1135911da2ebfdc92c3'
      );

     
      console.log('Productos normales :', regularProductsCart);
      console.log('Productos con descuento:', discountProductsCart);
      console.log('Wapizima Canvas :', wapizimaCanvasCart);
    }
  } catch (error) {
    console.log('Error al filtrar datos :', error);
  }
}


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
const fetchLatestData = useCallback(() => {
  obtenerDatosGuardados();
}, []); 
 
  return (
    <>
      <View style={styles.header}>
        <View style={styles.directiorow}>
        </View>
        <View >
        <TouchableOpacity  onPress={onOpen}>
        <View style={styles.viewuwu}>
            <View style={styles.cardcontainer}> 
            <Icon name="location-outline" size={30} color="black" />
            <Text style={styles.textblack}>Enviar a : 
              {datosGuardados && <Text style={styles.textgray}> {datosGuardados.nombre} , {datosGuardados.selectedAddress}  </Text>}
              </Text>
            </View>
          {/* <Image
            source={require('../Navigators/assets/lottie/icon/marcador.png')}
            style={styles.imagemap}
          /> */}
        </View>
      </TouchableOpacity>
        </View>
      </View>
     
            <View style={styles.tableRow}>
              <Text style={styles.headerText}>Productos agregados ({totalProducts})</Text>
              <TouchableOpacity style={styles.buyButton3} > 
                <Text style={styles.headerTextWhite}  onPress={clearCart}>Vaciar </Text>
              </TouchableOpacity>
            </View>
        
        <FlatList
          data={cart}
          //  <Text style={styles.rowText}>{item.product.name}</Text>
          //       <Text style={styles.rowText}>{item.product.price} </Text> 
          renderItem={({ item,  }) => (
            <Card >
            <View style={styles.rowContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri:item.product.multimedia[0].images['400x400'] }} />
              </View>
              <View >
                <View style={styles.tableRow}>
                <Text style={styles.rowText}>{item.product.name}</Text>
              
                {/* <Text  style={styles.rowText}>{item.product.quantity}</Text> */}
                </View>

              <View style={styles.rowContainer}>
              <Text style={styles.rowTextPrice}>{item.product.price} </Text> 
              <Text  style={styles.rowText}>( {item.quantity} )</Text>
                </View>

  

            <View style={styles.rowContainer}>
              <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => {decrementQuantity(item.product._id);  setQuantity(quantity - 1);  }}>
              <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                          onPress={() => {incrementQuantity(item.product._id);  setQuantity(quantity - 1);}}
                          disabled={item.quantity >= item.product.availableQuantity}>
                        <Text style={[styles.quantityButton, item.quantity >= item.product.availableQuantity && { opacity: 0.1 }]}>
                              +
                        </Text>
        </TouchableOpacity>   
              </View>

              <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.updateButton} 
                    onPress={() => removeItemFromCart(item.product._id)}>
                    <Icon name="trash-outline" size={30} color="#1E90FF"  />
                     </TouchableOpacity>
                </View>

              </View>
            </View>
            </View> 
          </Card>
          )}
        />
          <Card>
          <View style={{padding: 10, marginLeft: 5}}>
          <Text style={styles.headerText2}>Productos: {totalProducts}</Text>
        <Text style={styles.headerText2}>Total: ${totalPrice.toFixed(2)}</Text>


            <TextInput
              style={styles.directionInput}
              placeholder="codigo de descuento :"
              placeholderTextColor={'gray'}
            
            />

            <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
          <Modal.Content maxWidth="500px">
            <Modal.CloseButton style={styles.modalCloseButton} />
            <Modal.Header style={styles.modalHeader}>Agregue un codigo de descuento: </Modal.Header>
            <Modal.Body style={styles.modalBody}>
            </Modal.Body>
            <TouchableOpacity  style={styles.continueButton}>
              <Text style={styles.continueButtonText}>aplicar  </Text>
            </TouchableOpacity>
          </Modal.Content>
        </Modal>
          </View>
          <View>
          <TouchableOpacity    onPress={() => setShowModal(true)}   style={styles.buyButton2}>
        <Text style={styles.headerTextWhite}>Continuar</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity  style={styles.continueButton}  onPress={() => navigation.navigate('ventana')}>
            <Text style={styles.continueButtonText}> Prueba  </Text>
          </TouchableOpacity> */}

      

      {/* <TouchableOpacity onPress={filterdatos} style={styles.buyButton2}>
        <Text style={styles.headerTextWhite}>tesssst</Text>
      </TouchableOpacity> */}

       <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="500px">
            <Modal.CloseButton style={styles.modalCloseButton} />
            <Modal.Header style={styles.modalHeader}>Método de pago</Modal.Header>
            <Modal.Body style={styles.modalBody}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPaymentOption === 'Tarjeta' && styles.selectedPaymentOption,
              ]}
              onPress={() => handleOptionSelect('Tarjeta')}
            >
              <FontAwesomeIcon icon={faCreditCard} size={25} color="#000" />
              <Text style={styles.paymentOptionText}>Tarjeta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPaymentOption === 'PagoContraEntrega' && styles.selectedPaymentOption,
              ]}
              onPress={() => handleOptionSelect('PagoContraEntrega')}
            >
              <FontAwesomeIcon icon={faMoneyBill} size={25} color="#000" />
              <Text style={styles.paymentOptionText}>Pago Contra entrega </Text>
            </TouchableOpacity>
            </Modal.Body>

            <TouchableOpacity  style={styles.continueButton}>
            <Text style={styles.continueButtonText}> Continuar  </Text>
          </TouchableOpacity>
          </Modal.Content>
      </Modal>
          </View>
          </Card>
          

          <Actionsheet isOpen={isOpen} onClose={onClose}>
  <Actionsheet.Content>
    <Text style={{ color: '#ff1493', fontSize: 16, fontWeight: 'bold', flexDirection: 'column-reverse' }}>Agrega datos de dirección</Text>
    <Text style={{ color: 'gray' }}>Selecciona tu dirección o ingresa una nueva</Text>
    <View style={styles.rowContainer}>
      <Card style={styles.cards}>

      <TouchableOpacity  style={{ alignItems: 'center' }} onPress={() => navigation.navigate('mapaScreen', { owner: ' ' })}>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>Agrega b direccion </Text>
          <Icon name="map-outline" size={25} color="#ff1493" /> 
          </TouchableOpacity>
        {/* <TouchableOpacity style={styles.buyButton} onPress={() => navigation.navigate('mapaScreen', { owner: ' ' })}>
          <Text> Agregar una nueva dirección  </Text>
        </TouchableOpacity> */}
      </Card>

      <Card style={styles.cards}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity  style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Direction')}>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>Modificar direccion </Text>
          <Icon name="create-outline" size={25} color="#ff1493" /> 
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  </Actionsheet.Content>
</Actionsheet>




    </>
  );
};

    const styles = StyleSheet.create({
  
      header: {
        padding: 5,
        backgroundColor: '#ff69b4',
        // borderBottomLeftRadius: 50,
        // borderBottomRightRadius: 50,
      },
      viewuwu: {
        flexDirection: 'row',
      },  
     
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
      cards: {
        borderColor: 'gray',
        padding: 50,
        borderRadius: 8,
        flex: 1,
        maxHeight: 150,
        maxWidth: 200,
        marginHorizontal: 10
      },
    
      directionInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: 'white',
        color: 'black',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },

      directiorow: {
        flexDirection: 'row',
      },
      directiorow1: {
        flexDirection: 'row',
        paddingHorizontal: 20,
      },


      emptyCartContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      
      },
      updateButton: {
        padding: 5,
        borderRadius: 5,
        marginLeft: 50
      },
      exploreImage: {
        width: 30,
        height: 30,
        marginRight: 10,
      },
      emptyCartText: {
        fontSize: 30,
        marginBottom: 20,
        color: 'gray'
      },
      exploreButton: {
        flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
      },

      exploreButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray'
      },


      modalCloseButton: {
        
        marginRight: 10,
        padding: 10,
      },
      modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
      modalBody: {
        padding: 20,
      },
      paymentOption: {
        width: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'row',
        padding: 30,
        backgroundColor: '#fff',
        shadowColor: '#000',
        
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
      },
      selectedPaymentOption: {
        backgroundColor: '#F0F0F0',
      },
      paymentOptionText: {
        marginLeft: 10,
        fontSize: 16,
        color: 'black'
      },
      continueButton: {
        backgroundColor: '#ff1493',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginVertical: 15,
        marginHorizontal: 20,
        
      },
      continueButtonText: {
        color: '#fff',
        fontSize: 18,
       fontWeight: 'bold',
      },
   

      image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin: 10,
      },
   
      textblack: {
      color: 'black',
      
      fontSize: 18,
      },
      
      headerText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        padding: 17,
      },   
       headerText2: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        padding: 5,
      },   
         
      headerTextWhite: {
        fontWeight : 'bold',
        fontSize: 20,
        color: '#FFF',
        padding: 5,      
      }, 
      headerWITHE: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        padding: 2,
      },
      textgray: {
        color: 'black',
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
      rowTextPrice: {
        fontSize: 14,
        color: '#1E90FF',
      },


      buyButton: {
        backgroundColor: '#ff1493',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 25,
        marginHorizontal: 10,
      },

      buyButton2: {
        backgroundColor: '#ff1493',
        paddingVertical: 2,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical:15,
       justifyContent: 'center',
       alignItems: 'center'
      },
      buyButton3: {
        backgroundColor: '#ff1493',
        paddingVertical: 5,
        borderRadius: 10,
        marginHorizontal: 1,
        marginVertical:5,
       justifyContent: 'center',
       alignItems: 'center',
       marginRight: 20
      },
      
      cardcontent: {
        backgroundColor: '#dcdcdc',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
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
     borderTopColor: 'gray',
        borderRadius: 5,
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      imageContainer: {
        width: 130,
        marginRight: 5,
      },
   
      cardcontainer: {
        padding: 10,
        width: '75%',
      
       maxHeight: 65,
       flexDirection: 'row',
        
      },
     
   
    });
