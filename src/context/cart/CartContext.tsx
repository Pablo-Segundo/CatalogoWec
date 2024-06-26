import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useReducer, useState} from 'react';
import {Product} from '../../interfaces/ProductsCategoryInterface';
import {CartItem, CartReducer, CartState} from './CartReducer';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import API from '../../API/API';

type CartContextProps = {
  cart: CartItem[];
  success: boolean;
  errorMessage: string;
  totalProducts: number;
  totalPrice: number;
  discount: number;
  addToCart: (item: Product, quantity: number, name: string) => void;
  removeItemFromCart: (productId: string) => void;
  clearCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  TotalProductsAndPrice: (cart: CartItem[]) => void;
  countUniqueProducts: (cart: CartItem[]) => void;
  UpdateColorButton: (productId: string) => void;
  loadCartFromStorage: () => void;
  updateTotalPrice: () => void;
  CartContextProvider: (children: any) => void;
  applyCoupon: (coupon: string) => void;
  incrementCart: (productId: string) => void;
  calculateTotalWithDiscount: () => void;
  incrementBrandProduct: (productId: string) => void;
};

const CartInitialState: CartState = {
  errorMessage: '',
  success: false,
  cart: [],
  totalProducts: 0,
  totalPrice: 0,
  coupon: '',
  discountedTotal: 0,
  discount: 0
};
export const CartContext = createContext({} as CartContextProps);
export const CartProvider = ({children}: any) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [state, dispatch] = useReducer(CartReducer, CartInitialState);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  useEffect(() => {
    const loadDataFromStorage = async () => {
      try {
        const cartArray = await AsyncStorage.getItem('cart');
        if (cartArray) {
          const cart = JSON.parse(cartArray);
          const { totalProducts, totalPrice } = TotalProductsAndPrice(cart);
          setTotalProducts(totalProducts);
          setTotalPrice(totalPrice);
          dispatch({
            type: 'loadCart',
            payload: { cart: cart, totalProducts: totalProducts, totalPrice: totalPrice },
          });
        }

        const storedDiscount = await AsyncStorage.getItem('discount');
        if (storedDiscount) {
          const discountData = JSON.parse(storedDiscount);
          setDiscount(discountData.discount);
          setIsCouponApplied(discountData.isCouponApplied);
        }
      } catch (error) {
        console.error('Error loading data from storage:', error);
      }
    };

    loadDataFromStorage();
  }, []);

  const TotalProductsAndPrice = (
    cart: CartItem[],
  ): {totalProducts: number; totalPrice: number} => {
    const totalProducts = cart.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0,
    );
    const totalPrice = cart.reduce(
      (total: number, item: CartItem) =>
        total + item.quantity * item.product.price,
      0,
    );
    return {totalProducts, totalPrice};
  };

  const addToCart = async (product: Product, quantity: number) => {
    try {
      const cartArray = await AsyncStorage.getItem('cart');
      let cart: any = [];
      const cartItem: any = {
        product,
        quantity: quantity,
      };
      if (cartArray) {
        cart = JSON.parse(cartArray);
        const productExists = cart.find(
          (item: any) => item.product._id === product._id,
        );
        if (productExists) {
          const index = cart.findIndex(
            (item: any) => item.product._id === product._id,
          );
          cart[index].quantity++;
          const updatedCart = [...cart];
          await AsyncStorage.setItem('cart', JSON.stringify(cart));
          dispatch({
            type: 'addToCart',
            payload: {
              cart: updatedCart,
              errorMessage: 'Producto añadido al carrito',
            },
          });
        } else {
          cart.push(cartItem);
          await AsyncStorage.setItem('cart', JSON.stringify(cart));
          dispatch({
            type: 'addToCart',
            payload: {
              cart: cart,
              errorMessage: 'Producto añadido al carrito',
            },
          });
        }
      } else {
        cart.push(cartItem);
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
          type: 'addToCart',
          payload: {cart: cart, errorMessage: 'Producto añadido al carrito'},
        });
      }
      const {totalProducts, totalPrice} = TotalProductsAndPrice(cart);
      dispatch({
        type: 'addToCart',
        payload: {
          cart: cart,
          errorMessage: 'Producto añadido al carrito',
          totalProducts,
          totalPrice,
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const removeItemFromCart = async (productId: string) => {
    try {
      const cartArray = await AsyncStorage.getItem('cart');
      let cart: any = [];
      if (cartArray) {
        cart = JSON.parse(cartArray);
        const index = cart.findIndex(
          (item: any) => item.product._id === productId,
        );
        if (index !== -1) {
          cart.splice(index, 1);
          await AsyncStorage.setItem('cart', JSON.stringify(cart));
          const {totalProducts, totalPrice} = TotalProductsAndPrice(cart);
          dispatch({
            type: 'removeItemFromCart',
            payload: {
              cart: cart,
              errorMessage: 'Producto eliminado del carrito',
              totalProducts,
              totalPrice,
            },
          });
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  //-----------------------------------------------------
  const clearCart = async () => {
    try {
      AsyncStorage.removeItem('cart');
      const {totalProducts, totalPrice} = TotalProductsAndPrice([]);
      dispatch({
        type: 'clearCart',
        payload: {
          cart: [],
          errorMessage: 'Carrito vaciado',
          totalProducts,
          totalPrice,
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  //---------------------------------------------
  const countUniqueProducts = (cart: CartItem[]): number => {
    const uniqueProductIds = new Set<string>();

    for (const item of cart) {
      uniqueProductIds.add(item.product._id);
    }

    return uniqueProductIds.size;
  };
  //----------------------------------------
  const decrementQuantity = async (productId: string) => {
    try {
      const cartArray = await AsyncStorage.getItem('cart');
      let cart: any = [];
      if (cartArray) {
        cart = JSON.parse(cartArray);
        const index = cart.findIndex(
          (item: any) => item.product._id === productId,
        );
        if (index !== -1) {
          const cartItem = cart[index];

          if (cartItem.quantity > 1) {
            cartItem.quantity--;
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            const {totalProducts, totalPrice} = TotalProductsAndPrice(cart);
            dispatch({
              type: 'decrementQuantity',
              payload: {
                cart,
                errorMessage: 'Cantidad decrementada',
                totalProducts,
                totalPrice,
              },
            });
          } else {
            console.log('Cantidad mínima alcanzada');
          }
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const incrementQuantity = async (productId: string) => {
    try {
      const cartArray = await AsyncStorage.getItem('cart');
      let cart: any = [];
      if (cartArray) {
        cart = JSON.parse(cartArray);
        const index = cart.findIndex(
          (item: any) => item.product._id === productId,
        );
        if (index !== -1) {
          const cartItem = cart[index];

          if (cartItem.quantity < cartItem.product.availableQuantity) {
            cartItem.quantity++;
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            const {totalProducts, totalPrice} = TotalProductsAndPrice(cart);
            dispatch({
              type: 'incrementQuantity',
              payload: {
                cart,
                errorMessage: 'Cantidad incrementada',
                totalProducts,
                totalPrice,
              },
            });
          } else {
            console.log('Cantidad máxima alcanzada unu');
          }
        }
      }
    } catch (error: any) {
      console.log(error);
   
    }
  };

  const incrementCart = async (productId: string) => {
    try {
      const cartArray = await AsyncStorage.getItem('cart');
      let cart: any = [];
      if (cartArray) {
        cart = JSON.parse(cartArray);
        const index = cart.findIndex(
          (item: any) => item.product._id === productId,
        );
        if (index !== -1) {
          const cartItem = cart[index];
          if (cartItem.quantity < cartItem.product.quantity) {
            cartItem.quantity++;
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            const {totalProducts, totalPrice} = TotalProductsAndPrice(cart);
            dispatch({
              type: 'incrementQuantity',
              payload: {
                cart,
                errorMessage: 'Cantidad incrementada',
                totalProducts,
                totalPrice,
              },
            });
          } else {
            Toast.show({
              type: 'info',
              text1: 'Cantidad excedida',
              text2: 'La cantidad seleccionada supera el stock disponible',
            });
          }
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const UpdateColorButton = async (productId: string): any => {
    try {
      const cartArray = await AsyncStorage.getItem('cart');
      let cart: any = [];
      if (cartArray) {
        cart = JSON.parse(cartArray);
        const productExists = cart.some(
          (item: any) => item.product._id === productId,
        );
        return productExists;
      }
      return false;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  };

  const loadCartFromStorage = async () => {
    try {
      const cartArray = await AsyncStorage.getItem('cart');
      console.log(cartArray, 'estos datos xd');

      if (cartArray) {
        const cart = JSON.parse(cartArray);
        dispatch({type: 'loadCart', payload: {cart: cart}});
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  };

  const filterdatos = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        const cart = JSON.parse(storedCart);
        const regularProductsCart = cart.filter(
          item =>
            item.product_id.category !== '62b0d1135911da2ebfdc92c3' &&
            item.product_id.discount === 0,
        );
        const discountProductsCart = cart.filter(
          item => item.product_id.discount > 0,
        );
        const wapizimaCanvasCart = cart.filter(
          item => item.product_id.category === '62b0d1135911da2ebfdc92c3',
        );
        console.log('Productos normales :', regularProductsCart);
        console.log('Productos con descuento:', discountProductsCart);
        console.log('Wapizima Canvas :', wapizimaCanvasCart);
      }
    } catch (error) {
      console.log('Error al filtrar datos :', error);
    }
  };

  const applyCoupon = async (coupon: string) => {
    if (isCouponApplied) {
      Toast.show({
        type: 'info',
        text1: 'Cupón ya aplicado',
        text2: 'El cupón ya se ha aplicado a tu pedido.',
      });
      return;
    }

    try {
      const response = await API.get(`/coupons/code/${coupon}`);
      if (response.status === 200) {
        const couponData = response.data.coupon;
        const totalPriceWithDiscount = calculateTotalWithDiscount(state.cart, couponData);

        setTotalPrice(totalPriceWithDiscount);
        setIsCouponApplied(true);

        dispatch({
          type: 'applyCoupon',
          payload: {
            cart: state.cart,
            errorMessage: '',
            couponCode: coupon,
            discount: couponData.discount,
            totalPrice: totalPriceWithDiscount,
          },
        });

        await AsyncStorage.setItem('discount', JSON.stringify({ discount: couponData.discount, isCouponApplied: true }));

        Toast.show({
          type: 'success',
          text1: `Cupón aplicado del: ${couponData.discount}% `,
          text2: `Se ha aplicado un descuento de ${totalPrice.toFixed(2) - totalPriceWithDiscount.toFixed(2)} MNX.`,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Cupón inválido',
          text2: 'El código de descuento no es válido.',
        });
      }
    } catch (error) {
      console.log('Error al verificar el cupón:', error);
      Toast.show({
        type: 'error',
        text1: 'Error al verificar el cupón',
        text2: 'Ocurrió un problema al verificar el cupón. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  };

  const calculateTotalWithDiscount = (cart, coupon) => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    if (coupon) {
      const discount = coupon.discount;
      const discountedTotal = (totalPrice * discount) / 100;
      totalPrice -= discountedTotal;
    }
  
    return totalPrice;
  };

  const incrementBrandProduct = async (product: Product, quantity: number) => {
    try {
      const cartArray = await AsyncStorage.getItem('cart');
      let cart = [];
      if (cartArray) {
        cart = JSON.parse(cartArray);
        const index = cart.findIndex(
          (item) => item.product._id === product._id
        );
        if (index !== -1) {
          const cartItem = cart[index];
  
          if (cartItem.quantity + quantity <= cartItem.product.quantity) {
            cartItem.quantity += quantity;
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            const { totalProducts, totalPrice } = TotalProductsAndPrice(cart);
            dispatch({
              type: 'incrementQuantity',
              payload: {
                cart,
                errorMessage: 'Cantidad incrementada',
                totalProducts,
                totalPrice,
              },
            });
          } else {
            Toast.show({
              type: 'info',
              text1: 'Cantidad excedida',
              text2: 'La cantidad seleccionada supera el stock disponible',
            });
          }
        }
      }
    } catch (error: any) {
      console.log(error);
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
        incrementCart,
        incrementBrandProduct,
        
        ...state,
      }}>
      {children}
    </CartContext.Provider>
  );
};
