import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-paper';


export const ShoppingScreen = () => {

  const navigation = useNavigation();
  const data = [
    { id: 1, name: 'Producto 1', price: 10 },
     { id: 2, name: 'Producto 2', price: 20 },
    // { id: 3, name: 'Producto 3', price: 30 },
  ];

  // const handleBuy = () => {
    // Lógica para realizar la compra del producto con el ID dado
    // console.log('Compraste el producto con ID:', id);
  // };

  return (
    <>
    <View style={styles.style}>
    <Text style={[styles.TextContainer, { fontSize: 20, color: '#FFF' }]}>WAPIZIMA</Text>
      <TouchableOpacity style={styles.IconContainer}
        onPress={() => navigation.navigate('shopping', {})}>
        <View style={styles.IconCircle}>
      <Icon name="shopping-cart" size={30} color="#000" />
    </View>
    </TouchableOpacity>
      </View> 

      <View>
        <Text style={styles.TextContainer}> Productos añadidos </Text>
      </View>

  

       <Card style={styles.cardContainer}>
        <Text>Datos de direcion </Text>
        </Card>    
   




    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Nombre</Text>
        <Text  style={styles.headerText}> Cantidad</Text>
        <Text style={styles.headerText}>Precio</Text>
      </View>

      {data.map((item) => (
        <View style={styles.tableRow} key={item.id}>
          <Text style={styles.rowText}>{item.name}</Text>
          <Text style={styles.rowText}>{item.price}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>

   
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer:{
    height: '30%',
    display: 'flex',
    flexDirection: 'column',

  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rowText: {
    fontSize: 14,
  },
  buyButton: {
    backgroundColor: '#D3AFD4',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  TextContainer: {
    color: 'black',
    position: 'absolute',
    top: 20,
    left: 25,
    zIndex: 1,
  },
  IconContainer: {
    position: 'absolute',
    top: 15,
    right: 25,
    zIndex: 1,
  },
  IconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  style:{
    height: '10%',
      backgroundColor: '#D3AFD4',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    
  }
});


