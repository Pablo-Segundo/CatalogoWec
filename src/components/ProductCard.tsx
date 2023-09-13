import React, { useState, useEffect, useRef, useReducer, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, Modal } from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import { Actionsheet, Box, useDisclose, useToast } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { MdError, MdCheckCircle } from 'react-icons/md';
import { motion } from 'framer-motion';
import { CartContext } from '../context/cart/CartContext';
import Carousel from 'react-native-snap-carousel';

interface Props {
  product: Product;
  updateCartCount: () => void;
  getCartItems: () => void;
}

export const ProductCard = ({ product,updateCartCount, getCartItems }: Props) => {
  // const [quantity, setQuantity] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [availableQuantity, setAvailableQuantity] = useState(product.quantity);
  const [isCardDisabled, setIsCardDisabled] = useState(false);
  
  const {addToCart,incrementQuantity,decrementQuantity } = useContext(CartContext); 
  const {cart} = useContext(CartContext); 
  const cartProduct = cart.find(item => item.product._id === product._id);
  const initialQuantity = cartProduct ? cartProduct.quantity : 1; 
  const [quantity, setQuantity] = useState(initialQuantity);

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);



  const toggleFavorite = async (product) => {
    const favoriteItem = {
      quantity,
      _id: product._id,
      name: product.name,
      price: product.price,
      multimedia: product.multimedia,
    };
    try {
      const favoriteArray = await AsyncStorage.getItem('favorites');
      let favorite = [];
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
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const isInFavorites = () => {
    return favorites.some((item) => item._id === product._id);
   
  };

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteArray = await AsyncStorage.getItem('favorites');
        if (favoriteArray) {
          const favorite = JSON.parse(favoriteArray);
          setFavorites(favorite);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const closeImageModal = () => {
    setShowModal(false);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => openImageModal(index)}>
      <Image
        style={styles.carouselImage}
        source={{ uri: item.images['400x400'] }}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    if (availableQuantity === 0) {
      setIsCardDisabled(true);
    }
  }, [availableQuantity]);

  




  



  
  return (
    <>
   <TouchableOpacity
        onPress={onOpen}
        style={[styles.container, isCardDisabled && styles.disabledContainer]}
      >
        <Card
          style={[styles.cardContainer, isCardDisabled && styles.disabledCardContainer]}
        >
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
    <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
    {product.name}
    </Text>
    <Text style={styles.textGray}>Disponible: {product.quantity}</Text>
    <Text style={styles.productPrice}>${product.price} MXN</Text>
    <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => {
          decrementQuantity(product._id);
          setQuantity(quantity - 1); 
        }} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => {
          incrementQuantity(product._id);
          setQuantity(quantity + 1); 
        }} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => {
          if (quantity >= 1) {
            addToCart(product, quantity);
            Toast.show({
              type: 'success',
              text1: 'Producto agregado',
              text2: 'El producto se agregó al carrito de compras',
            });
          } else if (quantity <=0) {
            Toast.show({
              type: 'error',
              text1: 'ninguna cantidad seleccionada ',
              text2: 'debe que tener al menos un producto',
            });
          }
        }}
      >
  <Text style={styles.addToCartButtonText}>Agregar al carrito</Text>
</TouchableOpacity>

  </Card>
</TouchableOpacity>

<Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
        <FlatList
            data={product.multimedia}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={Dimensions.get('window').width} 
            decelerationRate={0.9} 
          />


      {/* <FlatList
        ref={flatListRef}
        data={product.multimedia}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={screenWidth}
        decelerationRate={0.9}
        onMomentumScrollEnd={handleScroll}
      />
      {renderIndicator()}
     */}
            
          {/* <Carousel
          data={product.multimedia}
          renderItem={({ item }) => (
            <Image style={styles.cardImage} source={{ uri: item.images['400x400'] }} />
          )}
          sliderWidth={600}
          itemWidth={300}
         
          loop={false}
          autoplay={false}
          autoplayInterval={2000}
        />  */}

          <View style={styles.productContainer}>
            <Text style={styles.productCard}>{product.name}</Text>
            <Text style={styles.productName}> Disponible:  {product.quantity} </Text>
          </View>

           

            <View style={{height: 150,}}>
              <Text style={{color:'gray'}}>Descripcion</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>

            <View style={styles.cardContainer}>
                  <TouchableOpacity onPress={decrementQuantity}>
                    <Text style={styles.quantityUwu}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{quantity}</Text>
                  <TouchableOpacity onPress={incrementQuantity}>
                    <Text style={styles.quantityUwu}>+</Text>
                  </TouchableOpacity>
    
            </View>

            {/* <View>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={{color:'black'}}> Agregar al carrito</Text>
              </TouchableOpacity>
            </View> */}

                    
            <View>
                  <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => {
                  addToCart(product, 1);
                  console.log(product)}}>
                <Text style={styles.addToCartButtonText}>Agregar al carrito</Text>
              </TouchableOpacity>
            </View>
         
              
            

       
      
         <Modal visible={showModal} transparent={true}>
            <TouchableOpacity style={styles.modalContainer} onPress={closeImageModal}>
              <Image style={styles.modalImage} source={{ uri: product.multimedia[selectedImageIndex]?.images['400x400'] }} />
            </TouchableOpacity>
          </Modal>
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
  description: {
    fontSize: 16,
    color: 'black',
  },
  disabledCardContainer:{
    opacity: 0.5, 
  },
  disabledContainer: {
    opacity: 0.5, 
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
    fontSize: 25,
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
    justifyContent: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCard: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginTop: 5,
  },
  
  buyButton: {
    backgroundColor: '#FF1493',
    paddingVertical: 30,
    borderRadius: 5,
    marginBottom: 20,    
  
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 70,
    borderColor: '#FF1493',
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
    display: 'flex',
    
  },
  quantityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    paddingVertical: 5,
    borderRadius: 25,
    marginBottom: 15,
  },
  quantityUwu: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 5,
    color: 'black',
  },
  quantityButton: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginHorizontal: 1
  
  },
  quantityButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 30,
    color: 'black',
  },
  addToCartButton: {
    backgroundColor: '#ff1493',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  addToCartButtonText: {
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
    color: 'gray',
    marginVertical: 10,
  },
  largeCardImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  image: {
    resizeMode: 'cover',
    height: 500,
    width: Dimensions.get('screen').width,
  },
   
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 20,
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

  cardContainer2:{
    maxHeight: 90,
    backgroundColor: 'gray',

  },

  textGray: {
    color: 'gray',
    marginTop: 5,
  },
  
  carouselContainer: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  carouselImage: {
    width: Dimensions.get('window').width, 
    height: 200, 
    resizeMode: 'contain', 
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: Dimensions.get('window').width - 40, 
    height: Dimensions.get('window').height - 80, 
    resizeMode: 'contain',
  },
});
