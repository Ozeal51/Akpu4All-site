import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { motion } from 'framer-motion'

export default function DrinkCard({ drink }) {
  const { addItem } = useContext(CartContext)
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <div className="card h-full overflow-hidden">
        <img src={drink.image} alt={drink.name} className="h-44 w-full object-cover" />
        <div className="flex h-full flex-col p-4">
          <h3 className="text-lg font-semibold text-dark-900">{drink.name}</h3>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-accent-600">₦{drink.price.toFixed(2)}</span>
            <button
              type="button"
              className="btn-primary"
              onClick={() => addItem({ id: drink.id, name: drink.name, price: drink.price, image: drink.image })}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
