import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import BottomSheet from "react-native-gesture-bottom-sheet";
import Carousel from 'react-native-snap-carousel';
import { Card , Button} from 'react-native-paper';
import { Box, useToast } from 'native-base';
import RBSheet from "react-native-raw-bottom-sheet";



interface Props {
  product: Product;
  route: any;
}

export const ProductCard = ({ product }: Props) => {
  const navigation = useNavigation();
  const bottomSheet = useRef();
  const [quantity, setQuantity] = useState(0);
  const toast = useToast();
  const refRBSheet = useRef();


  const [selectedImageIndex, setSelectedImageIndex] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const navigateToShoppingScreen = () => {
    navigation.navigate('Shopping', { quantity, ProductName: product.name, price: product.price, image:product.multimedia });
  };

  const addToCart = async (product: Product, quantity: number, price: number,  ) => {
    if (!quantity) quantity = 1;
    const cartArray = await AsyncStorage.getItem('cart');
    let cart = [];
     

    // Alert.alert('Producto Agregado', 'El producto ha sido agregado al carrito.');

    const cartItem = {
      product_id: product,
      quantity,
      _id: product._id,
      price: product.price,
  
     
    };

    if (cartArray) {
      cart = JSON.parse(cartArray);
      const productExists = cart.find((item) => item.product_id._id === product._id);

      if (productExists) {
        const index = cart.findIndex((item) => item.product_id._id === product._id);
        cart[index].quantity = quantity;
      } else {
        cart.push(cartItem);
      }
    } else {
      cart.push(cartItem);
    }
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  };
    
  const handleImagePress = (index: number) => {
    if (selectedImageIndex === index) {
      setSelectedImageIndex(-1);
      setIsImageSelected(false);
    } else {
      setSelectedImageIndex(index);
      setIsImageSelected(true);
    }
  };
  
    
  return (
    <>
      <Card style={styles.container}>
        <Image style={styles.productImage} source={{ uri: product.multimedia[0].images['400x400'] }} />
        <Text style={styles.productname}>{product.name}</Text>
        <Text style={styles.textgray}>Disponible: {product.quantity}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrementQuantity}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>${product.price} </Text>

     
        {/* <TouchableOpacity style={styles.buyButton} onPress={() => bottomSheet.current.show()}>
          <Text style={styles.buyButtonText}>Ver Detalles</Text>
        </TouchableOpacity> */}

         {/* <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}> */}
      
        

        <TouchableOpacity style={styles.buyButton} onPress={() => refRBSheet.current.open()}>
          <Text style={styles.buyButtonText}>Ver Detalles</Text>
        </TouchableOpacity>

      </Card>

      <RBSheet  ref={refRBSheet}  height={600}  closeOnDragDown={true}
        closeOnPressMask={true} >
     
        <View style={styles.productItem}>
          <Text style={styles.text1}>products </Text>

          <Carousel
            data={product.multimedia}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleImagePress(index)}>
                <Image
                  style={index === selectedImageIndex ? styles.largeCardImage : styles.cardImage}
                  source={{ uri: item.images['400x400'] }}
                />
              </TouchableOpacity>
            )}
            sliderWidth={600}
            itemWidth={selectedImageIndex === 0 ? 400 : 300}
            loop={true}
            autoplay={true}
            autoplayInterval={2000}
          />

          <View style={styles.productContainer}>
            <Text style={styles.productname}>{product.name}</Text>
            <Text style={styles.productname}> Disponible: {product.quantity} </Text>
            <Card style={styles.cardcontainer}>
              <Text style={styles.Textcard}>{product.description}</Text>
            </Card>

            
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decrementQuantity}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={incrementQuantity}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
             
            <Button onPress={() => { addToCart(product, quantity, product.price)
      toast.show({
        render: () => {
          return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                  Hello! Have a nice day
                </Box>;
        }
      });
    }}>
        Agregar al carrito 
      </Button>
      

           
          {/* // <TouchableOpacity
          //   style={styles.buyButton}
          //   onPress={() => addToCart(product, quantity, product.price)}
          // >
          //   <Text style={styles.buyButtonText}>Agregar al Carrito </Text>
          // </TouchableOpacity> */}

          </View>
        </View>
      {/* </BottomSheet> */}
      </RBSheet>
    </>
  );
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
  textgray: {
    color: 'gray',
  },
  cardcontainer: {
    height: '35%',
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
    paddingHorizontal: 15,
          

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
    },
    largeCardImage: {
      width: 320,
      height: 320,
      resizeMode: 'contain',
  
    },
  

});
