import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Cart() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    deleteItem,
    subtotalPrice,
    totalPrice,
    clearCart,
  } = useContext(CartContext)

  if (items.length === 0) {
    return (
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="section-padding bg-primary-50">
        <div className="container-max text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dark-500">Cart</p>
          <h1 className="mt-3 text-4xl font-display font-bold text-dark-900">Your cart is empty</h1>
          <p className="mt-3 text-dark-600">Browse the menu and add a few meals to get started.</p>
          <Link to="/meals" className="btn-primary mt-6 inline-block">Browse Meals</Link>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="section-padding bg-primary-50">
      <div className="container-max">
        <div className="mb-8 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dark-500">Your order cart</p>
          <h1 className="text-4xl font-display font-bold text-dark-900">Your Cart</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((i) => (
              <article key={i.id} className="card p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img src={i.image} alt={i.name} className="h-24 w-full rounded-2xl object-cover sm:h-20 sm:w-20" />
                  <div className="min-w-[180px] flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-500">{i.category}</p>
                    <h3 className="mt-1 text-lg font-semibold text-dark-900">{i.name}</h3>
                    <p className="text-sm text-dark-600">₦{i.price.toFixed(2)} each</p>
                    <p className="mt-1 text-sm font-semibold text-accent-600">₦{(i.price * i.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <button
                      type="button"
                      className="rounded-full border border-dark-300 px-3 py-2 text-sm hover:bg-dark-100"
                      onClick={() => removeItem(i.id)}
                      aria-label={`Decrease quantity of ${i.name}`}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={i.quantity}
                      onChange={(event) => updateQuantity(i.id, Number(event.target.value))}
                      className="w-16 rounded-full border border-dark-300 px-2 py-2 text-center"
                      aria-label={`Quantity of ${i.name}`}
                    />
                    <button
                      type="button"
                      className="rounded-full border border-dark-300 px-3 py-2 text-sm hover:bg-dark-100"
                      onClick={() => addItem(i)}
                      aria-label={`Increase quantity of ${i.name}`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={() => deleteItem(i.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="card h-fit rounded-[2rem] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-500">Order summary</p>
            <div className="mb-2 mt-4 flex items-center justify-between">
              <span className="text-dark-700">Subtotal</span>
              <span className="font-semibold text-dark-900">₦{subtotalPrice.toFixed(2)}</span>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold text-dark-900">Total</span>
              <span className="text-xl font-bold text-accent-600">₦{totalPrice.toFixed(2)}</span>
            </div>
            <div className="space-y-3">
              <Link to="/checkout" className="btn-primary block w-full text-center">Proceed to Checkout</Link>
              <Link to="/meals" className="block w-full rounded-full border border-dark-300 px-4 py-3 text-center font-semibold text-dark-700 hover:bg-dark-100">Continue Ordering</Link>
              <button type="button" className="w-full rounded-full border border-red-300 px-4 py-3 font-semibold text-red-600 hover:bg-red-50" onClick={clearCart}>Clear Cart</button>
            </div>
          </aside>
        </div>
      </div>
    </motion.section>
  )
}
