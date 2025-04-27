import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    console.log("addToCart llamada con:", pizza);
    const existingPizza = cart.find((item) => item.id === pizza.id);

    if (existingPizza) {
      const updatedCart = cart.map((item) =>
        item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
  };

  const removeFromCart = (pizzaId) => {
    const updatedCart = cart.filter((item) => item.id !== pizzaId);
    setCart(updatedCart);
  };

  const updateQuantity = (pizzaId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === pizzaId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, pizza) => total + pizza.price * pizza.quantity,
      0
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    clearCart, 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);