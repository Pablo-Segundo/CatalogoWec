import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { CardField, useStripe } from '@stripe/stripe-react-native';

export const PaymentForm = () => {
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

  return (
    <View>
      <CreditCardInput
        onChange={handleCreditCardChange}
        requiresName // Asegúrate de que el formulario incluya el campo de nombre
      />
      <Button title="Pay with Stripe" onPress={handlePayment} />
    </View>
  );
};
