import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList } from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card , Button} from 'react-native-paper';
import { Actionsheet, Box, useDisclose , useToast, Modal } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';

interface Props {
  product: Product;
  route: any;
}

export const ProductCard = ({ product }: Props) => {
  const navigation = useNavigation();
  const bottomSheet = useRef();
  const [quantity, setQuantity] = useState(1);
  const toast = useToast();
  const refRBSheet = useRef();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [favorites, setFavorites] = useState<Product[]>([]);


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
    if (quantity === 0) {
      toast.show({
        render: () => {
          return (
            <Box bg="red.500" px="8" py="5" rounded="sm" mb={1} zIndex={999}>
              Agregue al menos un producto al carrito
            </Box>
          );
        },
        placement: 'top',
      });
    }else
    toast.show({
     render: () => {
       return(
         <Box bg="emerald.500" px="8" py="5" rounded="sm" mb={1}  zIndex={999}
         >
           producto Agregado al carrito uwu
         </Box>
       );
     },
     placement: 'top',
    });
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

  const navigateToFavorites = () => {
    navigation.navigate('Favorites', { favorites });
  };

  const toggleFavorite = async () => {
    const isFavorite = favorites.some((fav) => fav._id === product._id, product.multimedia);
    let updatedFavorites = [];
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav._id !== product._id, product.multimedia);
    } else {
      updatedFavorites = [...favorites, product];
    }
    setFavorites(updatedFavorites);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.log('Error al guardar los favoritos:', error);
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem('favorites');
        if (favoritesData) {
          setFavorites(JSON.parse(favoritesData));
        }
      } catch (error) {
        console.log('Error al cargar los favoritos:', error);
      }
    };
    loadFavorites();
  }, []);

  return (
    <>
   <TouchableOpacity onPress={onOpen} style={styles.container}>
  <Card style={styles.cardContainer}>
    <Image style={styles.productImage} source={{ uri: product.multimedia[0].images['400x400'] }} />
    <View style={styles.favoriteContainer}>
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Icon
          name={favorites.some((fav) => fav._id === product._id) ? 'heart' : 'heart-o'}
          size={25}
          color={favorites.some((fav) => fav._id === product._id) ? 'red' : 'gray'}
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
      <Text style={styles.addToCartButtonText}>Agregar al carrito</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.viewFavoritesButton} onPress={navigateToFavorites}>
      <Text style={styles.viewFavoritesButtonText}>Ver favoritos</Text>
    </TouchableOpacity>
  
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
            <Text style={styles.productName}> Disponible: {product.quantity} </Text>
            <Card style={styles.cardcontainer}>
              <Text style={styles.Textcard}>{product.description}</Text>
            </Card>
            <View style={styles.quantityCard}>
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
                  producto Agregado al carrito uwu
                </Box>
              );
            },
            placement: 'top',
           });
         }}>
             <Text style={styles.textWhite}>Agregar al carrito </Text>
         </TouchableOpacity>
          
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
  productItem: {
   
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
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
    alignItems: 'center',
    // marginTop: 10,
    // alignContent:'center',
    display:'flex',
  },
  quantityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
    alignContent:'center',
    display:'flex',
    marginHorizontal: 50,
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