import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useReducer } from "react";
import { Product } from "../../interfaces/ProductsCategoryInterface";
import { CartReducer, CartState } from "./CartReducer";

type CartContextProps = {
cart : [];
success: boolean
errorMessage: string;
addToCart: (product: Product, quantity: number, name: string) => void;
};

const CartInitialState: CartState = {
    errorMessage: '',
    success: false,
    cart: [],
  };

  export const CartContext = createContext({} as CartContextProps);

  export const CartProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(CartReducer, CartInitialState);

    const addToCart =async(product: Product, quantity:number,  )=>{
        try {
            const cartArray = await AsyncStorage.getItem('cart');
            let cart: any = [];
            const cartItem: any ={
              product,
              quantity: quantity,
            };
          
            
            if (cartArray) {
              cart = JSON.parse(cartArray);
              const productExists = cart.find(
                (item: any) => item.product._id === product._id,
              );
          console.log(cartArray,'-------------',productExists);
              
              if (productExists) {
               console.log('si eentra');
                
                const index = cart.findIndex(
                  (item: any) => item.product._id === product._id,
                );
                
                cart[index].quantity = cart[index].quantity++;
                
              }
              else {
                cart.push(cartItem);
              }
            } else{
              cart.push(cartItem);
            }
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
              type: 'addToCart',
              payload: {cart: cart, errorMessage: 'si jala'}
            })
        }catch(error: any) {
       console.log(error);
        }

       
    }

    return (
<CartContext.Provider value={{
    addToCart,
    ...state,
    }}>
    {children}
</CartContext.Provider>

    )
  }
