import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import API from '../API/API';
import { FlatList } from 'react-native';



export const apiprueba = () => {
  const [products, setProduct] = useState();
//   const _id =  "637fd33234834475d1f055b5" ;
  const getProducts = async () => {
    try{
    const {data } = await API.get('/products/category/637fd33234834475d1f055b5');
    setProduct(data.products)
    }catch (error){
    console.log(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  if (!products) {
    return null;
  }else
  return (
  <FlatList
    data={products}
  renderItem={ ({item } ) => (
    <View style={{width: 200, height: 300, flexDirection: 'column'}}>
    <View style={{width: '100%', height:'20%' }}>
    <Text>{item.name}
      </Text>
    </View>
    <View style={{width: '100%', height:'80%' }}>
    {/* <Image source={{ uri: item.imagesMobile['400x400'] }} style={{ width: '100%', height: '100%' }} /> */}
    </View>
  </View>
  )
  }
  />
  );
};


const styles = StyleSheet.create({
  screenTitle: {
     fontSize: 20,
     color:'black',
     margin: 8,
     fontWeight: 'bold',
  },
})



