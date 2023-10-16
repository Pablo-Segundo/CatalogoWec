import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useReducer, useState } from "react";
import { Product } from "../../interfaces/ProductsCategoryInterface";
import { CartItem, CartReducer, CartState } from "./CartReducer";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import API from "../../API/API";

type CartContextProps = {
  cart: CartItem[];
  success: boolean;
  errorMessage: string;
  totalProducts: number;
  totalPrice: number;
  couponCode: string;
  discount: number;
  addToCart: (item: Product, quantity: number) => void;
  removeItemFromCart: (productId: string) => void;
  clearCart: () => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  TotalProductsAndPrice: (cart: CartItem[]) => void;
  countUniqueProducts: (cart: CartItem[]) => void;
  UpdateColorButton: (productId: string) => void;
  loadCartFromStorage: () => void;
  applyCoupon: (coupon: string) => void;
};

const CartInitialState: CartState = {
  errorMessage: "",
  success: false,
  cart: [],
  totalProducts: 0,
  totalPrice: 0,
};
export const CartContext = createContext({} as CartContextProps);
export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CartReducer, CartInitialState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  const TotalProductsAndPrice = (
    cart: CartItem[],
  ): { totalProducts: number; totalPrice: number } => {
    const totalProducts = cart.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0,
    );
    const totalPrice = cart.reduce(
      (total: number, item: CartItem) =>
        total + item.quantity * item.product.price,
      0,
    );
    return { totalProducts, totalPrice };
  };

  const addToCart = async (product: Product, quantity: number) => {
    // La lógica para agregar un producto al carrito permanece igual
  };

  const removeItemFromCart = async (productId: string) => {
    // La lógica para eliminar un producto del carrito permanece igual
  };

  const clearCart = async () => {
    // La lógica para vaciar el carrito permanece igual
  };

  const decrementQuantity = async (productId: string) => {
    // La lógica para decrementar la cantidad de un producto permanece igual
  };

  const incrementQuantity = async (productId: string) => {
    // La lógica para incrementar la cantidad de un producto permanece igual
  };

  const UpdateColorButton = async (productId: string): any => {
    // La lógica para actualizar el estado de un botón de color permanece igual
  };

  const loadCartFromStorage = async () => {
    // La lógica para cargar el carrito desde el almacenamiento permanece igual
  };

  const applyCoupon = async (coupon: string) => {
    try {
      const response = await API.get(`/coupons/code/${coupon}`);
      if (response.status === 200) {
        const couponData = response.data;
        const discount = couponData.discountAmount;
        // Actualiza el estado del descuento y el código del cupón
        setDiscount(discount);
        setCouponCode(coupon);
        Toast.show({
          type: 'success',
          text1: 'Cupón aplicado',
          text2: `Se ha aplicado un descuento de ${discount} MNX.`,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Cupón inválido',
          text2: 'El código de descuento no es válido.',
        });
      }
    } catch (error: any) {
      console.log('Error al verificar el cupón:', error);
      Toast.show({
        type: 'error',
        text1: 'Error al verificar el cupón',
        text2: 'Ocurrió un problema al verificar el cupón. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeItemFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
        countUniqueProducts,
        UpdateColorButton,
        loadCartFromStorage,
        applyCoupon,
        couponCode,
        discount,
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
