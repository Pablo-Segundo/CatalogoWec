import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import API from '../API/API';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadingScreen from '../Screens/loadintgScreen';
import { Actionsheet, Button, useDisclose } from "native-base";
import { ProductCard } from '../components/ProductCard';
import BottomSheet from "react-native-gesture-bottom-sheet";



interface Props extends NativeStackScreenProps<any, any> {}

export const PetañaScreen = ({ route, navigation }: Props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //  const bottomSheet = useRef();
  
 

  const getProducts = async () => {
    try {
      const { data } = await API.get(`/products/category/${route.params}`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const apiCall = getProducts();
      const timeout = new Promise((resolve) => setTimeout(resolve, 1000));
      await Promise.all([apiCall, timeout]);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View>
      <Text style={[styles.TextContainer, { fontSize: 20, color: '#FFF' }]}>WAPIZIMA UwU</Text>
      <TouchableOpacity
          style={styles.IconContainer}
          onPress={() => navigation.navigate('Shopping', {})}>
       <View style={styles.IconCircle}>
         <Icon name="shopping-cart" size={30} color="#000" />
         </View>
        </TouchableOpacity>



      <View style={{ height: '8%', backgroundColor: '#D3AFD4' }} />
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard product={item} route={undefined} />
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
        IconCircle: {
          width: 45,
          height:  45,
          borderRadius: 25,
          backgroundColor: '#FFF',
          alignItems: 'center',
          justifyContent: 'center',
        },
    
});