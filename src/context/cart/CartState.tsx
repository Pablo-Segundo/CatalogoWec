import React from 'react';
import { CartProvider } from "./CartContext"

export const CartState = ({children}: any)=> {
    return <CartProvider>{children}</CartProvider>
}