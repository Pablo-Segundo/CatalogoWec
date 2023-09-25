import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Dimensions, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import API from '../API/API';
import { Card } from 'react-native-paper';
import { CartContext } from '../context/cart/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingScreen from '../Screens/Products/loadintgScreen';

interface Props extends NativeStackScreenProps<any, any> { }

export const Brands = ({ route, navigation }: Props) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectcategory, setSelectcategory] = useState('null');
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { incrementQuantity, decrementQuantity } = useContext(CartContext);
  const { cart } = useContext(CartContext);
  const cartProduct = cart.find((item) => item.route === route);
  const initialQuantity = cartProduct ? cartProduct.quantity : 1;
  const [quantity, setQuantity] = useState(initialQuantity);
  const [brands, setBrands] = useState([]);
  const [selectedBrandName, setSelectedBrandName] = useState('');
  const [selectedBrandImage, setSelectedBrandImage] = useState('');

  const getBrands2 = async () => {
    try {
      const { data } = await API.get('/brands');
      const brands = data.brands;
      setBrands(brands);
    } catch (error) {
      console.log(error);
    }
  };


  const getProducts = async (_id: string) => {
    try {
      if (isLoadingMore) {
        return;
      }
      setIsLoadingMore(true);
      const { data } = await API.get(
        `/products/category-brand-pagination/${_id}/${route.params?._id}?limit=${limit}&page=${page}`
      );
      const newProducts = data.products;
      setProducts([...products, ...newProducts]);
      setSelectcategory(_id);
      setPage(page + 1);
      setLimit(data.limit);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const getBrands = async () => {
    try {
      const { data } = await API.get(`/categories/brand/${route.params?._id}`);
      setCategories(data.categories);
      getProducts(data.categories[0]._id);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(true);
    }
  };


  useEffect(() => {
    getBrands();
    getBrands2();
  }, []);

  useEffect(() => {
   
    setProducts([]);
    setPage(1);
    setLimit(5);
    getProducts(selectcategory);
  }, [selectcategory]); 

  const renderFooter = () => {
    if (isLoadingMore) {
      return <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="#1E90FF" />;
    }
    return null;
  };

  const masdatos  = () => {
    if (!isLoadingMore ) {
      getProducts(selectcategory);
    }
  };

  if (!categories || !products) {
    return <LoadingScreen />;
  }

  return (
    <>

      <FlatList
        data={brands}
        horizontal={true}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            {/* <View style={styles.container2}> */}
              {/* <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text> */}
              {/* <ImageBackground  source={require('../assets/lottie/fondoxd.jpg')} resizeMode="cover" style={styles.image2}>
          <View style={styles.overlay}>
            <Text style={{color:'white',fontSize: 20,fontWeight: 'bold',}}> uwu </Text>
          </View>
        </ImageBackground>

            </View> */}
          </View>
        )}
      />

      <View>
        <Card style={styles.cardContainer}>
          <View>
            <Text style={{color:'black', fontSize: 20, fontWeight:'bold'}}>Categorias </Text>
            {/* <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{selectedBrandName}</Text> */}
          </View>
        </Card>
      </View>

      <FlatList
        data={categories}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={{ }}>
            <TouchableOpacity
              onPress={() => {
                setProducts([]);
                setPage(1);
                setLimit(5);
                getProducts(item._id);
              }}
            >
               
             
              <Card style={{ width: 150, marginHorizontal: 3, alignItems: 'center', backgroundColor: '#ff1493', marginTop: 5 }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white', fontWeight: 'bold', flexDirection: 'row', marginVertical: 16 }}>
                  {item.name}
                </Text>
              </Card>
              <Text style={{ color: 'black' }}>{item.totalProducts}</Text>
             
              
            </TouchableOpacity>
          </View>
        )}
      />


      <FlatList
        data={products}
        renderItem={({ item }) => (

          <Card style={{ backgroundColor: '#f8f8ff', marginTop: 15, marginHorizontal: 10 }}>
            <View style={styles.rowContainer}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.multimedia[0].images['400x400'] }} />
              </View>
              <View>
                <View style={styles.tableRow}>
                  <Text style={styles.rowText}>{item.name}</Text>
                  {/* <Text style={styles.rowTextPrice}>{item.price} MNX</Text> */}
                </View>
              </View>

             
               

                <View style={styles.rowContainer}>
                  <Text style={styles.rowTextPrice}>{item.price} MNX </Text> 
                  <Text  style={styles.rowText}>X ( {item.quantity} )</Text>
                </View>

              <View style={styles.rowContainer}>
              <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => {
                decrementQuantity(product);
                setQuantity(quantity - 1); 
              }} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => {
                incrementQuantity(product);
                setQuantity(quantity + 1); 
              }} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
                 </TouchableOpacity>   
              </View>

              <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.updateButton} 
                    >
                    <Icon name="create-outline" size={25} color="#ff1493" /> 
                </TouchableOpacity>
                </View>
              </View>
          
            </View> 
          </Card>
        )}
        onEndReached={masdatos}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
     justifyContent: 'space-between',
    marginTop: 10,
    // marginHorizontal: 20,
    backgroundColor: 'gray'

  },
  imageContainer: {
    width: 100,
    marginRight: 5,

  },
  updateButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'gray'
  },
  image: {
    width: 100,
    height: 100,
   
    margin: 10,
  },
  image2: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  tableRow: {
     flexDirection: 'row',
     justifyContent: 'space-between',

  },
  rowText: {
    fontSize: 14,
    color: 'black',
  },
  rowTextPrice: {
    fontSize: 14,
    color: '#1E90FF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
  },
  quantity: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  quantityButton: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginHorizontal: 1

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
  container2: {
    width: Dimensions.get('window').height / Dimensions.get('window').width > 1.6 ? '100%' : '48%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: Dimensions.get('window').height / Dimensions.get('window').width > 1.6 ? 0 : 5,
    marginBottom: 5
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandImage: {
    width: 50, 
    height: 50, 
    resizeMode: 'cover',
    marginBottom: 10, 
  },
  

});