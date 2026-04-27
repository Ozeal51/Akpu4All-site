import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { motion } from 'framer-motion'

export default function DrinkCard({ drink }) {
  const { addItem } = useContext(CartContext)
  const numericPrice = Number(drink?.price)
  const formattedPrice = Number.isFinite(numericPrice) ? numericPrice.toLocaleString('en-NG') : '0'
  const description = drink?.description?.trim() || 'Refreshing drink prepared and served chilled.'

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <div className="card h-full overflow-hidden">
        <img src={drink.image} alt={drink.name} className="h-48 w-full object-cover" />
        <div className="flex h-full flex-col p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-dark-500">Refreshments</p>
          <h3 className="mt-1 text-base font-semibold text-dark-900 sm:text-lg">{drink.name}</h3>
          <p className="mb-4 mt-2 line-clamp-2 text-sm text-dark-600">{description}</p>
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-dark-100 pt-4">
            <span className="text-base font-bold text-dark-900 sm:text-lg">₦{formattedPrice}</span>
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
