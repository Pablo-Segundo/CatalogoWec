import React, { useState, useEffect } from 'react';
import { Image, RefreshControl, StyleSheet, Text, View} from 'react-native';
import API from '../../API/API';
import { FlatList } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadingScreen from '../../components/loadintgScreen';
import { ProductCard } from '../../components/ProductCard';
import { NoInternet } from '../../components/Recommendations';

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
  // if (products.length === 0) {
  //   return (
  //     <View style={styles.noProductsContainer}>
  //       <Image
  //         source={require('../../assets/lottie/osuxd.png')} 
  //         style={styles.noProductsImage}
  //       />
  //       <Text style={styles.noProductsText}>Tenemos problemas. No hay productos disponibles.</Text>
  //     </View>
  //   );
  // }

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
const styles = StyleSheet.create({
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  noProductsText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
