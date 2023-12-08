import React, { createContext, useReducer } from "react";
import API from "../../API/API";
import { Product,ProductResponse,ProductsResponse } from "../../interfaces/ProductInterfaces";
import { ProductReducer, ProductState } from './ProductReducer';

type ProductContextProps = {
    errorMessage: string;
    product: Product | null;
    products: Product[];
    message: string | null;
    success: boolean | null;
    getProducts: () => void;
    getProduct: (productId: string) => void;
    getIndexProducts: () => void;
    removeError: () => void;
    addError: (message: string) => void;
    removeSuccess: () => void;
  
  };
  
  const ProductInitialState: ProductState = {
    product: null,
    products: [],
    message: null,
    success: false,
    errorMessage: '',
  };
  
  export const ProductContext = createContext({} as ProductContextProps);
  
  export const ProductProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(ProductReducer, ProductInitialState);
  
    const getProducts = async () => {
      try {
        const { data } = await API.get<ProductsResponse>('/products');
        dispatch({
          type: 'getAllProducts',
          payload: data.products,
        });
      } catch (error: any) {
        dispatch({
          type: 'addError',
          payload:
            error.response.data.message ||
            'No se encontró ninguna oferta disponible',
        });
      }
    };
  
    const getIndexProducts = async () => {
      try {
        const { data } = await API.get<ProductsResponse>('/products/index/mobile');
        dispatch({
          type: 'getAllProducts',
          payload: data.products,
        });
      } catch (error: any) {
        dispatch({
          type: 'addError',
          payload:
            error.response.data.message ||
            'No se encontró ninguna oferta disponible',
        });
      }
    };
  
    const getProduct = async (productId: string) => {
      
      try {
        const { data } = await API.get<ProductResponse>(`/products/${productId}`);
        dispatch({
          type: 'getProduct',
          payload: data.product,
        });
      } catch (error: any) {
        console.log(error.response.data.message);
        
        dispatch({
          type: 'addError',
          payload:
            error.response.data.message ||
            'No se encontró ninguna oferta disponible',
        });
      }
    };
  
  
    const addError = (message: string) => {
      dispatch({
        type: 'addError',
        payload: message,
      });
    };
  
    const removeSuccess = () => {
      dispatch({
        type: 'removeSuccess',
      });
    };
  
    const removeError = () => {
      dispatch({
        type: 'removeError',
      });
    };
  
  
  
    return (
      <ProductContext.Provider
        value={{
          getProducts,
          addError,
          removeSuccess,
          removeError,
          getProduct,
          getIndexProducts,
          ...state,
        }}>
        {children}
      </ProductContext.Provider>
    );
  };
  