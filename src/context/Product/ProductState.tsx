import React from 'react';
import { ProductProvider } from './ProductContext';

export const ProductState = ({children}: any) => {
  return <ProductProvider>{children}</ProductProvider>;
};
