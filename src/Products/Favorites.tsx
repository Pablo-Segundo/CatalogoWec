import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';


interface Props {
  product: Product;
  route: any;
}


export const FavoritesScreen = ({ route, product }: Props) => {
  const { favorites } = route.params;
  const navigation = useNavigation();
  return (

    <ScrollView>

        <View style={styles.header}>
          <Text style={styles.headerWITHE}>Productos guardados   </Text>

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
          <View key={product._id} style={styles.productContainer}>
            <Image style={styles.productImage} source={{ uri: product.multimedia[0].images['400x400'] }} />
            <Text style={styles.productName}>{product.name}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
  TextProduc: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 20,
  },
  cardcontent: {
    margin: 20,
    borderRadius: 10,
    padding: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});