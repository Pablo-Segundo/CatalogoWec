import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from "react-native-paper";

export const TarjetaScreen = () => {
    const navigation = useNavigation();
    const [totalProducts, setTotalProducts] = useState(0);


    
   return(
    <>
    <View style={styles.header}>
    <Text style={styles.headerWITHE}>Pago con tarjeta   </Text>

    <TouchableOpacity
          style={styles.IconContainer}
          onPress={() => navigation.navigate('Shopping', {})}>
       <View style={styles.IconCircle}>
         <Icon name="shopping-cart" size={30} color="#000" />
         </View>
        </TouchableOpacity>
  </View>

<Card style={styles.cardcontainer}>
<Text style={styles.textRosa}>  Total a Pagar    </Text>
<Text>{totalProducts} </Text>
</Card>




 



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
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
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
      fontSize: 16,
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
      fontSize: 20,
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
    container: {
      flex: 1,
      padding: 20,
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
      paddingVertical: 5,
      alignItems: 'center',
      borderRadius: 20,
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
      flex: 1,
    },
    cardcontainer: {
      padding: 50,
      marginTop: 25,
      borderRadius: 35,
      
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
