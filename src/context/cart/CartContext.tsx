import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useReducer } from "react";
import { Product } from "../../interfaces/ProductsCategoryInterface";
import { CartReducer, CartState } from "./CartReducer";

type CartContextProps = {
cart : [];
success: boolean
errorMessage: string;
addToCart: (product: Product, quantity: number, name: string) => void;
removeItemFromCart:(productId: string) => void;
clearCart: (productId: string) => void;
incrementQuantity: (productId: string) => void;
decrementQuantity: (productId: string) => void; 
};

const CartInitialState: CartState = {
    errorMessage: '',
    success: false,
    cart: [],
  };

  export const CartContext = createContext({} as CartContextProps);

  export const CartProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(CartReducer, CartInitialState);

    const addToCart = async (product: Product, quantity: number,  ) => {
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
                  (item: any) => item.product._id === product._id
              );
              if (productExists) {
                  const index = cart.findIndex(
                      (item: any) => item.product._id === product._id
                  );
                  
                  cart[index].quantity++;
                  
                  const updatedCart = [...cart];
                
                  await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
                  dispatch({
                      type: 'addToCart',
                      payload: { cart: updatedCart, errorMessage: 'si jala' }
                  });
              } else {
                  cart.push(cartItem);
                  await AsyncStorage.setItem('cart', JSON.stringify(cart));
                  dispatch({
                      type: 'addToCart',
                      payload: { cart: cart, errorMessage: 'si jala' }
                  });
              }
          } else {
              cart.push(cartItem);
              await AsyncStorage.setItem('cart', JSON.stringify(cart));
              dispatch({
                  type: 'addToCart',
                  payload: { cart: cart, errorMessage: 'si jala' }
              });
          }
      } catch (error: any) {
          console.log(error);
      }
  }
  //------------------------------------------------------     
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
              
                dispatch({
                    type: 'addToCart',
                    payload: { cart: cart, errorMessage: 'Producto eliminado del carrito' }
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
                dispatch({
                type: 'addToCart',
                        payload: { cart: [], errorMessage: 'Carrito vaciado' }
                    });
                } catch (error: any) {
                    console.log(error);
                }
            };
     //----------------------------------------
     
     const incrementQuantity = async (productId: string) => {
      try {
          const cartArray = await AsyncStorage.getItem('cart');
          let cart: any = [];
          if (cartArray) {
              cart = JSON.parse(cartArray);
             
              const index = cart.findIndex(
                  (item: any) => item.product._id === productId
              );
              if (index !== -1) {
                  
                  if (cart[index].quantity < cart[index].product.availableQuantity) {
                      cart[index].quantity++;
                     
                      await AsyncStorage.setItem('cart', JSON.stringify(cart));
                     
                      dispatch({
                          type: 'addToCart',
                          payload: { cart: cart, errorMessage: 'Cantidad incrementada' }
                      });
                  } else {
                      console.log('Cantidad máxima alcanzada');
                  }
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
             
              const index = cart.findIndex(
                  (item: any) => item.product._id === productId
              );
              if (index !== -1) {
                
                  if (cart[index].quantity > 1) {
                      cart[index].quantity--;
                     
                      await AsyncStorage.setItem('cart', JSON.stringify(cart));
                     
                      dispatch({
                          type: 'addToCart',
                          payload: { cart: cart, errorMessage: 'Cantidad decrementada' }
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

    return (
<CartContext.Provider value={{
    addToCart,
    removeItemFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,

    ...state,
    }}>
    {children}
</CartContext.Provider>

    )
  }
