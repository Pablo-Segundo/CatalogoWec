// import React, { useState, useEffect } from 'react';
// import { View, Text, Image } from 'react-native';
// import API from '../API/API';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { Navigation } from '../Navigators/Navigation';
// import { FlatList } from 'react-native-gesture-handler';




// interface Props extends NativeStackScreenProps<any, any> { }

// export const ProductScreen = ({route}: Props) =>  {
//    const [products, setProducts] = useState();
//     const getProducts = async () => {
//       try{
//         const { data } = await API.get (`/products/${route.params}`);
//         setProducts(data.products)
//       }catch (error){
//         console.log(error);
//       }
//     } 
//     useEffect(() => {

//       getProducts();
//     }, []);
//      if (!products) {
//       return null;
//     }else
    
//   return(
//     <FlatList  
//     data={products}
//     renderItem={ ({item } ) => (


//      <View>
//       <Text>Producto:{item._id}</Text>
//       {/* <Image style={{width: 400, height:400}} source={{ uri: item.multimedia[0].images['400x400'] }}  />     */}
//       <Text >{item.name}</Text>
//      </View>


//     )}/>
    



//   )
// }