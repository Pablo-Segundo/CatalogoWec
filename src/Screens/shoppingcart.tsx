import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Image,  } from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Button } from 'react-native-paper';
import { useToast, Modal, useDisclose, Row } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCreditCard, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


interface Props {
  product: Product;
  route: any;
}

export const ShoppingScreen = ({ product  }: Props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const [cart1, setCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ totalProducts,setTotalProducts] = useState(0);
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

 const renderEmptyCart = () => {
      return (
        <View style={styles.emptyCartContainer}>
         

          <Text style={styles.emptyCartText}>Ningún producto agregado</Text>

          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Image source={require('../Navigators/assets/lottie/osuxd.png')} style={styles.exploreImage} />

            <Text style={styles.exploreButtonText}>Explorar y comprar productos</Text>
          </TouchableOpacity>
        </View>
      );
};



  return (
   
    <>
      <View style={styles.header}>

        <View style={styles.directiorow}>
        <TouchableOpacity >
        <Icon name="pencil" size={30} color="#fff" />
        </TouchableOpacity>
        <View style={styles.directiorow1}>
        <Text style={styles.headerWITHE}>Agregue su dirreción </Text>
        </View>
        
        </View>

         {/* <TouchableOpacity style={styles.shoppingCartButton} onPress={() => navigation.navigate('Shopping')}>
          <View style={styles.shoppingCartIcon}>
            <Icon name="shopping-cart" size={30} color="#000" />
          </View>
        </TouchableOpacity> */}

        <View > 
     
        <TouchableOpacity  onPress={() => navigation.replace('mapaScreen', {owner:' '})}>
          <View style={styles.viewuwu}>
          <Card style={styles.cardcontainer}> 
          <View>
            {datosGuardados && (
            
              <Text style={styles.textgray}> Enviar a:  {datosGuardados.nombre}  </Text>

            )}
          </View>
         
            </Card>
            <Image source={require('../Navigators/assets/lottie/icon/marcador.png')} style={styles.imagemap} />
          </View>
          </TouchableOpacity>     
        </View>
        
      </View>
   
           

      <View style={styles.container}>
        {totalProducts === 0 ? (
          renderEmptyCart()
        ) : (
          <>
            <View style={styles.tableRow}>
              <Text style={styles.headerText}>Productos agregados ({totalProducts})</Text>
              <TouchableOpacity style={styles.buyButton3} onPress={handleDeleteAll}>
                <Text style={styles.headerTextWhite}>Vaciar carrito</Text>
              </TouchableOpacity>
            </View>       
          </>
        )}
    
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
                <Text style={styles.rowText}>( {item.quantity} ) x </Text>
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

                  <TouchableOpacity style={styles.updateButton} onPress={() => deleteData(index)}>
                <Icon name="trash" size={30} color="#fff" />
              </TouchableOpacity>
                 
                </View>

               
                   
              
         

               
                </View>
              </View>
            </View>
          )}
        />

          <Card>
          <View style={{padding: 10, marginLeft: 10}}>
            <Text style={styles.headerText2}>Productos: ({totalProducts})</Text>
            <Text style={styles.headerText2}>Total: ${totalPrice}</Text>
          </View>

          <View> 
            {/* <TextInput style={styles.discountCodeInput} placeholder="Código de descuento" /> */}
            
            <TouchableOpacity style={styles.buyButton2} onPress={() => setShowModal(true)}>
        <Text style={styles.headerTextWhite}>Continuar</Text>
       </TouchableOpacity>

   


       <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="500px">
            <Modal.CloseButton style={styles.modalCloseButton} />
            <Modal.Header style={styles.modalHeader}>Método de pago</Modal.Header>
            <Modal.Body style={styles.modalBody}>
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  selectedOption === 'Tarjeta' && styles.selectedPaymentOption,
                ]}
                onPress={() => handleOptionSelect('Tarjeta')}
              >
                <FontAwesomeIcon icon={faCreditCard} size={25} color="#000" />
                <Text style={styles.paymentOptionText}>Tarjeta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  selectedOption === 'PagoContraEntrega' && styles.selectedPaymentOption,
                ]}
                onPress={() => handleOptionSelect('PagoContraEntrega')}
              >
                <FontAwesomeIcon icon={faMoneyBill} size={25} color="#000" />
                <Text style={styles.paymentOptionText}>Pago contra entrega</Text>
              </TouchableOpacity>
            </Modal.Body>
            <TouchableOpacity onPress={handleContinuar} style={styles.continueButton}>
              <Text style={styles.continueButtonText}>Continuar </Text>
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
      modalBodyWithMargin: {
        marginBottom: 20,
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
        backgroundColor: '#1E90FF',
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
        
        width: '95%',
        borderRadius: 15,
        justifyContent: 'center',
        marginTop: 15,
        flexDirection: 'row',
        padding: 25,
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
       
      },

      image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin: 10,
      },
      imagemap: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        margin: 5,
      },
      textelimit: {
        color: '#1e90ff',
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
      container: {
        flex: 1,
        padding: 5,
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
        paddingVertical: 2,
        borderRadius: 10,
        marginHorizontal: 1,
        marginVertical:5,
       justifyContent: 'center',
       alignItems: 'center'
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
        padding: 10,
        width: '85%'
      },
      viewuwu: {
        flexDirection: 'row',
       
      },
      cardcenter: {
        justifyContent: 'center',
        alignItems: 'center',
      }
    });
