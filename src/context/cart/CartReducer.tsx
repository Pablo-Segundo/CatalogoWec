import { State } from "react-native-gesture-handler";
import { Product } from "../../interfaces/ProductsCategoryInterface";


export interface CartState {
    cart: CartItem[];
    errorMessage: string;
    success: boolean;
    totalProducts: number;
    totalPrice: number;
  }

  export interface CartItem {
    product: Product;
    quantity: number;
  }

export type CartAction= | {
    type: 'addToCart';
    payload: {
        cart: CartItem[]; errorMessage: string,
        totalProducts: number;
        totalPrice: number;
    }
    | {   
     type: 'removeItemFromCart';
     payload: {
        cart: CartItem[]; errorMessage: string,
        totalProducts: number;
        totalPrice: number;
        }  
    }
    | {
    type: 'clearCart';
    payload: {
        cart: CartItem[]; errorMessage: string,
        totalProducts: number;
        totalPrice: number;
       }
    } 
    | {
    type: 'incrementQuantity';
    payload: {
        cart: CartItem[]; errorMessage: string,
        totalProducts: number;
        totalPrice: number;
       }    
    }
    | {
    type: 'decrementQuantity';
    payload: {
        cart: CartItem[]; errorMessage: string,
        totalProducts: number;
        totalPrice: number;
           }    
    }
    | {
        type: 'TotalProductsAndPrice';
        payload: {
            cart: CartItem[];
            errorMessage: string,
            totalProducts: number;
            totalPrice: number;
        }
    }
    | {
        type: '';
        payload: {
            cart: CartItem[];
            errorMessage: string,
            totalProducts: number;
            totalPrice: number;
        }
    } 
    | {
        type: 'UpdateColorButton';
        payload: {
            cart: CartItem[]; 
            errorMessage: string,
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
                totalProducts: action.payload.totalProducts,
                totalPrice: action.payload.totalPrice,
            };
            case 'removeItemFromCart':
            return {
                ...state,
                cart: action.payload.cart,
                errorMessage:  action.payload.errorMessage,
                success: false,
                totalProducts: action.payload.totalProducts,
                totalPrice: action.payload.totalPrice,
            };
            case 'clearCart':
            return {
                ...state,
                cart: action.payload.cart,
                errorMessage:  action.payload.errorMessage,
                success: false,
                totalProducts: action.payload.totalProducts,
                totalPrice: action.payload.totalPrice,
            };
            case 'incrementQuantity':
                return {
                    ...state,
                    cart: action.payload.cart,
                    errorMessage:  action.payload.errorMessage,
                    success: false,
                    totalProducts: action.payload.totalProducts,
                    totalPrice: action.payload.totalPrice,
                };
            case 'decrementQuantity':
                 return {
                    ...state,
                    cart: action.payload.cart,
                    errorMessage:  action.payload.errorMessage,
                    success: false,
                    totalProducts: action.payload.totalProducts,
                 totalPrice: action.payload.totalPrice,
                    };
            case 'TotalProductsAndPrice':
                const { totalProducts, totalPrice } = TotalProductsAndPrice (action.payload.cart);
                 return {
                   ...state,
                    cart: action.payload.cart,
                    errorMessage: action.payload.errorMessage,
                    success: false,
                    totalProducts: action.payload.totalProducts,
                    totalPrice: action.payload.totalPrice,
                 };
            case 'countUniqueProducts':
            return {
                ...state,
                cart: action.payload.cart,
                errorMessage:  action.payload.errorMessage,
                success: false,
                totalProducts: action.payload.totalProducts,
                totalPrice: action.payload.totalPrice,
            };
            case 'UpdateColorButton':
                return {
                    ...state,
                    cart: action.payload.cart,
                    errorMessage:  action.payload.errorMessage,
                    success: false,
                    totalProducts: action.payload.totalProducts,
                    totalPrice: action.payload.totalPrice,
                };
          




            default:
                return state;
         } 
};

// function TotalProductsAndPrice(cart: CartItem[]): { totalProducts: number; totalPrice: number } {
//     const totalProducts = cart.reduce((total, item) => total + item.quantity, 0);
//     const totalPrice = cart.reduce((total, item) => total + item.quantity * item.product.price, 0);
//     return { totalProducts, totalPrice };
// }

