import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, FlatList, Dimensions, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import API from '../API/API';
import { Card } from 'react-native-paper';
import { CartContext } from '../context/cart/CartContext';
import { Toast } from 'react-native-toast-message/lib/src/Toast';0
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingScreen from '../Screens/Products/loadintgScreen';
import { Actionsheet, useDisclose } from 'native-base';
import { Product } from '../interfaces/ProductsCategoryInterface';



interface Props extends NativeStackScreenProps<any, any> { }

export const Brands = ({ route, navigation, }: Props) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectcategory, setSelectcategory] = useState('null');
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();

  const { incrementQuantity, decrementQuantity , addToCart,} = useContext(CartContext);
  const { cart } = useContext(CartContext);
 
  const cartProduct = cart.find((item) => item.product === Brands);
  const initialQuantity = cartProduct ? cartProduct.quantity : 1;
  const [quantity, setQuantity] = useState(initialQuantity);

  const [brands, setBrands] = useState([]);
  const [selectedBrandName, setSelectedBrandName] = useState('');
  const [selectedBrandImage, setSelectedBrandImage] = useState('');
  
  const [currentIndex, setCurrentIndex] = useState(0);


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


  return (
    <>
<View>
      <Card style={styles.cardContainer}>
          <View>
            <Text style={{color:'black', fontSize: 20, fontWeight:'bold'}}>Categorias </Text>
            {/* <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{selectedBrandName}</Text> */}
          </View>
        </Card>
      </View>

      {/* <FlatList
        data={brands}
        horizontal={true}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
   
          </View>
        )}
      /> */}
      <FlatList
        data={categories}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={{ }}>
            <TouchableOpacity
              onPress={() => {
                setProducts([]);
                setPage(1);
                setLimit(4);
                getProducts(item._id);
               
              }}
            >
              <Card style={{ width: 150, marginHorizontal: 3, alignItems: 'center', backgroundColor: '#ff1493', marginTop: 20 }}>
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
    <TouchableOpacity  onPress={onOpen}>

          <Card style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri:item.multimedia[0].images['400x400'] }} />
            </View>
               
            </TouchableOpacity>
       
            <View>
              <View style={styles.tableRow}>
              <Text style={styles.rowText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
            </View>

            <View style={styles.rowContainer}>
                <Text style={styles.rowTextPrice}>{item.price} MNX</Text> 
               <Text  style={styles.rowText}>Disponible:({item.quantity})</Text> 
            </View>

          <View style={styles.rowContainer}>
            <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => {
                decrementQuantity(product._id);
                setQuantity(quantity - 1); 
              }} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={() => {
                incrementQuantity(product._id);
                setQuantity(quantity + 1); 
              }} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>  

  </View>
  





          

            <View style={styles.rowContainer}>
            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => {
                  if (quantity >= 1) {
                    addToCart(products, quantity);
                    Toast.show({
                      type: 'success',
                      text1: 'Producto agregado',
                      text2: 'El producto se agregó al carrito de compras',
                    });
                  } else if (quantity <=0) {
                    Toast.show({
                      type: 'error',
                      text1: 'ninguna cantidad seleccionada ',
                      text2: 'debe que tener al menos un producto',
                    });
                  }
                }}
      >


  <Text style={styles.addToCartButtonText}>Agregar</Text>
</TouchableOpacity>

<Actionsheet isOpen={isOpen} onClose={onClose} >
              <Actionsheet.Content>
                <Card>
                <Image style={styles.image} source={{ uri:item.multimedia[0].images['400x400'] }} />

                </Card>
              <Text style={{color:'black'}}> {item.name} </Text>
              </Actionsheet.Content>
        </Actionsheet>

            </View>
            </View>
          </View>
          </View> 
        </Card>

  

         </TouchableOpacity> 
        

        )}
         onEndReached={masdatos}
        onEndReachedThreshold={0.10}
       ListFooterComponent={renderFooter}
      />
{/* 
<Actionsheet isOpen={isOpen} onClose={onClose} >
              <Actionsheet.Content>
                <Card>
                  <Text> uwu</Text>
                </Card>
              <Text style={{color:'black'}}>
            {Item.namee}
              </Text>
              </Actionsheet.Content>
        </Actionsheet> */}


   


   
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
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
  rowContainer: {
    flexDirection: 'row',
     justifyContent: 'space-between',
    marginTop: 10,
   
    // marginHorizontal: 20,
    //backgroundColor: 'gray'
  },
  addToCartButton: {
    backgroundColor: '#ff1493',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginRight: 35
  }, 
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    width: 100,
    marginRight: 10,

  },
  updateButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#ff1493',
    marginRight: 20,
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
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
     marginRight: 80,
    

  },
  rowText: {
    fontSize: 14,
    color: 'black',
    marginRight: 50
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