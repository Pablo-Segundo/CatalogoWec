import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';


const products = [
  { image: 'https://cloud.wapizima.com/test/products/62ffbf3aab1c395fd79b1fb1/WhatsApp Image 2022-08-19 at 11.44.36 AM.jpeg/original.webp', price: 10 },
  { image: 'ruta/a/imagen2.jpg', price: 20 },
  { image: 'ruta/a/imagen3.jpg', price: 15 },
  { image: 'ruta/a/imagen4.jpg', price: 25 },
  { image: 'ruta/a/imagen2.jpg', price: 20 },
  { image: 'ruta/a/imagen3.jpg', price: 15 },
  { image: 'ruta/a/imagen4.jpg', price: 25 }

];
const ProductItem = ({ image, price }) => {
  const handleBuy = () => {
  };
  return (

    
    <View style={styles.productItem}>
      <Image source={{ uri: image }} style={styles.productImage} />
      <Text style={styles.productPrice}>${price}</Text>
      <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
};



export const Stack = () =>{
   return (
    <View style={{height: '100%'}}>
    <View
      style={{
        height: '10%',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        backgroundColor: '#d3afd4',
      }}
      />
     </View>
   );
};

const App = () => {
   const renderItem = ({ item }) => <ProductItem image={item.image} price={item.price} />;
  return (
      <View style={styles.container}> 
      <FlatList
         data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
     </View>   
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productItem: {
    margin: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black',
    marginVertical: 10,
  },
  buyButton: {
    backgroundColor: '#ff69b4',
    padding: 10,
    borderRadius: 10,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  IconBarra: {
    flex: 1,
    paddingTop: 20, 
    paddingHorizontal: 10,
  },
  IconContainer: {
   position: 'absolute',
   top: 10, 
   right: 10,
   zIndex: 1,
  }

});
export default App; 
