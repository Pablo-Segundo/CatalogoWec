import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export const ShoppingScreen = () => {
  return(
    <View>
    <Text>hola </Text>
    
    </View>
  )
    

       


  

}
const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    productPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      color:'black',
      marginVertical: 10,
    },
    buyButton: {
      backgroundColor: '#ff69b4',
      padding: 10,
      borderRadius: 10,
    },
    buyButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    IconBarra: {
      flex: 1,
      paddingTop: 20, 
      paddingHorizontal: 10,
    },
    IconContainer: {
     position: 'absolute',
     top: 10, 
     right: 10,
     zIndex: 1,
    }

});
