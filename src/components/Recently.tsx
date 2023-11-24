import React, { useContext, useEffect, useState } from "react";
import { Product } from "../interfaces/ProductsCategoryInterface";
import { CartContext } from "../context/cart/CartContext";
import { FlatList, Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Card } from "react-native-paper";

export const Recently = () => {
  const { cart, addToCart, loadCartFromStorage } = useContext(CartContext);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    setRecentlyViewed(cart.map((cartItem) => cartItem.product));
    // Puedes llamar a un servicio de recomendación aquí para obtener productos recomendados
    // y luego actualizar el estado de `recommendedProducts`.
  }, [cart]);

  const renderProductItem = ({ item }: { item: Product }) => (
    <Card style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          // Aquí podrías navegar a la página de detalles del producto o realizar alguna otra acción
          console.log(`Producto seleccionado: ${item.name}`);
        }}
      >
        <View style={styles.rowContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: item.multimedia[0].images['400x400'],
              }}
            />
          </View>

          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productInfo}>
              Disponible: {item.quantity} | {item.price} MNX
            </Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => {
                // Lógica para añadir al carrito
              }}
            >
              <Text style={styles.addToCartButtonText}>Añadir al carrito</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <View>
      {recentlyViewed.length > 0 ? (
        <FlatList
          data={recentlyViewed}
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id}
          horizontal
        />
      ) : (
        <Text style={styles.noProductsText}>No has visto ningún producto recientemente.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  imageContainer: {
    width: 120,
    marginRight: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  productInfo: {
    fontSize: 14,
    color: '#555',
  },
  addToCartButton: {
    backgroundColor: '#FF1493',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardContainer: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 15
  },
  noProductsText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
});
