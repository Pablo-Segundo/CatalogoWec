import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import API from "../API/API";
import Icon from 'react-native-vector-icons/FontAwesome';
 import { useNavigation } from "@react-navigation/native";



export const ShoppingScreen = () => {

  const navigation = useNavigation();
  return(
    <View>
        <Text style={styles.TextContainer}> WAPIZIMA</Text>
        <TouchableOpacity style={styles.IconContainer}
            onPress={() => navigation.navigate('shopping', { })}>
          <Icon name="shopping-cart" size={30} color="#000" />
        </TouchableOpacity>
        <View
          style={{
            height: '28%',
            backgroundColor: '#D3AFD4',
          }}
        />
    </View>
   
    


  )

}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 400,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: 170,
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
      color: '#fff',
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
    }
  });