import { useState } from 'react'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { CartContext } from '../context/cart'

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useContext(CartContext)

  const handleAddToCart = () => {
    addItem(product)
  }

  const categoryColor = {
    'Main Dishes': 'from-accent-500 to-orange-600',
    'Sides': 'from-fresh-500 to-emerald-600',
    'Specials': 'from-purple-500 to-pink-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group card-hover card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-dark-100 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${categoryColor[product.category] || 'from-primary-500 to-accent-500'} text-white text-xs font-bold rounded-full shadow-md`}>
          {product.category}
        </div>

        {/* Overlay with CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.button
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: isHovered ? 1 : 0.8, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            onClick={handleAddToCart}
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="font-semibold text-dark-900 text-lg mb-2 line-clamp-2 group-hover:text-accent-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-dark-600 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-accent-600">
            ₦{product.price.toLocaleString()}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="p-2 rounded-lg bg-accent-50 text-accent-600 hover:bg-accent-100 transition-colors"
            aria-label="Add to cart"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
