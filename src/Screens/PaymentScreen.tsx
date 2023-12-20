import { View, Alert, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Image, Button } from 'react-native';
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { CardField, useStripe } from '@stripe/stripe-react-native';

import LoadingScreen from '../components/loadintgScreen';
import { CartReducer } from '../context/cart/CartReducer';


export const PaymentScreen = () => {
  const navigation = useNavigation();
  const [totalProducts, setTotalProducts] = useState(0);
  const [cart1, setCart] = useState(0);
  const [setTotalPrice] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  // const [securityCode, setSecurityCode] = useState("");
  const [publishableKey, setPublishableKey] = useState('');
  const route = useRoute();
  const { filteredProducts, cart, totalPrice, selectedPaymentOption, discountProductsCart, filterdatos } = route.params;

  //-----------libreria card
  const [cardData, setCardData] = useState({});
  const { confirmPayment } = useStripe();

  const handleCreditCardChange = (formData) => {
    setCardData(formData);
  };

  const handlePayment = async () => {
    try {
      // Usa la información de la tarjeta para realizar el pago con Stripe
      const { paymentMethod, error } = await confirmPayment('CLIENT_SECRET_FROM_SERVER', {
        type: 'Card',
        billingDetails: {
          address: {
            city: 'City',
            country: 'Country',
            line1: 'Address Line 1',
            line2: 'Address Line 2',
            postalCode: '12345',
            state: 'State',
          },
          email: 'user@example.com',
          name: cardData.values.name, // Agrega el nombre del titular de la tarjeta
          phone: '1234567890',
        },
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Payment successful!');
      }
    } catch (e) {
      console.error('Error processing payment:', e);
    }
  };
  //-------------------




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
    const { clientSecret } = await response.json();
    return clientSecret;
  };
  const handlePayPress = async () => {
    if (!card) {
      return;
    }
    const clientSecret = await fetchPaymentIntentClientSecret();
  };


  return (
    <>

      <StripeProvider
        publishableKey={publishableKey}
        merchantIdentifier="merchant.identifier" // required for Apple Pay
      >
        <View>
          <Card style={styles.cardcontent}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}> Total a pagar </Text>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>$ {totalPrice} MNX </Text>
          </Card>
        </View>

        <View>
          <Card style={styles.cardContainer}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }} > Ingrese sus datos  </Text>
          </Card>
        </View>


        <View style={{ marginVertical: 25 }}>
          <CreditCardInput
          
            onChange={handleCreditCardChange}

            requiresName // Asegúrate de que el formulario incluya el campo de nombre
          />
          {/* O, si prefieres la versión Lite */}
          {/* <LiteCreditCardInput onChange={handleCreditCardChange} /> */}
          <View style={{ marginTop: 40, }}>
            <Button title="Pay with Stripe" onPress={handlePayment} />
          </View>

        </View>

        <View>
          {/* Mostrar detalles del carrito aquí */}
          {cart.map((item) => (
            <Text key={item.product_id} style={styles.rowText}>
              {item.product.name} - Cantidad: {item.quantity} - Precio: ${item.product.price}
            </Text>
          ))}
          {/* Mostrar el precio total y otros detalles si es necesario */}
          <Text style={styles.rowText}>Total a pagar: ${totalPrice}</Text>
        </View>



        {/* <Card style={{marginTop: 6, marginHorizontal: 10}} >
        <Text style={{color:'black', fontSize:20,   fontWeight: 'bold',}}>Lista de productos (prueba xd) </Text>
        <View>
            <Text style={styles.rowText}>Productos filtrados prueba  </Text>
            <Text style={styles.rowText}>Precio total: ${totalPrice}</Text>
            <Text style={styles.rowText}>Metodo de pago: {selectedPaymentOption}</Text>
            <Text style={styles.rowText}>Datos filtrados : {filterdatos}</Text>
        </View>
       </Card> */}






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
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 70,
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
