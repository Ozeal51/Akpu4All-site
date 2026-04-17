import { createContext } from 'react'

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  deleteItem: () => {},
  clearCart: () => {},
  cartCount: 0,
  subtotalPrice: 0,
  totalPrice: 0,
})
