import { useEffect, useReducer } from 'react'
import { CartContext } from './cart.js'

const initialState = {
  items: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { items: action.items }
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.item.id)
      const items = existing
        ? state.items.map((i) => (i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state.items, { ...action.item, qty: 1 }]
      return { items }
    }
    case 'REMOVE': {
      const items = state.items
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
      return { items }
    }
    case 'DELETE': {
      const items = state.items.filter((i) => i.id !== action.id)
      return { items }
    }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const saved = localStorage.getItem('akpu-cart')
    if (saved) {
      try {
        const items = JSON.parse(saved)
        dispatch({ type: 'INIT', items })
      } catch (e) {
        void e
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('akpu-cart', JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item) => dispatch({ type: 'ADD', item })
  const removeItem = (id) => dispatch({ type: 'REMOVE', id })
  const deleteItem = (id) => dispatch({ type: 'DELETE', id })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const cartCount = state.items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.qty * i.price, 0)

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, deleteItem, clearCart, cartCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}
