import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { PaymentSheet,PaymentSheetProvider, usePaymentSheet } from '@stripe/stripe-react-native';
import { useRoute } from '@react-navigation/native';




export const TarjetaScreen = () => {
    const navigation = useNavigation();
    const [totalProducts, setTotalProducts] = useState(0);
    const [cart1, setCart] = useState(0);
    const [ setTotalPrice] = useState(0);
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [securityCode, setSecurityCode] = useState("");

    const [publishableKey, setPublishableKey] = useState('');
    

    const route = useRoute();
    const { filteredProducts, totalPrice, selectedPaymentOption, discountProductsCart,filterdatos } = route.params;



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
    fetchPublishableKey();
      // Stripe.setOptionsAsync({ publishableKey: 'codigo xd' });
  }, []);


  const handleCardNumberChange = (text) => {
    setCardNumber(text);
  };
  const handleExpirationDateChange = (text) => {
    setExpirationDate(text);
  };
  const handleSecurityCodeChange = (text) => {
    setSecurityCode(text);
  };



  const fetchPublishableKey = async () => {
    const key = await fetchKey();
    setPublishableKey(key);
  };


  const handleContinue = async () => {
    try {
     
      const cardDetails = {
        card: {
          number: cardNumber,
          expMonth: expirationDate.split('/')[0],
          expYear: expirationDate.split('/')[1],
          cvc: securityCode,
        },
      };
      // const paymentMethod = await stripe.createPaymentMethodAsync(cardDetails);
      setPaymentSheetEnabled(true);
    } catch (error) {
      console.error('Error creating payment method:', error);
     
    }
  };


   return(
    <>
    <View style={styles.header}>
    <Text style={styles.headerWITHE}>Pago con Tarjeta    </Text>

    {/* <TouchableOpacity
          style={styles.IconContainer}
          onPress={() => navigation.navigate('Shopping', {})}>
       <View style={styles.IconCircle}>
         <Icon name="shopping-cart" size={30} color="#000" />
         </View>
        </TouchableOpacity> */}
  </View>

<Card style={styles.cardcontainer}>
<Text style={styles.textRosa}>  Total a Pagar:   </Text>
<Text style={styles.headerText}>$ {totalPrice} </Text>
</Card>
 

  <View> 
    <Text style={styles.rowText}> Productos filtrados prueba  </Text>
    <View>
        {filteredProducts.map((product, index) => (
          <Text style={styles.rowText} key={index}>{product.product_id.name} - ${product.price}</Text>
        ))}
      </View>

      <Text style={styles.rowText}>Precio total: ${totalPrice}</Text>
      <Text style={styles.rowText}>Metodo de pago: {selectedPaymentOption}</Text>
      <Text style={styles.rowText}> Datos filtrados : {filterdatos}</Text>
      
  </View>



{/* <Card style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Tarjeta de crédito</Text>
        
        <TextInput
          style={styles.input}
          placeholderTextColor={'black'}
          placeholder="Número de tarjeta"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={'black'}
          placeholder="Fecha de vencimiento (MM/AA)"
          value={expirationDate}
          onChangeText={handleExpirationDateChange}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={'black'}
          placeholder="Código de seguridad"
          value={securityCode}
          onChangeText={handleSecurityCodeChange}
        />
  </Card> */}
     

<TouchableOpacity style={styles.buyButton} onPress={handleContinue}>
        <Text style={styles.buyButtonText}>Continuar</Text>
      </TouchableOpacity>
    
</>

    
   )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      },
      label: {
        fontSize: 16,
        marginBottom: 8,
      },
      detailsContainer: {
        backgroundColor: "#F5F5F5",
        padding: 10,
        margin: 10,
        borderRadius: 8,
      },
      detailsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: 'black',
        marginVertical: -30
      },
      input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: 'black'
      },
      buttonContainer: {
        marginTop: 16,
      },
      button: {
        backgroundColor: 'blue',
      },
  
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
      fontSize: 30,
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
      fontSize: 20,
      color: '#fff',
      padding: 2,
    },
    textRosa: {
      fontWeight: 'bold',
      color: '#debdce',
      fontSize: 25,
      alignItems: 'center'
    },
    shoppingCartButton: {
      marginRight: 10,
    },
    shoppingCartIcon: {
      padding: 5,
      borderRadius: 50,
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
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 50,
      marginHorizontal: 20
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
      borderColor: '#ff1493',
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
      padding: 60,
      marginTop: 25,
      borderRadius: 35,

    },
    cardcontainer: {
      padding: 30,
      marginTop: 5,
      borderRadius: 20,
      
    },
    IconCircle: {
        width: 45,
        height:  45,
        borderRadius: 25,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
      IconContainer: {
        position: 'absolute',
        top: 20,
        right: 30,
        zIndex: 1,
      },
  });
