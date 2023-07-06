import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState } from "react";
import { Card } from 'react-native-paper';


export const TarjetaScreen = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");


  const handleCardNumberChange = (text) => {
    setCardNumber(text);
  };
  const handleExpirationDateChange = (text) => {
    setExpirationDate(text);
  };
  const handleSecurityCodeChange = (text) => {
    setSecurityCode(text);
  };
  const handleContinue = () => {
  }
   
  return (
    <>
      
      <Card style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Tarjeta de crédito</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de tarjeta"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de vencimiento (MM/AA)"
          value={expirationDate}
          onChangeText={handleExpirationDateChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Código de seguridad"
          value={securityCode}
          onChangeText={handleSecurityCodeChange}
        />
      </Card>
      <TouchableOpacity style={styles.buyButton} onPress={handleContinue}>
        <Text style={styles.buyButtonText}>Continuar</Text>
      </TouchableOpacity>
    </>
  );
};



const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: "#FF5C77",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 20,
    alignSelf: "center",
  },
  buyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});