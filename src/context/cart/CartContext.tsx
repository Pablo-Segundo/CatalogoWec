import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useReducer, useState, } from "react";
import { Product } from "../../interfaces/ProductsCategoryInterface";
import { CartItem, CartReducer, CartState } from "./CartReducer";
import { Toast } from 'react-native-toast-message/lib/src/Toast';



type CartContextProps = {
cart: CartItem[];
success: boolean
errorMessage: string;
totalProducts: number; 
totalPrice: number;
addToCart: (item: Product, quantity: number, name: string) => void;
removeItemFromCart:(productId: string) => void;
clearCart: (productId: string) => void;
incrementQuantity: (productId: string) => void;
decrementQuantity: (productId: string) => void;
TotalProductsAndPrice:  (cart: CartItem[]) => void;
countUniqueProducts: (cart: CartItem[]) => void; 
UpdateColorButton: (productId: string) => void;

};

const CartInitialState: CartState = {
  errorMessage: '',
  success: false,
  cart: [],
  totalProducts: 0,
  totalPrice: 0,
};
  export const CartContext = createContext({} as CartContextProps);
  export const CartProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(CartReducer, CartInitialState);
    // const CART_STORAGE_KEY = 'cart';


    const TotalProductsAndPrice = (cart: CartItem[]): { totalProducts: number; totalPrice: number } => {
      const totalProducts = cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
      const totalPrice = cart.reduce((total: number, item: CartItem) => total + item.quantity * item.product.price, 0);
      return { totalProducts, totalPrice };
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
          const productExists = cart.find((item: any) => item.product._id === product._id);
          if (productExists) {
            const index = cart.findIndex((item: any) => item.product._id === product._id);
            cart[index].quantity++;
            const updatedCart = [...cart];
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
            dispatch({
              type: 'addToCart',
              payload: { cart: updatedCart, errorMessage: 'Producto añadido al carrito' },
            });
          } else {
            cart.push(cartItem);
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
              type: 'addToCart',
              payload: { cart: cart, errorMessage: 'Producto añadido al carrito' },
            });
          }
        } else {
          cart.push(cartItem);
          await AsyncStorage.setItem('cart', JSON.stringify(cart));
          dispatch({
            type: 'addToCart',
            payload: { cart: cart, errorMessage: 'Producto añadido al carrito' },
          });
        }
        const { totalProducts, totalPrice } = TotalProductsAndPrice(cart);
        dispatch({
          type: 'addToCart',
          payload: { cart: cart, errorMessage: 'Producto añadido al carrito', totalProducts, totalPrice },
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
              (item: any) => item.product._id === productId
            );
            if (index !== -1) {
              cart.splice(index, 1);
              await AsyncStorage.setItem('cart', JSON.stringify(cart));
              const { totalProducts, totalPrice } = TotalProductsAndPrice(cart);
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
          const { totalProducts, totalPrice } = TotalProductsAndPrice([]); 
          dispatch({
            type: 'clearCart',
            payload: { cart: [], errorMessage: 'Carrito vaciado', totalProducts, totalPrice },
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
     const incrementQuantity = async (productId: string) => {
      try {
        const cartArray = await AsyncStorage.getItem('cart');
        let cart: any = [];
        if (cartArray) {
          cart = JSON.parse(cartArray);
          const index = cart.findIndex((item: any) => item.product._id === productId);
          if (index !== -1) {
            const cartItem = cart[index];
            if (cartItem.quantity >= cartItem.product.availableQuantity) {
              console.log("Cantidad máxima alcanzada");
              return;
            }
            cartItem.quantity++; 
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            setQuantity(cartItem.quantity);
            const { totalProducts, totalPrice } = TotalProductsAndPrice(cart);
            dispatch({
              type: 'incrementQuantity',
              payload: { cart, errorMessage: 'Cantidad incrementada', totalProducts, totalPrice },
            });
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    
    const decrementQuantity = async (productId: string) => {
      try {
        const cartArray = await AsyncStorage.getItem('cart');
        let cart: any = [];
        if (cartArray) {
          cart = JSON.parse(cartArray);
          const index = cart.findIndex((item: any) => item.product._id === productId);
          if (index !== -1) {
            const cartItem = cart[index];
          
            if (cartItem.quantity <= 1) {
              console.log("Cantidad mínima alcanzada");
              return;
            }
    
            cartItem.quantity--; 
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
    
          
            setQuantity(cartItem.quantity);
    
            const { totalProducts, totalPrice } = TotalProductsAndPrice(cart);
            dispatch({
              type: 'decrementQuantity',
              payload: { cart, errorMessage: 'Cantidad decrementada', totalProducts, totalPrice },
            });
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    const UpdateColorButton = async (productId: string) => {
      try {
        const cartArray = await AsyncStorage.getItem('cart');
        let cart: any = [];
        if (cartArray) {
          cart = JSON.parse(cartArray);
          const index = cart.findIndex((item: any) => item.product._id === productId);
        if (index <=  productId ){
          console.log("el producto ya esta en el carrito ");
          return;
        }
      }
    } catch (error: any) {
      console.log(error);
    }



    
  }




  //     const decrementQuantity = () => {
  //   if (quantity > 0) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  // const incrementQuantity = () => {
  //   if (quantity < product.quantity) {
  //     setQuantity(quantity + 1);
  //   }
  // };


    return (
  <CartContext.Provider value={{
    addToCart,
    removeItemFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
    TotalProductsAndPrice,
    countUniqueProducts,
    UpdateColorButton,
    ...state,
    }}>
    {children}
  </CartContext.Provider>
    )
  }
  
