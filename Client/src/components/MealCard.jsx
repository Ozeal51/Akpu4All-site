import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { motion } from 'framer-motion'

export default function MealCard({ meal }) {
  const { addItem } = useContext(CartContext)
  const numericPrice = Number(meal?.price)
  const formattedPrice = Number.isFinite(numericPrice) ? numericPrice.toLocaleString('en-NG') : '0'
  const description = meal?.description?.trim() || 'Freshly prepared meal ready to order.'

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <div className="card h-full overflow-hidden">
        <img src={meal.image} alt={meal.name} className="h-44 w-full object-cover" />
        <div className="flex h-full flex-col p-4">
          <h3 className="text-lg font-semibold text-dark-900">{meal.name}</h3>
          <p className="mb-4 mt-2 flex-grow text-sm text-dark-600">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-accent-600">₦{formattedPrice}</span>
            <button
              type="button"
              className="btn-primary"
              onClick={() => addItem({ id: meal.id, name: meal.name, price: meal.price, image: meal.image })}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
