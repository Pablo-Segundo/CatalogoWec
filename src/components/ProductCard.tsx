import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList } from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import { Actionsheet, Box, useDisclose, useToast } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { MdError, MdCheckCircle } from 'react-icons/md';
import { motion } from 'framer-motion';


interface Props {
  product: Product;
  updateCartCount: () => void;
  getCartItems: () => void;
 
}
export const ProductCard = ({ product,updateCartCount }: Props) => {
  const navigation = useNavigation();
  const bottomSheet = useRef();
  const [quantity, setQuantity] = useState(1);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [showModal, setShowModal] = useState(false);

  const [favorites, setFavorites] = useState([]);

  
  const removeFromCart = async (productId: string) => {
    const cartArray = await AsyncStorage.getItem('cart');
    let cart = [];
    if (cartArray) {
      cart = JSON.parse(cartArray);
      const newCart = cart.filter((item) => item.product_id._id !== productId);
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
      updateCartCount(); 
     
    }
  };
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
  const addToCart = async (product: Product, quantity: number, price: number, multimedia: Multimedia[]) => {
    if (quantity === 0) {
      
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Agregue al menos un prodcuto',
        
      });
    } else {
      
      Toast.show({
        type: 'success',
        text1: 'Producto agregado ',
        text2: 'El producto se ha agregado al carrito de compras',
      });
    }
    if (!quantity) quantity = 1;
    const cartArray = await AsyncStorage.getItem('cart');
    let cart = [];
    const cartItem = {
      product_id: product,
      quantity,
      _id: product._id,
      price: product.price,
      multimedia: product.multimedia,
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
   
    updateCartCount();
  };

  const navigateToFavorites = () => {
    navigation.navigate('Favorites');
  };




  const toggleFavorite = async (product) => {
    const favoriteArray = await AsyncStorage.getItem('favorites');
    let favorite = [];
    const favoriteItem = {
      quantity,
      _id: product._id,
      name: product.name,
      price: product.price,
      multimedia: product.multimedia,
    };
    if (favoriteArray) {
      favorite = JSON.parse(favoriteArray);
      const favoriteExists = favorite.find((item) => item._id === product._id);
      if (favoriteExists) {
        const index = favorite.findIndex((item) => item._id === product._id);
        favorite.splice(index, 1); 
      } else {
        favorite.push(favoriteItem);
      }
    } else {
      favorite.push(favoriteItem);
    }
    setFavorites(favorite); 
    await AsyncStorage.setItem('favorites', JSON.stringify(favorite));
  };

  const isInFavorites = () => {
    return favorites.some((item) => item._id === product._id);
  };

  
  return (
    <>
   <TouchableOpacity onPress={onOpen} style={styles.container}>
  <Card style={styles.cardContainer}>
    <Image style={styles.productImage} source={{ uri: product.multimedia[0].images['400x400'] }} />
    <View style={styles.favoriteContainer}>
    <TouchableOpacity onPress={() => toggleFavorite(product)} style={styles.favoriteButton}>
              <Icon
                name={isInFavorites() ? 'heart' : 'heart-o'}
                size={25}
                color={isInFavorites() ? 'red' : 'gray'}
              />
            </TouchableOpacity>
    </View>
    <Text style={styles.productName}>{product.name}</Text>
    <Text style={styles.textGray}>Disponible: {product.quantity}</Text>
    <Text style={styles.productPrice}>${product.price}</Text>
    <View style={styles.quantityContainer}>
      <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.addToCartButton} onPress={() => {
      addToCart(product, quantity, product.price, product.multimedia);
    }}>
      <Text style={styles.addToCartButtonText}>Agregar al carrito   </Text>
    </TouchableOpacity>
    {/* <TouchableOpacity style={styles.viewFavoritesButton} onPress={navigateToFavorites}>
      <Text style={styles.viewFavoritesButtonText}>Ver favoritos</Text>
    </TouchableOpacity>
   */}
  </Card>
</TouchableOpacity>


          <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
      <View>
      <FlatList
          data={product.multimedia}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={{ width: Dimensions.get('window').width, backgroundColor:'black', }} onPress={() => (index)}>
              <Image
                style={{width: '100%', height:'100%', resizeMode: 'contain'}}
                source={{ uri: item.images['400x400'] }}
              />
            </TouchableOpacity>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
          <View style={styles.productContainer}>
            <Text style={styles.productCard}>{product.name}</Text>
          </View>
            <Text style={styles.productName}> Disponoble:  {product.quantity} </Text>
            <Card style={styles.cardcontainer}>
              <Text style={styles.Textcard}>{product.description}</Text>
            </Card>
            <View style={styles.cardContainer}>
              <TouchableOpacity onPress={decrementQuantity}>
                <Text style={styles.quantityUwu}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={incrementQuantity}>
                <Text style={styles.quantityUwu}>+</Text>
              </TouchableOpacity>
            </View>

         <TouchableOpacity style={styles.buyButton} onPress={() => {
           addToCart(product, quantity, product.price, product.multimedia );
           toast.show({
            render: () => {
              return(
                <Box bg="emerald.500" px="8" py="5" rounded="sm" mb={1}  zIndex={999}
                >
                  producto Agregado al carrito
                </Box>
              );
            },
            placement: 'top',
           });
         }}>
             <Text style={styles.textWhite}>Agregar al carrito </Text>
         </TouchableOpacity>
          <Text>hola  </Text>
        </View>
        </Actionsheet.Content>
    </Actionsheet>
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
  badgeContainer: {
    position: 'absolute',
    top: 5,
    right: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textWhite: {
    color: '#f5fff',
    fontSize: 22,
    fontWeight: 'bold',
   
  },
  favoriteButton: {
    padding: 5,
    marginLeft: 20,
  },
  favoriteContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  favoriteMarker: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: 30,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  textgray: {
    color: 'gray',
    marginLeft: 15,
  },
  cardcontainer: {
    height: '20%',
  },

  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    justifyContent: 'center'
  },
  productName:{
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCard:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productPrice : {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#1E90FF',
    marginTop: 5,
  },
  buyButton: {
    backgroundColor: '#FF1493',
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
    borderColor: '#FF1493'
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
    //  marginTop: 10,
    // alignContent:'center',
    alignItems: 'center',
    display:'flex',
  },
  quantityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
    display:'flex',
    paddingVertical: 5,
    borderRadius: 25,
    marginBottom: 15,
  },
  quantityUwu: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 5,
  },

  quantityButton: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 30,
    color: 'black'
  },
  addToCartButton: {
    backgroundColor: '#ff1493',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  addToCartButtonText: { //uwu
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewFavoritesButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  viewFavoritesButtonText: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
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
      padding: 10,
    },
    Textcard: {
        fontSize: 17,
        // fontWeight: 'bold',
        color:'gray',
        marginVertical: 10,
    },
    largeCardImage: {
      width: 300,
      height: 300,
      resizeMode: 'contain',
    },
    image:{
      resizeMode:'cover',
      height: 500,
      width: Dimensions.get('screen').width,
    },
    cardContainer: {
      width: '95%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      padding: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textGray: {
      color: 'gray',
      marginTop: 5,
    },
});