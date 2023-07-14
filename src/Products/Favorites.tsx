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
  // const { favorites } = route.params;
  const navigation = useNavigation();
  const toast = useToast();
  const [favorites,setFavorites] = useState();
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


  const addToCart = () => {
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
        <Text style={styles.headerText}>Productos guardados</Text>
        <TouchableOpacity
          style={styles.shoppingCartButton}
          onPress={() => navigation.navigate('Shopping', {})}>
          <View style={styles.shoppingCartIcon}>
            <Icon name="shopping-cart" size={30} color="#000" />
          </View>
        </TouchableOpacity>
      </View>

      
      <View style={styles.favoritesContainer}>
        <Text style={styles.favoritesHeaderText}>Productos Favoritos</Text>
        <Card style={styles.cardContainer}>


        <FlatList
            data={favorites}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <Image style={styles.productImage} source={{ uri: item.multimedia[0].images['400x400'] }} />
                 <Text numbserOfLines={2} ellipsizeMode="tail" style={styles.productName}>{item.name}</Text>
           
                 <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(product)}>
                  <Icon name="trash" size={30} color="#fff" />
                </TouchableOpacity>

            </View>

          
           
            )}
          />
        </Card>

        <Card>
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
              </Card>
  

      </View>
   
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
    paddingVertical: 5,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'gray',
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
    width: 80,
    height: 80,
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