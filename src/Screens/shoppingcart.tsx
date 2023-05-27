import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import API from "../API/API";
import Icon from 'react-native-vector-icons/FontAwesome';
 import { useNavigation } from "@react-navigation/native";



export const ShoppingScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState();
  const getCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  if (!categories) {
    return null;
  } else {

  return(
 


    <View>
        <Text style={styles.TextContainer}> WAPIZIMA</Text>
        <TouchableOpacity style={styles.IconContainer}
            onPress={() => navigation.navigate('shopping', { })}>
          <Icon name="shopping-cart" size={30} color="#000" />
        </TouchableOpacity>
        <View
          style={{
            height: '28%',
            backgroundColor: '#D3AFD4',
          }}
        />
        <View>  
        <Text style={(styles.TextContainer)}> Productos añadidos</Text>
        </View>

         <View>
       
         </View>
      
        


      

    </View>
    
    )}
  
   
    


  
    }
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 50,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: 130,
      resizeMode: 'cover',
      margin: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'NLACK',
      fontSize: 20,
      fontWeight: 'bold',
    },
    IconContainer: {
      position: 'absolute',
      top: 15,
      right: 25,
      zIndex: 1,
    },
    TextContainer: {
      color: 'black',
      position: 'absolute',
      top: 20,
      left: 25,
      zIndex: 1,
    }
  });