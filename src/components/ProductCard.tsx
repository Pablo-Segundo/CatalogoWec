import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from "react-native-gesture-bottom-sheet";
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';





interface Props {
    product:  Product;
}


export const ProductCard = ({product}: Props) => {
    const navigation = useNavigation();
    const bottomSheet = useRef();
    const [quantity, setQuantity] = useState(product.quantity);
    

    const incrementQuantity = () => {
      if ( quantity < product.quantity) {
        setQuantity(quantity + 1);
      }
    };

    const decrementQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

  return (
    <> 
       <Card  style={styles.container}>
                <Image style={styles.productImage} source={{ uri: product.multimedia[0].images['400x400'] }} />
                <Text  style={styles.productname}>{product.name}</Text>
                <Text>Disponible:{product.quantity}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
             
                <TouchableOpacity style={styles.buyButton} onPress={() => bottomSheet.current.show()}>
                <Text style={styles.buyButtonText}>Ver Detalles</Text>
                    </TouchableOpacity>
                </Card>

              


      <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}>
        <View style={styles.productItem}>
        <Text style={styles.text1}>products uwu </Text>
        <Carousel
          data={product.multimedia}
          renderItem={({ item }) => (
            <Image style={styles.cardImage} source={{ uri: item.images['400x400'] }} />
          )}
          sliderWidth={600} 
          itemWidth={300}
          loop={true}
          autoplay={true} 
          autoplayInterval={2000} 
        />
             
           

        <View style={styles.productContainer}>
          <Text style={styles.productname}>{product.name}</Text>
          <Text style={styles.productname}>Disponible: {product.quantity}</Text>

          
          <Text style={styles.Textcard}>{product.description}</Text>
         
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decrementQuantity()}>

                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{product.quantity}</Text>
                <TouchableOpacity onPress={() => incrementQuantity()}>
                  
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            
            <Text style={styles.productPrice}>${product.price}.mx</Text>
             
            {/* <Text style={styles.productname}>Disponible: {quantity}</Text>

            <Text style={styles.quantity}>{quantity}</Text>
      */}   
        



          <TouchableOpacity style={styles.buyButton} 
            onPress={() => navigation.navigate('shopping', {})}>
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>
          </View>      
      </View>
    </BottomSheet>
        
       </>
  )
};
const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    // container: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },

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
      
      fontSize: 15,
      fontWeight: 'bold',
      color:'black',
      marginVertical: 20,

    },
    productPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      color:'#1e90ff',
      marginVertical: 10,
      
    },
    buyButton: {
      backgroundColor: '#ff69b4',
      padding: 5,
      borderRadius: 5,
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
    },
    TextContainer: {
      color: 'black',
      position: 'absolute',
      top: 20,
      left: 25,
      zIndex: 1,
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
      paddingHorizontal: 10,
    },
    quantity: {
      color: "gray",
      fontSize: 16,
      fontWeight: 'bold',
      marginHorizontal: 10,
    },
    text1: {
        color: "gray",
        fontSize: 15,
        fontWeight: "bold",
      },
      cardImage: {
        width: 300,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: 170,
        resizeMode: 'cover',
        margin: 10,

      },
      productDescription: {
        fontSize: 16,
        marginBottom: 10,
      },
      productContainer: {
        padding: 20,
      },
      Textcard: {
          fontSize: 17,
          // fontWeight: 'bold',
          color:'gray',
          marginVertical: 10,
      }

});


