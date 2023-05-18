
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Touchable } from 'react-native';
import API from '../API/API';
import { FlatList } from 'react-native';
const App = () => {
  const [products, setproducts] = useState();
  // const _id =  "637fd33234834475d1f055b5" ; 
  const getproducts = async () => {
    try{
    const {data } = await API.get('/products/multimedia');
    setproducts(data.products)
    }catch (error){
    console.log(error);
    }
  }
  useEffect(() => {
    getproducts();
  }, []);
  if (!products) {
    return null;
  }else 
  return (

  <FlatList 
    data={products}
  renderItem={ ({item } ) => (
   
   <View>
    <Text>{item.name}</Text>
    <Text>{item.description} </Text>
    <Image source={{ uri: item.products['400x400'] }} style={{ width: '100%', height: '100%' }} /> 
   </View>
    
    
 
      

    
    
 
  )}/>

  );
};
export default App;

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

})