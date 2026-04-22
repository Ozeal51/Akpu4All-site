import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { motion } from 'framer-motion'

export default function DrinkCard({ drink }) {
  const { addItem } = useContext(CartContext)
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <div className="card h-full overflow-hidden">
        <img src={drink.image} alt={drink.name} className="h-48 w-full object-cover" />
        <div className="flex h-full flex-col p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-dark-500">Refreshments</p>
          <h3 className="mt-1 text-base font-semibold text-dark-900 sm:text-lg">{drink.name}</h3>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-dark-100 pt-4">
            <span className="text-base font-bold text-dark-900 sm:text-lg">₦{drink.price.toFixed(2)}</span>
            <button
              type="button"
              className="rounded-full border border-dark-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-dark-800 transition-all hover:border-dark-800"
              onClick={() => addItem({ id: drink.id, name: drink.name, price: drink.price, image: drink.image })}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
