import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, ImageBackground, ScrollView ,} from 'react-native';
import API from '../../API/API';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadingScreen from '../Products/loadintgScreen';
import { NoInternet } from '../../components/NoInternet';
import { Card } from 'react-native-paper';
import { Fab, } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props extends NativeStackScreenProps<any, any> { }

export const CategoriesScreen = ({ route, navigation }: Props) => {
  const [categories, setCategories] = useState();
  const { height, width } = Dimensions.get('window');
  const [brands, setBrands] = useState([]);


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

  const getBrands = async () => {
    try {
      const { data } = await API.get('/brands');
      const brands = data.brands
      setBrands(brands); 

    } catch (error) {
      console.log(error);
    }
  };
 

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  if (!categories || !brands) {
    return (
      <LoadingScreen />
    );
  }
  
  return (
    <>
    <ScrollView>
    <View>
        {/* <Text style={{color:'black', fontSize: 18, fontWeight: 'bold'}}> Productos Agregados</Text> */}
        <Card style={styles.cardContainer}>
          <Text style={{color:'black', fontSize: 20, fontWeight: 'bold'}} > Marcas </Text>
        </Card>
      </View>

   

  
    <FlatList
      data={brands}
      horizontal={true}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('brands', item)} >
        <View style={styles.directiorow}>
         
          <View style={styles.imageContainer}>
          <Text style={{color:'black', fontSize: 16,fontWeight: 'bold'}}> -{item.name}-</Text> 
            <ImageBackground source={{ uri: item.images['400x400'] }}  style={styles.imagebrand}>
            </ImageBackground>  
  
            </View> 
          
          </View>
          </TouchableOpacity>
         
          
      )}
    />
   
      <View>
        {/* <Text style={{color:'black', fontSize: 18, fontWeight: 'bold'}}> Productos Agregados</Text> */}
        <Card style={styles.cardContainer}>
          <Text style={{color:'black', fontSize: 20, fontWeight: 'bold'}} > Categorias  </Text>
        </Card>
      </View>
      <View style={{marginTop: 10}}></View>
 

   
      <Fab  renderInPortal={true} shadow={1} 
      bgColor={'#ff1493'}
      //onPress={() => navigation.navigate('')}
      size="sm" bottom={70} 
      icon={  <Icon name="circle-o-notch" size={30} color="white" />} />
     

        <FlatList
          data={categories}
          style={{alignSelf: 'center',width: '100%'}}
          numColumns={height / width > 1.6 ? 1 : 2}
          renderItem={({ item }) => (
            <>
           
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Products', item)}>
              <ImageBackground source={{ uri: item.imagesMobile['400x400'] }} resizeMode="cover" style={styles.image}>
                <View style={styles.overlay}>
                  <Text style={styles.text}>-{item.name}-</Text>
                </View>
              </ImageBackground>
              
            </TouchableOpacity>

      

            </>
          )}
        />

        
        
        </ScrollView>
        </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').height / Dimensions.get('window').width > 1.6 ? '100%' : '48%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: Dimensions.get('window').height / Dimensions.get('window').width > 1.6 ? 0 : 5,
    marginBottom: 5,
  
  },
  image: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
  },

  imagebrand: {
    width: 105,
    height: 100,

    resizeMode: 'cover',
  }, 

  imageContainer: {
    width: 150,
    marginRight: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10
  },
  directiorow: {
    flexDirection: 'row',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: Dimensions.get('window').height * .03,
    fontWeight: 'bold',

  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10
  },
});
