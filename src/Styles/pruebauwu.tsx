import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecommendationsScreen = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Obtiene y muestra las recomendaciones basadas en productos almacenados localmente
    getRecommendationsFromStorage();
  }, []);

  const getRecommendationsFromStorage = async () => {
    try {
      // Obtén productos almacenados localmente
      const storedProducts = await AsyncStorage.getItem('storedProducts');
      const products = storedProducts ? JSON.parse(storedProducts) : [];

      // Genera recomendaciones basadas en los productos almacenados
      const recommendations = generateRecommendations(products);

      // Actualiza el estado con las recomendaciones
      setRecommendations(recommendations);
    } catch (error) {
      console.error('Error al obtener recomendaciones: ', error);
    }
  };

  const generateRecommendations = (products) => {
    // Implementa lógica para generar recomendaciones basadas en los productos almacenados
    // Puede ser un algoritmo personalizado que tome en cuenta las preferencias del usuario, productos similares, etc.
    // Devuelve un array de objetos que representan productos recomendados.
    return []; // Aquí deberías implementar la lógica real
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{`$${item.price.toFixed(2)}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recommendations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemContainer: {
    width: 150,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },
  productImage: {
    width: 120,
    height: 120,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginTop: 4,
  },
});

export default RecommendationsScreen;


import React, { useState, useEffect } from 'react';

// ...

const YourComponent = () => {
  const [state, setState] = useState({
    // Tu estado inicial
  });

  // ...

  useEffect(() => {
    // Calcula el precio total con descuento cada vez que cambie el carrito o el cupón
    const totalPriceWithDiscount = calculateTotalWithDiscount(state.cart, state.coupon);
    setTotalPrice(totalPriceWithDiscount);
  }, [state.cart, state.coupon]);

  // ...

  const applyCoupon = async (coupon: string) => {
    if (isCouponApplied) {
      Toast.show({
        type: 'info',
        text1: 'Cupón ya aplicado',
        text2: 'El cupón ya se ha aplicado a tu pedido.',
      });
      return;
    }

    try {
      const response = await API.get(`/coupons/code/${coupon}`);
      if (response.status === 200) {
        const couponData = response.data.coupon;

        // Actualiza el estado con el cupón aplicado
        setState((prevState) => ({
          ...prevState,
          cart: prevState.cart, // Mantén el carrito igual
          coupon: couponData, // Actualiza el cupón
        }));

        Toast.show({
          type: 'success',
          text1: `Cupón aplicado del: ${couponData.discount}% `,
          text2: `Se ha aplicado un descuento de ${prevState.totalPrice - totalPriceWithDiscount} MNX.`,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Cupón inválido',
          text2: 'El código de descuento no es válido.',
        });
      }
    } catch (error) {
      console.log('Error al verificar el cupón:', error);
      Toast.show({
        type: 'error',
        text1: 'Error al verificar el cupón',
        text2: 'Ocurrió un problema al verificar el cupón. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  };

  // ...

  return (
    // JSX de tu componente
  );
};

export default YourComponent;




