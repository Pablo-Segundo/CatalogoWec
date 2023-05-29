import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import API from '../API/API';




export const ProductScreen = () =>  {
  const [products, setproducts] = useState();
     try{

      const { data } = await API.get(`/products/category/${route.params}`)
     }
    
   
   
  
  return(
   <View>
    



   </View>



  )
 

}