import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  // Agrega una función para actualizar el precio total
  const updateTotalPrice = (newTotalPrice) => {
    setTotalPrice(newTotalPrice);
  };

  return (
    <CartContext.Provider value={{ totalPrice, updateTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
