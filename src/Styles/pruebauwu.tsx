
const isProductInCart = cart.find((item) => item.product._id === product._id) !== undefined;

// ...

<TouchableOpacity
  style={isProductInCart ? styles.productInCartButton : styles.addToCartButton}
  onPress={() => {
    setQuantity(1);
    if (quantity > 0 && quantity <= availableQuantity) {
      if (!isProductInCart) {
        addToCart(product, quantity);
        Toast.show({
          type: 'success',
          text1: 'Producto agregado',
          text2: 'El producto se agregó al carrito de compras',
        });
      } else {
        Toast.show({
          type: 'info',
          text1: 'Producto ya en el carrito',
          text2: 'Este producto ya está en tu carrito de compras',
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
        text2: 'La cantidad seleccionada supera el stock disponible',
      });
    }
  }}
>
  <Text style={styles.addToCartButtonText}>
    {isProductInCart ? 'Agregado ' : 'Agregar'}
  </Text>
</TouchableOpacity>

// ...