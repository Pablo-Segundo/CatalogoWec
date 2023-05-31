
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useRef } from 'react';
import { ScrollView } from 'native-base';


interface Props {
    product:  Product;
}


export const ProductCard = ({product}: Props) => {
    const navigation = useNavigation();
    const bottomSheet = useRef();
  return (
    <>
    <View style={styles.container}>
            <Image style={styles.productImage} source={{ uri: product.multimedia[0].images['400x400'] }} />
            <Text  style={styles.productname}>{product.name}</Text>
             <Text>Disponible:{product.quantity}</Text>
 
              <Text style={styles.productPrice}>${product.price}</Text>
             
            {/* <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decrementQuantity(index)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => incrementQuantity(index)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View> */}


               
             


                <TouchableOpacity style={styles.buyButton}  onPress={() => bottomSheet.current.show()} >
                <Text style={styles.buyButtonText}>Ver Detalles</Text>
                

                    </TouchableOpacity>


            <Image style={{width: 400, height:400}} source={{ uri: product.multimedia[0].images['400x400'] }}  />   
    


                </View>
                <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}>
                   
                    <View style={styles.productItem}>
                    <Text style={styles.text1} >products uwu </Text>
                    <Image style={styles.cardImage} source={{ uri: product.multimedia[0].images['400x400'] }} />
                    <Text  style={styles.productname}>{product.name}</Text>
                    
                    {/* <Image style={styles.productImage} source={{ uri: product.multimedia[1].images['400x400'] }} /> */}
                    {/* <Image style={styles.productImage} source={{ uri: product.multimedia[2].images['400x400'] }} />
                    <Image style={styles.productImage} source={{ uri: product.multimedia[3].images['400x400'] }} /> */}
                    <Text style={styles.text1}>{product.description}</Text>
                    <Text style={styles.productPrice}>${product.price}.Mx</Text>
               
                    <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={() => decrementQuantity(index)}>
                            <Text style={styles.quantityButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{product.quantity}</Text>
                            <TouchableOpacity onPress={() => incrementQuantity(index)}>
                            <Text style={styles.quantityButton}>+</Text>
                            </TouchableOpacity>
                        </View>











                    <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Comprar</Text>
                    

                    </TouchableOpacity>
                  
                
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

      }

});


