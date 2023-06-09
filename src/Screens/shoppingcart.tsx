import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-paper';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductCard } from '../components/ProductCard';

// interface Props {
//   product: Product;
//   route: any;
// }

// export const ShoppingScreen = ({ route }: Props) => {
  export const ShoppingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [quantity, ProductName] = useState();
const [cart1 ,setCart]= useState([]);

  const cartShopping = async() => {
      const  cart   =   await AsyncStorage.getItem('cart');
      setCart(JSON.parse(cart));
  }
  useEffect(() => {
    cartShopping();
  }, []);


    const deleteData = () => {
      const deleteuwu = [cart1];

      deleteuwu.splice(5, 1);

      AsyncStorage.setItem('cart', JSON.stringify(deleteuwu))

      .then(() => {
        setCart(deleteuwu); 
      })
      .catch(error => {
        console.log(error);
      });
  }

 
    
    
  
     

      

 
 

  return (
    <>
  <View style={styles.header}>
    <Text style={styles.headerText}>WAPIZIMA</Text>
    <TouchableOpacity
      style={styles.shoppingCartButton}
      // onPress={() => navigation.navigate('Shopping', {})}
    >
      <View style={styles.shoppingCartIcon}>
        <Icon name="shopping-cart" size={30} color="#000" />
      </View>
    </TouchableOpacity>
  </View>
     
  <View style={styles.container}>
    
  <Text style={styles.headerText}>Productos Agregados  </Text>
  
  <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Nombre</Text>
          <Text style={styles.headerText}>Cantidad</Text>
          <Text> </Text>
        </View>

    <FlatList
        data={cart1}
        renderItem={({ item }) => (  

          <View style={styles.container}>
          <View style={styles.tableRow}>
            <Text style={styles.rowText}>{item.product_id.name} </Text>
            <Text style={styles.rowText}>{item.quantity}</Text>
            
         </View>
         {/* <Button
           title=""
           action={() => {
                 AsyncStorage.removeItem('');
           }}
            /> */}
          
     

         </View>
      )}/>

    <View>

    <TouchableOpacity style={styles.buyButton} onPress={deleteData} >
            <Text style={styles.buyButtonText}>borrar Datos </Text>
        </TouchableOpacity>


    

     
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}> Comprar</Text>
        </TouchableOpacity>
      </View>

  </View>
</>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#D3AFD4',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  shoppingCartButton: {
    marginRight: 10,
  },
  shoppingCartIcon: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    height: '15%',
  
   
    
    
  },
  table: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    color: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  rowText: {
    fontSize: 14,
    color: 'black',
  },
  buyButton: {
    backgroundColor: '#D3AFD4',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  cardcontent: {
    backgroundColor: '#dcdcdc',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});