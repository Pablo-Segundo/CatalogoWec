import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList } from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card , Button} from 'react-native-paper';
import { Actionsheet, Box, useDisclose , useToast, Modal } from 'native-base';
import Carousel from 'react-native-snap-carousel';


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
  const { isOpen, onOpen, onClose } = useDisclose();
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
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
    navigation.navigate('Shopping', { quantity, ProductName: product.name, price: product.price, multimedia: product.multimedia });
  };

  const addToCart = async (product: Product, quantity: number, price: number, multimedia: Multimedia[]) => {
    if (!quantity) quantity = 1;
    const cartArray = await AsyncStorage.getItem('cart');
    let cart = [];

    const cartItem = {
      product_id: product,
      quantity,
      _id: product._id,
      price: product.price,
      multimedia: product.multimedia ,
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
     <TouchableOpacity onPress={onOpen} style={styles.container}>
      <Card style={styles.container}>
        <Image style={styles.productImage} source={{ uri: product.multimedia[0].images['400x400'] }} />

        <Text style={styles.productname}>{product.name}</Text>

        <Text style={styles.textgray}>Disponible: {product.quantity}</Text>
        <Text style={styles.productPrice}>${product.price} </Text>
        <View style={styles.quantityContainer}>

          <TouchableOpacity onPress={decrementQuantity}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>

         <TouchableOpacity onPress={onOpen} style={styles.buyButton}>
            <Text style={styles.textWhite}>Agregar al carrito </Text>
         </TouchableOpacity>

        </Card>

          <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
      <View style={styles.productItem}>
        
           {/* <Carousel
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
          />   */}

        <FlatList
          data={product.multimedia}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={{ width: Dimensions.get('window').width, backgroundColor:'black', height:'100%'}} onPress={() => (index)}>
              <Image
                style={{width: '100%', height:'100%', resizeMode: 'contain'}}
                source={{ uri: item.images['400x400'] }}
              />
            </TouchableOpacity>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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

         <TouchableOpacity style={styles.buyButton} onPress={() => {
           addToCart(product, quantity, product.price, product.multimedia );
           toast.show({
            render: () => {
              return(
                <Box bg="emerald.500" px="8" py="5" rounded="sm" mb={5}  zIndex={999}
                >
                  producto Agregado al carrito u
                </Box>
              );
            },
            placement: 'top',
           });
         }}>
             <Text style={styles.textWhite}>Agregar al carrito </Text>
         </TouchableOpacity>


          </View>
        </View>

        </Actionsheet.Content>
    </Actionsheet>
    </TouchableOpacity>

    </>
  );
};



const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    marginBottom: 10,


  },
  textgray: {
    color: 'gray',
  },
  cardcontainer: {
    height: '15%',
  },

  productItem: {
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


  },
  buyButton: {
    backgroundColor: '#ff1493',
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 15,
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
    borderColor: '#ff1493'
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
    marginBottom: 10,
    borderRadius:70,
    borderColor: '#ff1493'
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
  textWhite: {
      color: "#FFF",
      fontSize: 15,
      fontWeight: "bold",
    },
    cardImage: {
      width: 300,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: 190,

    
    
      marginRight: 10

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
    image:{
      resizeMode:'cover',
      height: 500,
      width: Dimensions.get('screen').width,
    }

});