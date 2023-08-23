import { State } from "react-native-gesture-handler";

export interface CartState {
    cart: [];
    errorMessage: string;
    success: boolean;
    totalProducts: number;
    totalPrice: number;
}

export type CartAction= | {
    type: 'addToCart';
    payload: {
        cart: [], errorMessage: string,
    }
    | {   
     type: 'removeItemFromCart';
     payload: {
            cart: [], errorMessage: string,
        }  
    }
    | {
    type: 'clearCart';
    payload: {
        cart: [], errorMessage: string,
       }
    } 
    | {
    type: 'incrementQuantity';
    payload: {
        cart: [], errorMessage: string,
       }    
    }
    | {
    type: 'decrementQuantity';
    payload: {
        cart: [], errorMessage: string,
           }    
    }
    | {
    type: 'calculateTotalProductsAndPrice'
    payload: {
        cart: [], errorMessage: string,

          }    
    }


}

export const CartReducer = ( state: CartState, action: CartAction): CartState =>{
    switch (action.type) {
        case 'addToCart':
            return {
                ...state,
                cart: action.payload.cart,
                errorMessage:  action.payload.errorMessage,
                success: false,
            };
            case 'removeItemFromCart':
            return {
                ...state,
                cart: action.payload.cart,
                errorMessage:  action.payload.errorMessage,
                success: false,
            };
            case 'clearCart':
            return {
                ...state,
                cart: action.payload.cart,
                errorMessage:  action.payload.errorMessage,
                success: false,
            };
            case 'incrementQuantity':
                return {
                    ...state,
                    cart: action.payload.cart,
                    errorMessage:  action.payload.errorMessage,
                    success: false,
                };
            case 'decrementQuantity':
                 return {
                    ...state,
                    cart: action.payload.cart,
                    errorMessage:  action.payload.errorMessage,
                    success: false,
                    };
            case 'calculateTotalProductsAndPrice':
                  return {
                    ...state,
                    cart: action.payload.cart,
                     errorMessage:  action.payload.errorMessage,
                     success: false,
                     };            




            default:
                return state;
         } 
};