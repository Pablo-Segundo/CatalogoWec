import { State } from "react-native-gesture-handler";
import { Product } from "../../interfaces/ProductsCategoryInterface";


export interface CartState {
    cart: CartItem[];
    errorMessage: string;
    success: boolean;
    totalProducts: number;
    totalPrice: number;
    coupon: string;
    discountedTotal: number;
    discount: number;
  }

  export interface CartItem {
    product: Product;
    quantity: number;
  }

export type CartAction=  {
    type: 'addToCart';
    payload: {
        cart: CartItem[]; errorMessage: string,
        totalProducts: number;
        totalPrice: number;
    }}
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
        type: 'loadCart';
        payload: {
            cart: CartItem[];
            errorMessage: string;
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
    | {
        type: 'applyCoupon';
        payload: {
            cart: CartItem[]; 
            errorMessage: string,
            coupon: string
            discountedTotal: number,
            totalPrice: number,
            discount: number,
        }
    }
    |  {
        type: 'incrementCart';
        payload: {
            cart: CartItem[]; errorMessage: string,
            totalProducts: number;
            totalPrice: number;
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
                 return {
                   ...state,
                    cart: action.payload.cart,
                    errorMessage: action.payload.errorMessage,
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
                };
            case 'loadCart':
                    return {
                        ...state,
                        cart: action.payload.cart,
                        errorMessage:  action.payload.errorMessage,
                        success: false,
                        totalProducts: action.payload.totalProducts,
                        totalPrice: action.payload.totalPrice,
                    };
            case 'applyCoupon': 
                     return {
                         ...state,
                        cart: action.payload.cart, 
                        errorMessage: action.payload.errorMessage,
                        coupon: action.payload.coupon,
                        discountedTotal: action.payload.discountedTotal,
                        totalPrice: action.payload.totalPrice,
                        discount: action.payload.discount,
                        

                    };
            case 'incrementCart':
                    return {
                        ...state,
                        cart: action.payload.cart,
                        errorMessage:  action.payload.errorMessage,
                        success: false,
                        totalProducts: action.payload.totalProducts,
                        totalPrice: action.payload.totalPrice,

                    }
          

            default:
                return state;
         } 
};



