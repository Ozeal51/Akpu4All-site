import { createContext } from 'react'

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  deleteItem: () => {},
  clearCart: () => {},
  cartCount: 0,
  totalPrice: 0,
})
