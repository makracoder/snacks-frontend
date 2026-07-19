import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product === product._id);
      if (existing) {
        return prev.map(i =>
          i.product === product._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(prev => prev.filter(i => i.product !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    setItems(prev => prev.map(i => i.product === productId ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);