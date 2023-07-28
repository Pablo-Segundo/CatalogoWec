import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import API from '../API/API';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadingScreen from '../Screens/loadintgScreen';
import { Actionsheet, Button, useDisclose } from "native-base";
import { ProductCard } from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

interface Props extends NativeStackScreenProps<any, any> {}


export const PetañaScreen = ({ route, navigation }: Props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);


  
  const getCartItems = async () => {
    const cartArray = await AsyncStorage.getItem('cart');
    const parsedCart = JSON.parse(cartArray);
    setCart(parsedCart || []);
  };

  const removeFromCart = async (productId: string) => {
    const cartArray = await AsyncStorage.getItem('cart');
    let cart = [];
    if (cartArray) {
      cart = JSON.parse(cartArray);
      const newCart = cart.filter((item) => item.product_id._id !== productId);
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
      getCartItems(); 
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await API.get(`/products/category/${route.params}`);
      setProducts(data.products);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiCall = getProducts();
        const timeout = new Promise((resolve) => setTimeout(resolve, 1000));
        await Promise.all([apiCall, timeout]);
        setIsLoading(false);
        updateCartCount();
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No hay conexión a internet</Text>
       <Image source={require('../Navigators/assets/lottie/osuxd.png')} style={styles.errorImage} />
      </View>
    );
  }


  const updateCartCount = async () => {
    const storedCart = await AsyncStorage.getItem('cart');
    const parsedCart = JSON.parse(storedCart);
    let productCount = 0;
    if (parsedCart) {
      parsedCart.forEach((item) => {
        productCount += item.quantity;
      });
    } 
    setCartCount(productCount);
  };
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  const ShoppingCartBadge = ({ count }) => {
    return (
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{count}</Text>
      </View>
    );
  };
  return (
    <View style={{marginBottom:60,}}>

      <TouchableOpacity
        style={styles.IconContainer}
        onPress={() => navigation.navigate('Shopping', { totalProducts: cartCount })}>
        <View style={styles.IconCircle}>
          <Icon name="shopping-cart" size={30} color="#000" />
          {cartCount > 0 && <ShoppingCartBadge count={cartCount} />}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.IconContainer2}
        onPress={() => navigation.navigate('Favorites', {})}>
        <View style={styles.IconCircle}>
          <Icon name="heart" size={30} color="black" />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.directionrow}
        onPress={() => navigation.navigate('Home', {})}>
        <Icon name="arrow-left" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={{zIndex: 9999}}>

        
        {/* <Toast /> */}
      </View>
      <View style={{ height: '9%', backgroundColor: '#DEBDCE', }} />
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard product={item} updateCartCount={updateCartCount} getCartItems={function (): void {
            throw new Error('Function not implemented.');
          } } />
        )}
      />
       </View>
  );
 };
 const styles = StyleSheet.create({

        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        directionrow:{
          paddingHorizontal: 22,
          position: 'absolute',
          top: 15, 
          zIndex: 1,
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

  
        errorContainer: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        },
        errorText: {
          fontSize: 18,
          marginBottom: 20,
          color: 'black'
        },

        productItem: {
          margin: 10,
          alignItems: 'center',
        },
        errorImage: {
          width: 200,
          height: 200,
          resizeMode: 'contain',
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
        IconContainer2: {
          position: 'absolute',
          top: 10, 
          right: 70,
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
          fontSize: 20,
          fontWeight: 'bold',
          paddingHorizontal: 10,
        },
        quantity: {
          fontSize: 16,
          fontWeight: 'bold',
          marginHorizontal: 10,
        },
        IconCircle: {
          width: 45,
          height:  45,
          borderRadius: 30,
          backgroundColor: '#FFF',
          alignItems: 'center',
          justifyContent: 'center',
        },

        HeartIconContainer: {
        
          marginRight: 10, 
        },
        
    
});