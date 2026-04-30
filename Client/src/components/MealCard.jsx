import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { motion } from 'framer-motion'
import { formatPrice } from '../utils/formatPrice.js'

export default function MealCard({ meal }) {
  const { addItem } = useContext(CartContext)
  const description = meal?.description?.trim() || 'Freshly prepared meal ready to order.'

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <div className="card h-full overflow-hidden">
        <img src={meal.image} alt={meal.name} className="h-44 w-full object-cover" />
        <div className="flex h-full flex-col p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-dark-900">{meal.name}</h3>
            <span className="shrink-0 rounded-full border border-amber-200 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-sm font-extrabold text-white shadow-lg ring-2 ring-amber-200/60">
              {formatPrice(meal?.price)}
            </span>
          </div>
          <p className="mb-4 mt-2 flex-grow text-sm text-dark-600">{description}</p>
          <button
            type="button"
            className="btn-primary mt-auto w-full"
            onClick={() => addItem({ id: meal.id, name: meal.name, price: meal.price, image: meal.image, category: meal.category })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}
