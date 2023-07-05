import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import { Product } from '../interfaces/ProductsCategoryInterface';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState<Product[]>([]);

  const toggleFavorite = () => {
    const isFavorite = favorites.some((fav) => fav._id === product._id);
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav._id !== product._id);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const navigateToFavorites = () => {
    navigation.navigate('Favorites', { favorites });
  };

  return (
    <TouchableOpacity onPress={navigateToFavorites} style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.favoriteContainer}>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Icon
              name={favorites.some((fav) => fav._id === product._id) ? 'heart' : 'heart-o'}
              size={20}
              color={favorites.some((fav) => fav._id === product._id) ? 'red' : 'white'}
            />
          </TouchableOpacity>
        </View>

        <Image style={styles.productImage} source={{ uri: product.imageUrl }} />

        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 10,
  },
  card: {
    padding: 10,
    borderRadius: 10,
  },
  favoriteContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  favoriteButton: {
    backgroundColor: 'transparent',
    padding: 5,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});

export default ProductCard;