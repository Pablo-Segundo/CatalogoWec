import React, { useContext,useEffect,useState } from "react";
import { Product } from "../interfaces/ProductsCategoryInterface";
import { CartContext } from "../context/cart/CartContext";
import { FlatList, Text, View, TouchableOpacity, Image } from 'react-native';


export const Recently = () => {
    const { cart, addToCart, loadCartFromStorage } = useContext(CartContext);
    const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  
    useEffect(() => {
      // Puedes obtener los productos recientemente vistos del estado o de AsyncStorage
      // En este ejemplo, estamos usando el carrito como fuente de productos recientemente vistos
      setRecentlyViewed(cart.map((cartItem) => cartItem.product));
    }, [cart]);
  
    const renderProductItem = ({ item }: { item: Product }) => (
      <TouchableOpacity
        onPress={() => {
          // Aquí podrías navegar a la página de detalles del producto, o realizar alguna otra acción
          console.log(`Producto seleccionado: ${item.name}`);
        }}
        style={{ margin: 10, padding: 10, borderWidth: 1, borderColor: '#ddd' }}
      >
        <Image source={{ uri: item.images }} style={{ width: 50, height: 50, marginBottom: 5 }} />
        <Text style={{color:'black'}}>{item.name}</Text>
        <Text style={{color:'black'}}>Precio: {item.price} MNX</Text>
      </TouchableOpacity>
    );
  
    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10,color:'black' }}>Productos Recientemente Vistos</Text>
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