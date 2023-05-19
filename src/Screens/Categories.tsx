import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import API from '../API/API';
import { FlatList } from 'react-native';
import { Touchable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShoppingScreen from '../Screens/ShoppingScreen';


const App = ({  }) => {
  
  const [categories, setCategories] = useState();
  
  const getCategories = async () => {
    try{
    const {data } = await API.get('/categories');
      setCategories(data.categories)
    }catch (error){
    console.log(error);
    }
  }
  useEffect(() => {
   getCategories();
  }, []);
  if (!categories) {
    return null;
  }else
  return (
   

    

  <View >
       <Text style={styles.TextContainer}> WAPIZIMA</Text>
     <TouchableOpacity style={styles.IconContainer} onPress={ShoppingScreen} >
        <Icon name= "shopping-cart" size={30} color="#000" />
     
      </TouchableOpacity>
  <View
      style={{
        height: '8%',
        // borderBottomRightRadius: 25,
        // borderBottomLeftRadius: 25,
        backgroundColor: '#d3afd4',
      }}
      
    />
      
      <FlatList
          data={categories}
          renderItem={ ({item } ) => (

          <View style={styles.container}>
         
          <Image style={styles.image} source={{ uri: item.imagesMobile['400x400'] }}  />
         

          <View style={styles.overlay}>
          <Text style={styles.text}>{item.name} </Text>
      </View>
          </View>
      )}/>
    
    </View>
    );
  };


export default App;
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