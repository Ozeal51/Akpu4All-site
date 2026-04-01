import { useMemo, useState } from 'react'
import { meals, mealCategories } from '../data/meals.js'
import ProductCard from '../components/ProductCard.jsx'
import { motion } from 'framer-motion'

export default function Meals() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return meals.filter((m) => {
      const byCategory = category === 'All' || m.category === category
      const byQuery = m.name.toLowerCase().includes(query.toLowerCase()) || m.description.toLowerCase().includes(query.toLowerCase())
      return byCategory && byQuery
    })
  }, [query, category])

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-primary-50 to-white px-4 py-16 md:py-24">
        <div className="container-max">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-dark-900">
            Our <span className="gradient-text">Meals</span>
          </h1>
          <p className="text-lg text-dark-600 max-w-2xl">
            Discover authentic Nigerian meals prepared fresh with premium ingredients
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section-padding bg-white border-b border-dark-100">
        <div className="container-max">
          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search meals by name or description..."
              className="w-full px-6 py-3 rounded-lg border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {['All', ...mealCategories].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  category === cat
                    ? 'bg-accent-500 text-white shadow-md'
                    : 'bg-dark-100 text-dark-900 hover:bg-dark-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {filtered.length > 0 ? (
            <>
              <p className="text-dark-600 mb-8">
                Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((meal) => (
                  <ProductCard key={meal.id} product={meal} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-dark-600 mb-4">No meals found matching your search.</p>
              <button
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  )
}
