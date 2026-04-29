import { useContext, useState } from 'react'
import { CartContext } from '../context/cart'
import { motion } from 'framer-motion'
import { formatPrice } from '../utils/formatPrice.js'

export default function Checkout() {
  const { items, subtotalPrice, totalPrice, clearCart } = useContext(CartContext)
  const [form, setForm] = useState({ name: '', address: '', phone: '' })
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    alert('Order placed! Thank you for choosing Akpu4All.')
    clearCart()
  }

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="section-padding bg-primary-50">
      <div className="container-max grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dark-500">Checkout</p>
            <h1 className="mt-3 text-4xl font-display font-bold text-dark-900">Complete your order</h1>
            <p className="mt-3 text-dark-600">Review your details and place the order when ready.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 rounded-[2rem] border border-dark-100 bg-white p-6 shadow-soft">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-dark-800">Full Name</label>
              <input id="name" name="name" value={form.name} onChange={onChange} required className="w-full rounded-full border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
            </div>
            <div>
              <label htmlFor="address" className="mb-2 block text-sm font-semibold text-dark-800">Delivery Address</label>
              <input id="address" name="address" value={form.address} onChange={onChange} required className="w-full rounded-full border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-dark-800">Phone</label>
              <input id="phone" name="phone" value={form.phone} onChange={onChange} required className="w-full rounded-full border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
            </div>
            <button type="submit" className="btn-primary w-full text-lg">Place Order</button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-dark-100 bg-white p-6 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-500">Order summary</p>
          <h2 className="mt-3 text-2xl font-bold text-dark-900">Your order</h2>
          <p className="mt-2 text-dark-600">Items: {items.reduce((sum, item) => sum + item.quantity, 0)}</p>

          <div className="mt-4 space-y-3 border-b border-dark-100 pb-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="line-clamp-1 text-dark-700">
                  {item.name} x {item.quantity}
                </span>
                <span className="rounded-full border border-amber-200 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 font-extrabold text-white shadow-md ring-2 ring-amber-200/60">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-dark-700">
            <span>Subtotal</span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 font-semibold text-amber-800">
              {formatPrice(subtotalPrice)}
            </span>
          </div>
          <p className="mt-3 inline-flex rounded-full border border-amber-200 bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xl font-extrabold text-white shadow-lg ring-2 ring-amber-200/60">
            Total: {formatPrice(totalPrice)}
          </p>
        </div>
      </div>
    </motion.section>
  )
}
