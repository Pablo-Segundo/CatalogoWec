
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Touchable } from 'react-native';
import API from '../../API/API';
import { FlatList } from 'react-native';
const App = () => {
  const [categories, setCategories] = useState();
  // const _id =  "637fd33234834475d1f055b5" ; 
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

  <FlatList 
    data={categories}
  renderItem={ ({item } ) => (
    <View style={{width: 200, height: 300, flexDirection: 'column'}}>
    <View style={{width: '100%', height:'20%' }}>
    <Text>{item.name}
      </Text>
    </View>
    <View style={{width: '100%', height:'80%' }}>
      
    <Image source={{ uri: item.imagesMobile['400x400'] }} style={{ width: '100%', height: '100%' }} />
    
    </View>
  </View>
  )
  
  }

  />

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