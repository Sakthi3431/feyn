// src/context/CartContext.jsx

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState("")
    const [discount, setDiscount] = useState(0);
    const applyPromo = (code) => {
        const upperCode = code.toUpperCase();

        if (upperCode === "SAVE10"){
            setPromoCode("SAVE10");
            setDiscount(10);
            return "Promo Applied"
        }
        return "Invalid Proo Code"
    };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  const increaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1)
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        promoCode,
        discount,
        applyPromo
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);