import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Box,useToast } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';



interface Props {
  product: Product;
  route: any;
}
export const FavoritesScreen = ({ route, product }: Props) => {
  const navigation = useNavigation();
  const toast = useToast();
  const [favorites,setFavorites] = useState(0);
  const [showModal,setShowModal] = useState(false);

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

  const addtoCard = () =>{

  }
 
  const handleDelete = (product) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(product, 1);
    
    AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      .then(() => {
        setFavorites(updatedFavorites);
      })
      .catch(error => {
        console.log('Error al eliminar el producto:', error);
      });
  };


  
  return (
    <>
    
      <View style={styles.container}>
      <TouchableOpacity style={styles.directionrow}  onPress={() => navigation.navigate('pestanas', {})}>
        <Icon name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shoppingCartButton}
          onPress={() => navigation.navigate('Shopping', {})}>
          <View style={styles.shoppingCartIcon}>
            <Icon name="shopping-cart" size={30} color="#000" />
          </View>
          
        </TouchableOpacity>
      </View>

    
            <Text style={styles.favoritesHeaderText}>Productos favoritos</Text>

            {favorites.length > 0 ? (
           
        <FlatList
            data={favorites}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <Image style={styles.productImage} source={{ uri: item.multimedia[0].images['400x400'] }} />
                  
                 <Text numbserOfLines={4} ellipsizeMode="tail" style={styles.productName}>{item.name}</Text>
                  <View>
                 </View>
                 <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(product)}>
                  <Icon name="trash" size={30} color="#fff" />
                </TouchableOpacity> 
            </View>
            )}
          />
            
              ) : (
                <View style={styles.centeredContainer}>
                  <Image
                    source={require('../Navigators/assets/lottie/osuxd.png')}
                    style={styles.noDataImage}
                  />
                  <Text style={styles.noDataText}>No tienes productos favoritos</Text>
                  <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.textWhite}>Explora y descubre muevos   </Text>
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
    emptyCartContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      
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
        color: 'gray'
      },
          exploreButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray'
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
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  textWhite: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
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
  cardContainer: {
    borderRadius: 10,
    padding: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  productName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});