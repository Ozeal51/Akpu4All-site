import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Cart() {
  const { items, addItem, removeItem, deleteItem, totalPrice, clearCart } = useContext(CartContext)

  if (items.length === 0) {
    return (
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="section-padding bg-dark-50">
        <div className="container-max text-center">
          <h1 className="text-4xl font-display font-bold text-dark-900">Your Cart</h1>
          <p className="mt-3 text-dark-600">Your cart is empty.</p>
          <Link to="/meals" className="btn-primary mt-6 inline-block">Browse Meals</Link>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="section-padding bg-dark-50">
      <div className="container-max">
        <h1 className="mb-6 text-4xl font-display font-bold text-dark-900">Your Cart</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((i) => (
              <article key={i.id} className="card p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <img src={i.image} alt={i.name} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="min-w-[180px] flex-1">
                    <h3 className="font-semibold text-dark-900">{i.name}</h3>
                    <p className="text-sm text-dark-600">₦{i.price.toFixed(2)} x {i.qty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="rounded-lg border border-dark-300 px-3 py-1 hover:bg-dark-100" onClick={() => removeItem(i.id)}>-</button>
                    <button type="button" className="rounded-lg border border-dark-300 px-3 py-1 hover:bg-dark-100" onClick={() => addItem(i)}>+</button>
                    <button type="button" className="rounded-lg border border-red-300 px-3 py-1 text-red-600 hover:bg-red-50" onClick={() => deleteItem(i.id)}>Remove</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="card h-fit p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold text-dark-900">Total</span>
              <span className="text-xl font-bold text-accent-600">₦{totalPrice.toFixed(2)}</span>
            </div>
            <div className="space-y-3">
              <Link to="/checkout" className="btn-primary block w-full text-center">Proceed to Checkout</Link>
              <button type="button" className="w-full rounded-lg border border-red-300 px-4 py-3 font-semibold text-red-600 hover:bg-red-50" onClick={clearCart}>Clear Cart</button>
            </div>
          </aside>
        </div>
      </div>
    </motion.section>
  )
}
