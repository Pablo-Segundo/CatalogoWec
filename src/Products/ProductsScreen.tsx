import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import API from '../API/API';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadingScreen from '../Screens/loadintgScreen';
import { Actionsheet, Button, useDisclose } from "native-base";
import { ProductCard } from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Props extends NativeStackScreenProps<any, any> {}

export const PetañaScreen = ({ route, navigation }: Props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  const getProducts = async () => {
    try {
      const { data } = await API.get(`/products/category/${route.params}`);
      setProducts(data.products);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiCall = getProducts();
        const timeout = new Promise((resolve) => setTimeout(resolve, 1000));
        await Promise.all([apiCall, timeout]);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No hay conexión a internet</Text>
       <Image source={require('../Navigators/assets/lottie/osuxd.png')} style={styles.errorImage} /> 
      </View>
    );
  }

  
 
  return (
    <View style={{marginBottom:60,}}>
        <Text style={[styles.TextContainer, { fontSize: 25, color: '#FFF', fontWeight: 'bold' }]}>WAPIZIMA </Text>
       
      <TouchableOpacity
              style={styles.IconContainer}
              onPress={() => navigation.navigate('Shopping', {})}>
          <View style={styles.IconCircle}>
            <Icon name="shopping-basket" size={30} color="#000" />
            {/* <Image source={require('../Navigators/assets/lottie/icon/icon.png')} style={styles.IconCircle} />  */}
            </View>
            </TouchableOpacity>

             <TouchableOpacity style={styles.IconContainer2}
              onPress={() => navigation.navigate('Favorites',{})}>
            <View style={styles.IconCircle}>
            <Icon name="heart" size={30} color= 'black' />
            </View>
          </TouchableOpacity>  


                
        
      
        {/* <TouchableOpacity style={styles.HeartIconContainer} onPress={() => navigation.navigate('Favorites',{})}>
        <View style={styles.IconCircle}>
        <Icon name="heart" size={30} color= 'black' />
        </View>
      </TouchableOpacity> */}
      



      <View style={{ height: '8%', backgroundColor: '#debdce'}} /> 
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

  
        errorContainer: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        },
        errorText: {
          fontSize: 18,
          marginBottom: 20,
          color: 'black'
        },

        productItem: {
          margin: 10,
          alignItems: 'center',
        },
        errorImage: {
          width: 200,
          height: 200,
          resizeMode: 'contain',
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
        IconContainer2: {
          position: 'absolute',
          top: 10, 
          right: 70,
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
          borderRadius: 30,
          backgroundColor: '#FFF',
          alignItems: 'center',
          justifyContent: 'center',
        },

        HeartIconContainer: {
        
          marginRight: 10, 
        },
        
    
});