import { useContext, useState } from 'react'
import { CartContext } from '../context/cart'
import { motion } from 'framer-motion'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useContext(CartContext)
  const [form, setForm] = useState({ name: '', address: '', phone: '' })
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    alert('Order placed! Thank you for choosing Akpu4All.')
    clearCart()
  }

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="section-padding bg-dark-50">
      <div className="container-max grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-display font-bold text-dark-900">Checkout</h1>
          <p className="mt-3 text-dark-600">Complete your order details below.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-dark-100 bg-white p-6 shadow-soft">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-dark-800">Full Name</label>
              <input id="name" name="name" value={form.name} onChange={onChange} required className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
            </div>
            <div>
              <label htmlFor="address" className="mb-2 block text-sm font-semibold text-dark-800">Delivery Address</label>
              <input id="address" name="address" value={form.address} onChange={onChange} required className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-dark-800">Phone</label>
              <input id="phone" name="phone" value={form.phone} onChange={onChange} required className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
            </div>
            <button type="submit" className="btn-primary w-full text-lg">Place Order</button>
          </form>
        </div>

        <div className="rounded-2xl border border-dark-100 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-dark-900">Order Summary</h2>
          <p className="mt-2 text-dark-600">Items: {items.length}</p>
          <p className="mt-4 text-xl font-bold text-accent-600">Total: ₦{totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </motion.section>
  )
}
