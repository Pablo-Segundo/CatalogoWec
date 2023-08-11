import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, ImageBackground } from 'react-native'; 
import API from '../../API/API';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NoInternet } from '../../components/NoInternet';


interface Props extends NativeStackScreenProps<any, any> {}

export const CategoriesScreen = ({route, navigation} : Props)  => {
  const [categories, setCategories] = useState();
  const { height, width } = Dimensions.get('window');
  const getCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      const categories = data.categories.filter(
        (category: any) => category.totalProducts > 0,
      );
      setCategories(categories);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  

  if (!categories) {
    return (
      <NoInternet/>
    );
  }
    return (
        <FlatList
          data={categories}
          style={{
           alignSelf: 'center',
           width: '100%'
          }}
          numColumns={ height/ width > 1.6 ? 1:2}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('pestanas', item._id )}>
              <ImageBackground source={{ uri: item.imagesMobile['400x400'] }}resizeMode="cover" style={styles.image}>
<View style={styles.overlay}>
                  <Text style={styles.text}>-{item.name}-</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
        
    );
  }
const styles = StyleSheet.create({
  container: {
    width:Dimensions.get('window').height/ Dimensions.get('window').width > 1.6 ? '100%':'48%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: Dimensions.get('window').height/ Dimensions.get('window').width > 1.6 ? 0:5,
    marginBottom: 5
  },
  image: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: Dimensions.get('window').height*.03,
    fontWeight: 'bold',
    
  },
});
