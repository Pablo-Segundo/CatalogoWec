import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ScrollView } from 'react-native';
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Box,useToast } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CartContext } from "../../context/cart/CartContext";
import { Product } from "../../interfaces/ProductsCategoryInterface";
import { Toast } from 'react-native-toast-message/lib/src/Toast';


interface Props extends NativeStackScreenProps<any, any> {}

interface Props {
  product: Product;
}


export const FavoritesScreen = ({ product, navigation }: Props) => {
  
  const [favorites,setFavorites] = useState(0);
  const {removeItemFromCart , clearCart, incrementQuantity, decrementQuantity, addToCart } = useContext(CartContext);
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(favorites.quantity);

 

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem('favorites');
        if (favoritesData) {
          setFavorites(JSON.parse(favoritesData));
        }
      } catch (error) {
        console.log('Error al cargar los favoritos unu:', error);
      }
    };
    loadFavorites();
  }, []);
 
  const addtoCard = (product: Product) => {
    addToCart(product, 1); 
    Toast.show({
      type:'success',
      text1:'Producto agregado',
      text2:'EL producto se agrego al carrito de compras ',

    })

   
  };
 
  return (
    <>


      <View>
        {/* <Text style={{color:'black', fontSize: 18, fontWeight: 'bold'}}> Productos Agregados</Text> */}
        <Card style={styles.cardFavorite}>
          <Text style={{color:'#ff1493', fontSize: 20, fontWeight: 'bold'}} > Favoritos  </Text>
        </Card>
      </View>



    
     {favorites.length > 0 ? (


           
        <FlatList
            data={favorites}
            numColumns={2}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <Card style={styles.cardContainer}>
                <Image style={styles.productImage} source={{ uri: item.multimedia[0].images['400x400'] }} />
                 <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail" >{item.name}</Text>
                 <Text style={styles.productPrice}>${item.price}MX </Text>
                 <Text style={styles.productName}>{item.quantity} </Text>
                  <View>
                  {/* <TouchableOpacity style={styles.deleteButton} onPress={() => removeItemFromCart(item.productId)}>
                  <Icon name="trash-o" size={30} color="#ff0000" />
                </TouchableOpacity>  */}
                 </View>


            <View style={styles.quantityContainer}>
            {/* <TouchableOpacity
              onPress={() => {
                decrementQuantity(item._id);
                setQuantity(quantity - 1); 
              }}
              style={styles.quantityButton}
              disabled={quantity <= 1}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>


        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity
              onPress={() => {
                incrementQuantity(item._id);
                setQuantity(quantity + 1); 
              }}
              style={styles.quantityButton}
              disabled={quantity >= availableQuantity}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity> */}




                 </View>














                 <TouchableOpacity
                 style={styles.addToCartButton}
                  onPress={() => {
                 addtoCard(item);
                   }}
                    >
                    <Text style={styles.textWhite}> Agregar al carrito </Text>
                  </TouchableOpacity>
                </Card>
            </View>
            )}
          />
        
              ) : (
                <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Ningún producto en favoritos </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Image source={require('../../assets/lottie/osuxd.png')} style={styles.exploreImage} />
            <Text style={styles.exploreButtonText}>Marca tus productos favoritos </Text>
          </TouchableOpacity>
        </View>
              )}
         
  
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#DEBDCE',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  cardFavorite: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
    marginTop: 10
  },
  addToCartButton: {
    backgroundColor: '#ff1493',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
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
  cardContainer: {
    width: Dimensions.get('window').width * 0.45, 
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    margin: 5, 
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  continueButton: {
    backgroundColor: '#ff1493',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    marginVertical: 15,
  
    
  },
  exploreImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  directionrow:{
    paddingHorizontal: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'gray',
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  emptyCartText: {
    fontSize: 30,
    marginBottom: 20,
    color: 'gray',
  },
  exploreButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
  quantityUwu: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 30,
    color: 'black'
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
    // alignContent:'center',
    display:'flex',
  },
  deleteButton: {
    color:"black",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  textWhite: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
  buyButton: {
    backgroundColor: '#FF1493',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 15,
  },
  shoppingCartButton: {
    position: 'absolute',
    top: 20,
    right: 30,
    zIndex: 1,
  },
  shoppingCartIcon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoritesContainer: {
    margin: 20,
  },
  favoritesHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'gray',
    padding: 15
  },

  productContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 150, 
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  productWithe: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
 

});