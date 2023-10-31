import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Image, Button } from 'react-native';
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import LoadingScreen from './Products/loadintgScreen';
import { CartReducer } from '../context/cart/CartReducer';


export const PaymentScreen = () => {
    const navigation = useNavigation();
    const [totalProducts, setTotalProducts] = useState(0);
    const [cart1, setCart] = useState(0);
    const [ setTotalPrice] = useState(0);
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    // const [securityCode, setSecurityCode] = useState("");

    const [publishableKey, setPublishableKey] = useState('');
    
    const route = useRoute();
    const { filteredProducts, totalPrice, selectedPaymentOption, discountProductsCart,filterdatos } = route.params;
    const { confirmPayment } = useStripe();



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
  }, []);

  const fetchPublishableKey = async () => {
    const key = await fetchKey("pk_test_51NNPllBsn6AXnSPi6VTNj1dg4eBhC4HCHadwxH1a4JNJ0Ffp3tqutylGB7mocT7tJAajQR8tV2p8xDtUNZvjfVXq00oKgyVEmy"); // fetch key from your server here
    setPublishableKey(key);
  };

//stripe-----------------------------------------------------------------

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
      }),
    });
    const {clientSecret} = await response.json();
    return clientSecret;
  };

  const handlePayPress = async () => {
    if (!card) {
      return;
    }
    const clientSecret = await fetchPaymentIntentClientSecret();
  };


   return(
    <>

<StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
    >
      <View>
        <Card style={styles.cardcontent}>
          <Text style={{color:'white', fontSize:20,   fontWeight: 'bold',}}> Total a pagar </Text>
          <Text style={{color: 'white', fontSize:20,   fontWeight: 'bold',}}>$ {totalPrice} MNX </Text>
        </Card>
       
  
      </View>


      <View>
        {/* <Text style={{color:'black', fontSize: 18, fontWeight: 'bold'}}> Productos Agregados</Text> */}
        <Card style={styles.cardContainer}>
          <Text style={{color:'black', fontSize: 20, fontWeight: 'bold'}} > Ingrese sus datos  </Text>
        </Card>
      </View>


      {/* <View style={{alignItems:'center', marginTop: 30, backgroundColor:'gray'}}>
        <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}> Tarjetas registradas </Text>
      </View> */}


      <View> 
        <TouchableOpacity>
          <Text> Agrege un opcion de pago </Text>


        </TouchableOpacity>

      </View>

     
   

  {/* <Text style={{color:'black', fontSize: 18,fontWeight: "bold",}}>Total a pagar </Text> */}

<Card style={{backgroundColor:'#e6e6fa', marginVertical: 15,marginHorizontal: 10  }}>  

<CardField
  postalCodeEnabled={true}
  placeholders={{
    number: '4242 4242 4242 4242',
  }}
  cardStyle={{
    backgroundColor: 'gray',
    textColor: 'white',
  }}
  style={{
    maxWidth: '100%',
    height: 50,
    marginVertical: 30,
  }}
  onCardChange={(cardDetails) => {
    console.log('cardDetails', cardDetails);
  }}
  onFocus={(focusedField) => {
    console.log('focusField', focusedField);
  }}
/>

<TextInput
  placeholder="Nombre del titular de la tarjeta"
  onChangeText={(name) => {
    console.log('Nombre del titular de la tarjeta:', name);
  }}
  style={{
    backgroundColor: 'gray',
    color: 'white',
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    
  }}
/>

    </Card> 

   <View>
      <CardField 
        onCardChange={(cardDetails) => console.log('cardDetails', cardDetails)}
      />
      <Button  onPress={handlePayPress} title="Pay"   />
   </View>

{/* <TouchableOpacity style={styles.buyButton}
   onPress={handlePayPress}
>
 <CardField 
        onCardChange={(cardDetails) => console.log('cardDetails', cardDetails)}
      />
        <Text style={styles.buyButtonText}>Continuar</Text>
      </TouchableOpacity>
     */}

<Card style={{marginTop: 15, marginHorizontal: 10}} >
        <Text style={{color:'black', fontSize:20,   fontWeight: 'bold',}}>Lista de productos </Text>
        <View> 
            <Text style={styles.rowText}>Productos filtrados prueba  </Text>
            <Text style={styles.rowText}>Precio total: ${totalPrice}</Text>
            <Text style={styles.rowText}>Metodo de pago: {selectedPaymentOption}</Text>
            <Text style={styles.rowText}>Datos filtrados : {filterdatos}</Text>
        </View>
       </Card> 
    



    </StripeProvider>
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
    buyButton: {
      backgroundColor: '#ff1493',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 50,
      marginHorizontal: 20
    },
    cardContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 10,
      padding: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginTop: 10
    },
    
    cardcontent: {
      backgroundColor: '#ff1493',
      paddingVertical: 30,
      borderRadius: 4,
      alignItems: 'center',
      marginTop: 30,
      marginHorizontal: 20
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
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowText: {
      fontSize: 14,
      color: 'black',
      fontWeight: 'bold',
      marginHorizontal: 10
    },


  });
