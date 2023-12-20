import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import API from '../../API/API';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ProductCard } from '../../components/ProductCard';

export const ProductsIndex  = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const navigation = useNavigation();

  const getCategories = async () => {
    try {
      const { data } = await API.get('/products/index/mobile');
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  return (
    <>
      <FlatList
         data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard product={item}/>
        )}
      />

  
    
    </>
  );
};


const styles = StyleSheet.create({

  screenTitle: {
     fontSize: 20,
     color:'black',
     margin: 8,
     fontWeight: 'bold',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  //cards indexproducts 
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
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
  // card loadmore
  loadMoreButton: {
    backgroundColor: '#FF1493',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  loadMoreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

})


// /products/index/mobile
