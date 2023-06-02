
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';




interface Props {
  product:  Product;
}


export const ShoppingScreen = ({product}: Props) => {
  const navigation = useNavigation();
  const bottomSheet = useRef();
  


  return(
    <>
    <View>

        <Text style={styles.TextContainer}> WAPIZIMA</Text>
        <TouchableOpacity style={styles.IconContainer}
            onPress={() => navigation.navigate('shopping', { })}>
          <Icon name="shopping-cart" size={30} color="#000" />
        </TouchableOpacity>
        <View
          style={{
            height: '30%',
            backgroundColor: '#D3AFD4',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius:20,
     
          }}
        />


        <View>  
        <Text style={(styles.TextContainer)}> Productos añadidos</Text>
        </View>

          <View style={styles.container}>
            <Text>Productos  </Text>
            <Text style={styles.TextContainer}>{product.name}</Text>
            <Image style={styles.productImage} source={{ uri: product.multimedia[0].images['400x400'] }} />
            <Text style={styles.TextContainer}>{product.quantity}</Text>
          </View>

    </View>
    </>
  
    )}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 50,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: 130,
      resizeMode: 'cover',
      margin: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'NLACK',
      fontSize: 20,
      fontWeight: 'bold',
    },
    IconContainer: {
      position: 'absolute',
      top: 15,
      right: 25,
      zIndex: 1,
    },
    TextContainer: {
      color: 'black',
      position: 'absolute',
      top: 20,
      left: 25,
      zIndex: 1,
    },
    productItem: {
      margin: 10,
      alignItems: 'center',
    },
    productImage: {
      width: 150,
      height: 150,
      borderRadius: 10,
    },
    productname:{
      fontSize: 20,
      fontWeight: 'bold',
      color:'black',
      marginVertical: 10,
    },
    productPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      color:'#1e90ff',
      marginVertical: 10,
    },
  });