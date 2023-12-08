import { Product } from "../../interfaces/ProductInterfaces";

export interface ProductState {
    errorMessage: string;
    product: Product | null;
    products: Product[];
    message: string | null;
    success: boolean | null;
  }
  
  export type ProductAction =
    | { type: 'getAllProducts'; payload: Product[] }
    | { type: 'addError'; payload: string }
    | { type: 'removeError' }
    | { type: 'removeSuccess' }
    | { type: 'getProduct'; payload: Product }
    ;
  
  export const ProductReducer = (
    state: ProductState,
    action: ProductAction,
  ): ProductState => {
    switch (action.type) {
      case 'addError':
        return {
          ...state,
          errorMessage: action.payload,
          success: false,
        };
  
      case 'getAllProducts':
        return {
          ...state,
          errorMessage: '',
          products: action.payload,
          success: false,
        };
  
      case 'getProduct':
        return {
          ...state,
          errorMessage: '',
          product: action.payload,
          success: false,
        };
  
      case 'removeSuccess':
        return {
          ...state,
          success: false,
        };
  
      case 'removeError':
        return {
          ...state,
          errorMessage: '',
        };
  
      default:
        return state;
    }
  };