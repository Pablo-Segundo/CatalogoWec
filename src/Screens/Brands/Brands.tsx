import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import API from '../../API/API';
import {Card} from 'react-native-paper';
import {Product} from '../../interfaces/ProductsCategoryInterface';
import {CartContext} from '../../context/cart/CartContext';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Actionsheet, useDisclose} from 'native-base';
import {InternetComponet} from '../../components/InternetComponet';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  product: Product;
}

interface Props extends NativeStackScreenProps<any, any> {}

export const Brands = ({route, navigation, product}: Props) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectcategory, setSelectcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {incrementQuantity, decrementQuantity, addToCart, UpdateColorButton} =
    useContext(CartContext);

  const {cart, incrementCart} = useContext(CartContext);

  // const cartProduct = cart.find(item => item.product._id === item._id);

  const initialQuantity = cartProduct ? cartProduct.quantity : 1;

  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const cartProduct = cart.find(
    item => item.product._id === selectedProduct?._id,
  );
  const {isOpen, onOpen, onClose} = useDisclose();
  const [availableQuantity, setAvailableQuantity] = useState(quantity);
  const [brands, setBrands] = useState([]);
  const isProductInCart = cartProduct !== undefined;

  const [isInCart, setIsInCart] = useState(false);

  const getProducts = async (_id: string, pageNumber: number = 1) => {
    try {
      setIsLoadingMore(true);
      const {data} = await API.get(
        `/products/category-brand-pagination/${_id}/${route.params?._id}?limit=${limit}&page=${pageNumber}`,
      );
      const newProducts = data.products;
      if (pageNumber === 1) {
        setProducts(newProducts);
      } else {
        setProducts([...products, ...newProducts]);
      }
      setSelectedCategory(_id);
      setPage(pageNumber + 1);
      setLimit(data.limit);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const getBrands = async () => {
    try {
      const {data} = await API.get(`/categories/brand/${route.params?._id}`);
      setCategories(data.categories);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (availableQuantity === 0) {
      setQuantity(0);
    } else if (quantity > availableQuantity) {
      setQuantity(availableQuantity);
    }
  }, [availableQuantity]);

  const handleCategorySelect = (_id: string) => {
    setSelectedCategory(_id);
    setProducts([]);
    setPage(1);
    setLimit(5);
    getProducts(_id);
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    const productInCart = cart.find(
      item => item.product._id === selectedProduct?._id,
    );
    setIsInCart(!!productInCart);
  }, [selectedProduct, cart]);

  useEffect(() => {
    if (availableQuantity === 0) {
      setIsCardDisabled(true);
    }
  }, [availableQuantity]);

  useEffect(() => {
    if (categories.length > 0) {
      handleCategorySelect(categories[0]._id);
      setIsLoading(false);
    }
  }, [categories]);

  useEffect(() => {
    if (selectcategory) {
      setProducts([]);
      setPage(1);
      setLimit(5);
      getProducts(selectcategory);
    }
  }, [selectcategory]);

  const renderFooter = () => {
    if (isLoadingMore) {
      return (
        <ActivityIndicator
          style={{marginVertical: 50}}
          size="large"
          color="#ff1493"
        />
      );
    }
    return null;
  };

  const masdatos = () => {
    if (!isLoadingMore && products.length >= 5) {
      const nextPage = Math.ceil(products.length / limit) + 1;
      getProducts(selectedCategory, nextPage);
    }
  };

  return (
    <>
      <InternetComponet>

        <View>
          <Card style={styles.cardContainer}>
            <View>
              <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                Categorias{' '}
              </Text>
            </View>
          </Card>
        </View>

        <View>

    
      
          <FlatList
            data={categories}
            horizontal={true}
            renderItem={({item, index}) => (
              <View style={{marginVertical: 10}}>
                <TouchableOpacity
                  onPress={() => handleCategorySelect(item._id)}
                  style={[
                    styles.categoryCard,
                    selectedCategory === item._id &&
                      styles.selectedCategoryCard,
                  ]}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      color:
                        selectedCategory === item._id ? '#ff1493' : 'white',
                      fontWeight:
                        selectedCategory === item._id ? 'bold' : 'normal',
                      flexDirection: 'row',
                      marginVertical: 16,
                      borderRadius: 5,
                      fontSize: 16,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>   
              </View>
            )}
          />
        </View>

    

        
  
        {/* {products. length > 0 ? ( */}

        <FlatList
          data={products}
          renderItem={({item}) => (
            <>
              <TouchableOpacity
                onPress={() => {
                  setSelectedProduct(item);
                  onOpen();
                }}>
                <Card style={styles.cardContainer}>
                  <View style={styles.rowContainer}>
                    <TouchableOpacity>
                      <View style={styles.imageContainer}>
                        <Image
                          style={styles.image}
                          source={{uri: item.multimedia[0].images['400x400']}}
                        />
                      </View>
                    </TouchableOpacity>
                    <View>
                      <View style={styles.tableRow}>
                        <Text
                          style={styles.rowText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item.name}
                        </Text>
                      </View>

                      <View style={styles.tableRow}>
                        <Text style={{color: '#ff1493'}}>Precio: </Text>
                        <Text style={styles.rowTextPrice}>
                          {' '}
                          {item.price.toFixed(2)} MNX
                        </Text>
                      </View>

                      <View style={styles.tableRow}>
                        <Text style={styles.rowText}>Disponible:</Text>
                        <Text style={styles.rowText2}>({item.quantity})</Text>
                      </View>
                      <View style={styles.rowContainer}>
                        <View style={styles.quantityContainer}>
                          <TouchableOpacity
                            onPress={() => {
                              decrementQuantity(selectedProduct._id);
                              setQuantity(quantity - 1);
                            }}
                            style={styles.quantityButton}
                            disabled={quantity <= 1}>
                            <Text style={styles.quantityButtonText}>-</Text>
                          </TouchableOpacity>

                          <Text style={styles.quantity}>{quantity}</Text>
                          <TouchableOpacity
                            onPress={() => {
                              if (item.product.quantity > item.quantity) {
                                incrementCart(item.product._id);
                              } else {
                                Toast.show({
                                  type: 'info',
                                  text1: 'Cantidad excedida',
                                  text2:
                                    'La cantidad seleccionada supera el stock disponible',
                                });
                              }
                            }}
                            style={styles.quantityButton}
                            disabled={quantity >= availableQuantity}>
                            <Text style={styles.quantityButtonText}>+</Text>
                          </TouchableOpacity>
                        </View>

                        <View style={styles.tableRowrigh}>
                          <TouchableOpacity
                            style={
                              cart.some(
                                cartItem => cartItem.product._id === item._id,
                              )
                                ? styles.productInCartButton
                                : styles.addToCartBrands
                            }
                            onPress={() => {
                              setQuantity(1);
                              if (
                                quantity > 0 &&
                                quantity <= availableQuantity
                              ) {
                                if (!isProductInCart) {
                                  addToCart(item, quantity);
                                  Toast.show({
                                    type: 'success',
                                    text1: 'Producto agregado',
                                    text2:
                                      'El producto se agregó al carrito de compras',
                                  });
                                } else {
                                  Toast.show({
                                    type: 'info',
                                    text1: 'Producto ya en el carrito',
                                    text2:
                                      'Este producto ya está en tu carrito de compras',
                                  });
                                }
                              } else if (quantity <= 0) {
                                Toast.show({
                                  type: 'error',
                                  text1: 'Ninguna cantidad seleccionada',
                                  text2:
                                    'Debe seleccionar al menos un producto',
                                });
                              } else {
                                Toast.show({
                                  type: 'error',
                                  text1: 'Cantidad excedida',
                                  text2:
                                    'La cantidad seleccionada supera el stock disponible',
                                });
                              }
                            }}>
                            <Icon
                              style={{marginHorizontal: 10}}
                              name="cart"
                              size={30}
                              color="white"
                            />
                            {/* <Text style={styles.addToCartButtonText}>
                                {cart.some(cartItem => cartItem.product._id === item._id) ? 'Agregado' : 'Agregar'}
                              </Text> */}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            </>
          )}
          onEndReached={masdatos}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />

        {/* // ) : (
        //   <View style={styles.emptyCartContainer}>
        //       <Text style={styles.emptyCartText}>No hay productos :C  </Text>
        //       <TouchableOpacity
        //       style={styles.exploreButton}
        //       onPress={() => navigation.navigate('Wapizima')}
        //       >
        //       <Image source={require('../../assets/lottie/osuxd.png')} style={styles.exploreImage} /> 
        //       <Text style={styles.exploreButtonText}>Explora y agregar productos  </Text>
        //       </TouchableOpacity>
        // </View>

        //     )} */}


        <Actionsheet isOpen={isOpen} onClose={onClose} bg="transparent">
          <Actionsheet.Content>
            {selectedProduct && (
              <View style={styles.cardContainer3}>
                <Card style={styles.cardContaineru}>
                  <Image
                    style={styles.image2}
                    source={{
                      uri: selectedProduct.multimedia[0].images['400x400'],
                    }}
                  />
                </Card>
                <View style={styles.cardContainer3}>
                  <Text
                    style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
                    {selectedProduct.name}
                  </Text>
                </View>
                <View style={{marginTop: 50}}>
                  <Text
                    style={{
                      color: '#ff1493',
                      fontSize: 22,
                      fontWeight: 'bold',
                    }}>
                    Precio: {selectedProduct.price.toFixed(2)} MNX
                  </Text>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                    Disponible: {selectedProduct.quantity}
                  </Text>
                </View>

                <View style={styles.cardContainer}>
                  <Text
                    style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                    Descripcion: ({selectedProduct.description}){' '}
                  </Text>
                </View>

                <View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        decrementQuantity(selectedProduct._id);
                        setQuantity(quantity - 1);
                      }}
                      style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          selectedProduct.quantity > selectedProduct.quantity
                        ) {
                          incrementCart(selectedProduct._id);
                        } else {
                          Toast.show({
                            type: 'info',
                            text1: 'Cantidad excedida',
                            text2:
                              'La cantidad seleccionada supera el stock disponible',
                          });
                        }
                      }}
                      style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center', marginHorizontal: 30}}>
                      <TouchableOpacity
                        style={
                          cart.some(
                            cartItem =>
                              cartItem.product._id === selectedProduct._id,
                          )
                            ? styles.productInCartBrands
                            : styles.addToCartButton
                        }
                        onPress={() => {
                          setQuantity(1);
                          if (quantity > 0 && quantity <= availableQuantity) {
                            if (!isProductInCart) {
                              addToCart(selectedProduct, quantity);
                              Toast.show({
                                type: 'success',
                                text1: 'Producto agregado',
                                text2:
                                  'El producto se agregó al carrito de compras',
                              });
                            } else {
                              Toast.show({
                                type: 'info',
                                text1: 'Producto ya en el carrito',
                                text2:
                                  'Este producto ya está en tu carrito de compras',
                              });
                            }
                          } else if (quantity <= 0) {
                            Toast.show({
                              type: 'error',
                              text1: 'Ninguna cantidad seleccionada',
                              text2: 'Debe seleccionar al menos un producto',
                            });
                          } else {
                            Toast.show({
                              type: 'error',
                              text1: 'Cantidad excedida',
                              text2:
                                'La cantidad seleccionada supera el stock disponible',
                            });
                          }
                        }}>
                        <Text style={styles.addToCartButtonText}>
                          {cart.some(
                            cartItem =>
                              cartItem.product._id === selectedProduct._id,
                          )
                            ? 'Producto agregado'
                            : 'Agregar al carrito'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </Actionsheet.Content>
        </Actionsheet>








      </InternetComponet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  emptyCartText: {
    fontSize: 30,
    marginBottom: 20,
    color: 'gray',
  },
  exploreButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },

  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addToCartButtonText2: {
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
    width: '100%',
  },
  productInCartButton: {
    backgroundColor: '#08FF8F',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginRight: 35,
  },
  productInCartBrands: {
    backgroundColor: '#08FF8F',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },


  selectedCategoryCard: {
    width: 150,
    marginHorizontal: 3,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryCard: {
    width: 150,
    height: 60,
    marginHorizontal: 3,
    alignItems: 'center',
    backgroundColor: '#ff1493',
    marginTop: 20,
    borderRadius: 5,
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
    marginTop: 10,
  },
  cardContainer3: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

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
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,

    // marginHorizontal: 20,
    //backgroundColor: 'gray'
  },
  rowContainer2: {
    flexDirection: 'row',
    position: 'absolute',

    // marginHorizontal: 20,
    //backgroundColor: 'gray'
  },
  addToCartBrands: {
    backgroundColor: '#ff1493',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginRight: 35,
  },
  addToCartButton: {
    backgroundColor: '#ff1493',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
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
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    margin: 10,
  },
  image2: {
    width: Dimensions.get('window').width,
    height: 200,
    resizeMode: 'contain',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 80,
  },
  tableRowrigh: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 90,
    marginLeft: 50,
  },

  rowText: {
    fontSize: 15,
    color: 'black',
    marginRight: 50,
    fontWeight: 'bold',
  },
  rowText2: {
    fontSize: 15,
    color: '#ff1493',
    marginRight: 50,
    fontWeight: 'bold',
  },
  rowTextPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 35,
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
    marginHorizontal: 1,
  },
  cardContaineru: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
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
    marginTop: 10,
  },
  container2: {
    width:
      Dimensions.get('window').height / Dimensions.get('window').width > 1.6
        ? '100%'
        : '48%',
    justifyContent: 'center',
    alignItems: 'center',
    margin:
      Dimensions.get('window').height / Dimensions.get('window').width > 1.6
        ? 0
        : 5,
    marginBottom: 5,
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
