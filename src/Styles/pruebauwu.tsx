import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import { Product } from '../interfaces/ProductsCategoryInterface';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Button } from 'react-native-paper';
import { useToast, Modal, useDisclose, Row, Actionsheet } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartShopping, faCreditCard, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CartContext } from '../context/cart/CartContext';

interface Props {
  product: Product;
  route: any;
}

export const ShoppingScreen = ({ product }: Props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [datosGuardados, setDatosGuardados] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<'Tarjeta' | 'PagoContraEntrega' | null>(null);

  const { cart } = useContext(CartContext);
  const { removeItemFromCart, clearCart, incrementQuantity, decrementQuantity, addToCart } = useContext(CartContext);
  const { totalProducts, totalPrice } = useContext(CartContext);

  // Utiliza isProductInCart para verificar si el producto está en el carrito
  const productIsInCart = isProductInCart(product._id);

  const [quantity, setQuantity] = useState(productIsInCart ? cart.find(item => item.product._id === product._id).quantity : 1);

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= availableQuantity) {
      addToCart(product, quantity);
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
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.directiorow}>
        </View>
        <View >
          <TouchableOpacity onPress={onOpen}>
            <View style={styles.viewuwu}>
              <View style={styles.cardcontainer}>
                <Icon name="location-outline" size={30} color="white" />
                <Text style={styles.textblack}>Enviar a :
                  {datosGuardados && <Text style={styles.textgray}> {datosGuardados.nombre} , {datosGuardados.selectedAddress}  </Text>}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Aquí colocamos el botón "Agregar al carrito" */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartButtonText}>
          {productIsInCart ? 'Actualizar carrito' : 'Agregar al carrito'}
        </Text>
      </TouchableOpacity>

    </>
  );
};