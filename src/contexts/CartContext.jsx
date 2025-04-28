import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.masp === product.masp);
      if (existingItem) {
        return prevItems.map((item) =>
          item.masp === product.masp
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (masp, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.masp === masp ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (masp) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.masp !== masp));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price.replace(/\./g, '')) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
        totalItems,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;