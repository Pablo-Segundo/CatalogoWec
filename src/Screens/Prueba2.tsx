import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native';
import API from '../API/API';

const MyComponent = () => {
    const [multimedia, setmultimedia] = useState();
  
    const getmultimedia = async () => {
      try{
      const {data } = await API.get('/products');
      setmultimedia(data.products)
      }catch (error){
      console.log(error);
      }
    }
    useEffect(() => {
        getmultimedia();
    }, []);
    if (!multimedia) {
      return null;
    }else

  return (
    <FlatList
          data={multimedia}
          renderItem={ ({item } ) => (

          <View style={styles.container}>
         
          <Image style={styles.image} source={{ uri: item.multimedia.images.original  }}  />
         

          <View style={styles.overlay}>
          <Text style={styles.text}>{item.name} </Text>
          </View>
          </View>
      )}/>
    
    
  );
};


const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
     },
     image: {
       width: 400, 
       
       height: 200, 
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
       color: '#fff', 
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
       color:'black',
       position: 'absolute',
       top: 20,
       left: 25,
       zIndex: 1,
     }
   
   
   });
export default MyComponent;
