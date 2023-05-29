import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import API from '../API/API';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';




interface Props extends NativeStackScreenProps<any, any> { }

export const PetañaScreen = ({route, navigation}: Props) => {
  const [products, setproducts] = useState();
  //  const [isLoading, setIsLoading] = useState(true);
 
console.log();
 
const getproducts = async () => {

 

  try{
    const { data } = await API.get(`/products/category/${route.params}`);
  setproducts(data.products)
  }catch (error){
  console.log(error);
  }
}

useEffect(() => {


//    setTimeout(() => {
//     setIsLoading(false);
//   }, 1000);
// }, []);
// if (isLoading) {
//   return <LoadingScreen />;
// }



  // const incrementQuantity  = () =>{
  // }
  // const decrementQuantity  = () =>{
  // }
  


  getproducts();
}, []);
 if (!products) {
  return null;
}else 
return (
       <View>
        
      <Text style={styles.TextContainer}> WAPIZIMA</Text>
      <TouchableOpacity style={styles.IconContainer} >
        <Icon name="shopping-cart" size={30} color="#000" />
      </TouchableOpacity>
      <View
        style={{
          height: '8%',
              backgroundColor: '#D3AFD4',
         }}
        />

        <FlatList 
        data={products}
         numColumns={2}
        renderItem={ ({item } ) => (
            
       
      <View style={styles.container}>
    
       <Image style={styles.productImage} source={{ uri: item.multimedia[0].images['400x400'] }} />


      <Text  style={styles.productname}>{item.name}</Text>
      <Text>Disponible:{item.quantity}</Text>
 
      <Text style={styles.productPrice}>${item.price}</Text>

     {/* <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => decrementQuantity(index)}>
            <Text style={styles.quantityButton}>-</Text>
             </TouchableOpacity>
             <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => incrementQuantity(index)}>
             <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
       </View> */}

    
      

      <TouchableOpacity style={styles.buyButton}  onPress={() => navigation.navigate('products',item._id )} >
      <Text style={styles.buyButtonText}>Ver Detalles</Text>
      </TouchableOpacity>


     {/* <Image style={{width: 400, height:400}} source={{ uri: item.multimedia[0].images['400x400'] }}  />    */}
    


       </View>
      )}/>
      </View>
 

  );
 };


 const styles = StyleSheet.create({

        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        productItem: {
          margin: 10,
          alignItems: 'center',
        },
        productImage: {
          width: 150,
          height: 150,
          borderRadius: 10,
        },
        productname:{
          fontSize: 20,
          fontWeight: 'bold',
          color:'black',
          marginVertical: 10,
        },
        productPrice: {
          fontSize: 20,
          fontWeight: 'bold',
          color:'#1e90ff',
          marginVertical: 10,
        },
        buyButton: {
          backgroundColor: '#ff69b4',
          padding: 5,
          borderRadius: 5,
        },
        buyButtonText: {
          color: 'white',
          fontWeight: 'bold',
        },
        IconBarra: {
          flex: 1,
          paddingTop: 20, 
          paddingHorizontal: 10,
        },
        IconContainer: {
         position: 'absolute',
         top: 10, 
         right: 10,
         zIndex: 1,
        },
        TextContainer: {
          color: 'black',
          position: 'absolute',
          top: 20,
          left: 25,
          zIndex: 1,
        },  
        quantityContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        },
        quantityButton: {
          fontSize: 20,
          fontWeight: 'bold',
          paddingHorizontal: 10,
        },
        quantity: {
          fontSize: 16,
          fontWeight: 'bold',
          marginHorizontal: 10,
        },
    
});