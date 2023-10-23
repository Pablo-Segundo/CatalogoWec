export const CartProvider = ({ children }: any) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0); // Agrega un estado para totalProducts
  const [state, dispatch] = useReducer(CartReducer, CartInitialState);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const loadDataFromStorage = async () => {
      try {
        const cartArray = await AsyncStorage.getItem("cart");
        if (cartArray) {
          const cart = JSON.parse(cartArray);
          const { totalProducts, totalPrice } = TotalProductsAndPrice(cart);
          setTotalProducts(totalProducts);
          setTotalPrice(totalPrice);
          dispatch({ type: "loadCart", payload: { cart: cart } });
        }
      } catch (error) {
        console.error("Error loading cart from storage:", error);
      }
    };

    loadDataFromStorage();
  }, []); // Ejecuta la carga de datos al cargar el componente

  // Resto del código sin cambios...
}


<FlatList
  data={products}
  renderItem={({ item }) => (
    <>
      <TouchableOpacity
        onPress={() => {
          setSelectedProduct(item);
          onOpen();
        }}
      >
        <Card style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            {/* ... Otro código ... */}
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={
                  cart.some(cartItem => cartItem.product._id === item._id)
                    ? styles.productInCartButton
                    : styles.addToCartButton
                }
                onPress={() => {
                  const productInCart = cart.find(cartItem => cartItem.product._id === item._id);

                  if (!productInCart) {
                    setQuantity(1);
                    if (quantity > 0 && quantity <= availableQuantity) {
                      addToCart(item, quantity);
                      Toast.show({
                        type: 'success',
                        text1: 'Producto agregado',
                        text2: 'El producto se agregó al carrito de compras',
                      });
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
                        text2: 'La cantidad seleccionada supera el stock disponible',
                      });
                    }
                  } else {
                    Toast.show({
                      type: 'info',
                      text1: 'Producto ya en el carrito',
                      text2: 'Este producto ya está en tu carrito de compras',
                    });
                  }
                }}
                disabled={cart.some(cartItem => cartItem.product._id === item._id)}
              >
                <Text style={styles.addToCartButtonText}>
                  {cart.some(cartItem => cartItem.product._id === item._id) ? 'Agregado' : 'Agregar'}
                </Text>
              </TouchableOpacity>
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


