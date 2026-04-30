import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { motion } from 'framer-motion'
import { formatPrice } from '../utils/formatPrice.js'

export default function DrinkCard({ drink }) {
  const { addItem } = useContext(CartContext)
  const description = drink?.description?.trim() || 'Refreshing drink prepared and served chilled.'

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <div className="card h-full overflow-hidden">
        <img src={drink.image} alt={drink.name} className="h-48 w-full object-cover" />
        <div className="flex h-full flex-col p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-dark-500">Refreshments</p>
              <h3 className="mt-1 text-base font-semibold text-dark-900 sm:text-lg">{drink.name}</h3>
            </div>

            <span className="shrink-0 rounded-full border border-amber-200 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-sm font-extrabold text-white shadow-lg ring-2 ring-amber-200/60 sm:text-base">
              {formatPrice(drink?.price)}
            </span>
          </div>
          <p className="mb-4 mt-2 line-clamp-2 text-sm text-dark-600">{description}</p>
          <button
            type="button"
            className="btn-primary mt-auto w-full"
            onClick={() => addItem({ id: drink.id, name: drink.name, price: drink.price, image: drink.image, category: drink.category })}
          >
            Order Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}
