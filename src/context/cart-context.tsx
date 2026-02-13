"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface CartItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

type CartProduct = Omit<CartItemData, 'quantity'>;

interface CartContextType {
  addToCart: (product: CartProduct) => void;
  cart: CartItemData[];
  decrementItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  calculateSubtotal: () => number;
  calculateTotalWithTax: (taxa: number) => number;
  quantityInCart: () => number;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode}) {
  const [cart, setCart] = useState<CartItemData[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("@loja:cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  })


  useEffect(() => {
    localStorage.setItem("@loja:cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: CartProduct) => {
    setCart((prev) => {
      const isItemIncart = prev.find((item) => item.id === product.id);

      if(isItemIncart){
        return prev.map((item) => 
          item.id === product.id ? {...item, quantity: item.quantity + 1 } : item
        )
      }

      return [...prev, {...product, quantity: 1}]
    })
  }

  const decrementItem = (productId: string) => {
    setCart((prev) => {

      const index = prev.findIndex(item => item.id === productId);

      if (index !== -1) {
        const item = prev[index];
        if (item.quantity > 1) {
          return prev.map((item) => {
            return item.id === productId ? {...item, quantity: item.quantity - 1} : item
          });
        }
      }

      return prev.filter((item) => item.id !== productId);
    })
  }

  const removeItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  const calculateSubtotal = () => {
    const subTotal = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    return subTotal
  }

  const calculateTotalWithTax = (taxa: number) => {
    const subTotal = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    return subTotal + taxa;
  }
  
  function quantityInCart() {
    return cart.length;
  }
  
  return (
    <CartContext.Provider
      value={{
        addToCart, 
        cart, 
        decrementItem, 
        calculateSubtotal, 
        calculateTotalWithTax,
        removeItem,
        quantityInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}


export const useCart = () => useContext(CartContext)