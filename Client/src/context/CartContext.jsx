import { useEffect, useReducer } from 'react'
import { CartContext } from './cart.js'

const initialState = {
  items: [],
}

function normalizeItem(item) {
  const quantity = Number.isFinite(item.quantity)
    ? item.quantity
    : Number.isFinite(item.qty)
      ? item.qty
      : 1

  return {
    ...item,
    quantity: Math.max(1, quantity),
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { items: action.items.map(normalizeItem) }
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.item.id)
      const items = existing
        ? state.items.map((i) => (i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...state.items, normalizeItem(action.item)]
      return { items }
    }
    case 'REMOVE': {
      const items = state.items
        .map((i) => (i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
      return { items }
    }
    case 'SET_QTY': {
      const parsedQuantity = Number(action.quantity)
      if (!Number.isFinite(parsedQuantity)) {
        return state
      }

      if (parsedQuantity <= 0) {
        return { items: state.items.filter((i) => i.id !== action.id) }
      }

      const items = state.items.map((i) =>
        i.id === action.id ? { ...i, quantity: Math.floor(parsedQuantity) } : i,
      )
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
  const updateQuantity = (id, quantity) => dispatch({ type: 'SET_QTY', id, quantity })
  const deleteItem = (id) => dispatch({ type: 'DELETE', id })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotalPrice = state.items.reduce((sum, i) => sum + i.quantity * i.price, 0)
  const totalPrice = subtotalPrice

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        deleteItem,
        clearCart,
        cartCount,
        subtotalPrice,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
