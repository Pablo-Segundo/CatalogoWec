import React, { useState, useEffect } from 'react';
import { RefreshControl, Text, View} from 'react-native';
import API from '../../API/API';
import { FlatList } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadingScreen from './loadintgScreen';
import { ProductCard } from '../../components/ProductCard';
import { NoInternet } from '../../components/uwuwuw';

interface Props extends NativeStackScreenProps<any, any> { }


export const ProductsScreen = ({ route, navigation }: Props) => {
  navigation.setOptions({
    title: route.params?.name,
  });
  
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getProducts = async () => {
    try {
      const { data } = await API.get(`/products/category/${route.params?._id}`);
      setProducts(data.products);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    } 
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (isError) {
    <NoInternet />
  }
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (

    <>
      <FlatList
        data={products}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getProducts} />
        }
        renderItem={({ item }) => (
          <ProductCard product={item} />

      
        )}
      />
    
    </>
  );
};
