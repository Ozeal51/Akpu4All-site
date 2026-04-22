import { useState } from 'react'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { CartContext } from '../context/cart'

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useContext(CartContext)
  const numericPrice = Number(product?.price)
  const formattedPrice = Number.isFinite(numericPrice) ? numericPrice.toLocaleString('en-NG') : '0'

  const handleAddToCart = () => {
    addItem(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group card-hover card h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-dark-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Category Badge */}
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-dark-800 backdrop-blur">
          {product.category}
        </div>

        {/* Overlay with CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 hidden items-end justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent p-4 md:flex"
        >
          <motion.button
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: isHovered ? 1 : 0.8, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            onClick={handleAddToCart}
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-dark-900"
          >
            Quick Add
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex h-full flex-col p-4 md:p-5">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-dark-900 sm:text-lg">
          {product.name}
        </h3>
        
        <p className="mb-4 line-clamp-2 text-sm text-dark-600">
          {product.description}
        </p>

        {/* Price and Action */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-dark-100 pt-4">
          <span className="text-xl font-bold text-dark-900 sm:text-2xl">
            ₦{formattedPrice}
          </span>

          <button
            onClick={handleAddToCart}
            className="hidden rounded-full border border-dark-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-dark-800 transition-all hover:border-dark-800 md:inline-flex"
          >
            Buy Now
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full rounded-full bg-dark-900 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-dark-700 md:hidden"
        >
          Buy Now
        </button>
      </div>
    </motion.div>
  )
}
