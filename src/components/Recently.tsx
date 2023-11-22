import React, { useContext,useEffect,useState } from "react";
import { Product } from "../interfaces/ProductsCategoryInterface";
import { CartContext } from "../context/cart/CartContext";
import { FlatList, Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';


export const Recently = () => {
  const { cart, addToCart, loadCartFromStorage } = useContext(CartContext);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setRecentlyViewed(cart.map((cartItem) => cartItem.product));
    // Aquí podrías llamar a un servicio de recomendación para obtener productos recomendados
    // y luego actualizar el estado de `recommendedProducts`.
  }, [cart]);
  
    const renderProductItem = ({ item }: { item: Product }) => (
      
      <>
      <TouchableOpacity
        onPress={() => {
          // Aquí podrías navegar a la página de detalles del producto, o realizar alguna otra acción
          console.log(`Producto seleccionado: ${item.name}`);
        }}
        style={{ margin: 10, padding: 10, borderWidth: 1, borderColor: '#ddd' }}
      >



        <View style={styles.imageContainer}>
           <Image style={styles.image}  source={{ uri: item.multimedia[0].images['400x400'] }}  />
        </View>

        <View style={styles.tableRow}>
        <Text style={{color:'black', fontSize: 15}}>{item.name}</Text>
        </View>





          <Text style={{color:'black'}}>Precio: {item.price} MNX</Text>
          <TouchableOpacity style={{backgroundColor:'#FF1493', marginHorizontal: 30}}>
            <Text style={{color:'white', fontSize:15, fontWeight:'bold'}}> Añadir al carro </Text>
          </TouchableOpacity>
     
          </TouchableOpacity>
     </>
      
    );
  
    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10,color:'black', }}>Productos Recientemente Vistos</Text>
        {recentlyViewed.length > 0 ? (
          <FlatList
            data={recentlyViewed}
            renderItem={renderProductItem}
            keyExtractor={(item) => item._id}
            horizontal
          />
        ) : (

          <Text style={{color:'black', fontSize: 15, }}>No has visto ningún producto recientemente.</Text>
        )}
      </View>
    );
  };
  const styles = StyleSheet.create({
    image: {
      width: 100,
      height: 100,
      margin: 15,
      marginVertical: -20
    },
    imageContainer: {
      width: 120,
      marginTop: 30,
      marginRight: 5,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowText: {
      fontSize: 14,
      color: 'black',
      fontWeight: 'bold',
    },
    rowTextPrice: {
      fontSize: 16,
      color: '#ff1493',
      fontWeight: 'bold',
    },

  
  });