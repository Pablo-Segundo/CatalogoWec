import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; import API from '../API/API';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadingScreen from './loadintgScreen';
import { ProductCard } from '../components/ProductCard';


interface Props extends NativeStackScreenProps<any, any> {}

export const CategoriesScreen = ({route, navigation} : Props)  => {

  // console.log('hola dime que hace ');
  
  // const navigation = useNavigation();
  const [categories, setCategories] = useState();
  const [isError, setIsError] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  

  if (!categories) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No hay conexión a internet</Text>
       <Image source={require('../Navigators/assets/lottie/osuxd.png')} style={styles.errorImage} /> 
       <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>vuelve a intertarlo  </Text>
      </TouchableOpacity>
      </View>
      
    );
  } else {


    const ShoppingCartBadge = ({ count }) => {
      return (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      );
    };

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
   
  
  


   
    

    return (
      <View style={{marginBottom: 40}} >
         <Text style={[styles.TextContainer, { fontSize: 25, color: '#FFF', fontWeight: 'bold'  }]}>WAPIZIMA</Text>


       <TouchableOpacity
        style={styles.IconContainer}
        onPress={() => navigation.navigate('Shopping', { totalProducts: cartCount })}>
        <View style={styles.IconCircle}>
          <Icon name="shopping-cart" size={30} color="#000" />
          {cartCount > 0 && <ShoppingCartBadge count={cartCount} />}
        </View>
      </TouchableOpacity>




        <View style={styles.divider} />
        <FlatList
          data={categories}
          renderItem={({ item }) => (
        
            <TouchableOpacity onPress={() => navigation.navigate('pestanas', item._id )}>
              <View style={styles.container}>
                <Image style={styles.image} source={{ uri: item.imagesMobile['400x400'] }} />
                <View style={styles.overlay}>
                  <Text style={styles.text}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        
        />
      </View>
    );
  }
};
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
  errorImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignItems: 'center'
   
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
    top: 10, 
    right: 12,
    zIndex: 1,
   },
  TextContainer: {
    color: 'black',
    position: 'absolute',
    top: 20,
    left: 25,
    zIndex: 1,
  },
  divider: {
    height: '9%',
    backgroundColor: '#debdce',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  IconCircle: {
    width: 45,
    height:  45,
    borderRadius: 25,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
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
});
