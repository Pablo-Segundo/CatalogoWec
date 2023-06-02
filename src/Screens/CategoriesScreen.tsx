import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import API from '../API/API';
import { NativeStackScreenProps } from '@react-navigation/native-stack';



interface Props extends NativeStackScreenProps<any, any> {}

export const CategoriesScreen = () => {

  // console.log('hola dime que hace ');
  
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


    return (
      <View>
        <Text style={styles.TextContainer}>WAPIZIMA</Text>

        <TouchableOpacity
          style={styles.IconContainer}
          onPress={() => navigation.navigate('shopping', {})}>
          <Icon name="shopping-cart" size={30} color="#000" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('pestanas', item._id )}>
              <View style={styles.container}>
                <Image style={styles.image} source={{ uri: item.imagesMobile['400x400'] }} />
                <View style={styles.overlay}>
                  <Text style={styles.text}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          //  keyExtractor={(item) => item._id.toString()}
        />
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 170,
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
    color: 'black',
    position: 'absolute',
    top: 20,
    left: 25,
    zIndex: 1,
  },
  divider: {
    height: '8%',
    backgroundColor: '#D3AFD4',
  },
});
