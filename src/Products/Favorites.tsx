import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native-gesture-handler";


interface Props {
  product: Product;
  route: any;
}
export const FavoritesScreen = ({ route,product }: Props) => {
  const { favorites } = route.params;
  const navigation = useNavigation();
  return (
   <> 
   <View style={styles.header}>
    <Text style={styles.headerWITHE}> Productos Favoritos  </Text>
  
      <TouchableOpacity
       style={styles.IconContainer}
         onPress={() => navigation.navigate('Shopping', {})}>
       <View style={styles.IconCircle}>
         <Icon name="shopping-cart" size={30} color="#000" />
         </View>
        </TouchableOpacity>
    
   </View>


    <View>
     <Text style={styles.TextProduc}>Tus Productos Favoritos  </Text>
    </View>
    

      <Card style={styles.cardcontent}>
      
      
      {favorites.map((product) => (
        
       // <Text style={styles.TextProducss}  key={product._id}>{product.name}</Text>
         
        //<Image style={styles.TextProducss}  key={product._id}>{product.multimedia}</Image>

        //  <Image style={styles.productImage} key={product._id}>{product.multimedia}</Image>


         <Image style={styles.productImage} source={{ uri: product.multimedia[0].images['400x400'] }} />
      ))}
         
      </Card>
   
      
   



    </>
  );
};


const styles = StyleSheet.create({
  TextContainer: {
    color: 'black',
    position: 'absolute',
    top: 20,
    left: 25,
   
  }, 
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
   
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  TextProduc: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  TextProducss: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  header: {
    padding: 30,
    backgroundColor: '#debdce',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerWITHE: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    padding: 2,
  },
  IconContainer: {
    position: 'absolute',
    top: 20,
    right: 30,
    zIndex: 1,
  },
  IconCircle: {
    width: 45,
    height:  45,
    borderRadius: 25,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardcontent: {
    backgroundColor: '#dcdcdc',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
}
 )