import { useMemo, useState } from 'react'
import { meals } from '../data/meals.js'
import { drinks } from '../data/drinks.js'
import ProductCard from '../components/ProductCard.jsx'
import { motion } from 'framer-motion'

const categories = ['All', 'Akpu', 'Pounded yam', 'Garri', 'Soups', 'Drinks']

const inferFoodCategory = (meal) => {
  const searchable = `${meal.name} ${meal.description ?? ''}`.toLowerCase()

  if (searchable.includes('akpu')) {
    return 'Akpu'
  }

  if (searchable.includes('pounded yam')) {
    return 'Pounded yam'
  }

  if (searchable.includes('garri') || searchable.includes('gari')) {
    return 'Garri'
  }

  if (
    searchable.includes('soup') ||
    searchable.includes('soups') ||
    searchable.includes('ofe') ||
    searchable.includes('egusi') ||
    searchable.includes('ewedu') ||
    searchable.includes('okra') ||
    searchable.includes('oha') ||
    searchable.includes('vegetable') ||
    searchable.includes('gbegiri') ||
    searchable.includes('afang') ||
    searchable.includes('nsala')
  ) {
    return 'Soups'
  }

  return 'Drinks'
}

export default function Meals() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(categories[0])

  const menuItems = useMemo(
    () => [
      ...meals.map((meal) => ({
        ...meal,
        menuCategory: inferFoodCategory(meal),
      })),
      ...drinks.map((drink) => ({
        ...drink,
        menuCategory: 'Drinks',
      })),
    ],
    []
  )

  const filtered = useMemo(() => {
    return menuItems.filter((m) => {
      const byCategory = category === 'All' || m.menuCategory === category
      const searchableName = (m.name ?? '').toLowerCase()
      const searchableDescription = (m.description ?? '').toLowerCase()
      const byQuery = searchableName.includes(query.toLowerCase()) || searchableDescription.includes(query.toLowerCase())
      return byCategory && byQuery
    })
  }, [menuItems, query, category])

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-primary-50 to-white px-4 py-12 md:py-20">
        <div className="container-max">
          <h1 className="mb-3 text-3xl font-display font-bold text-dark-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Meal <span className="gradient-text">Menu</span>
          </h1>
          <p className="max-w-2xl text-sm text-dark-600 sm:text-base md:text-lg">
            Explore your favorite meal categories and order fresh dishes with ease.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section-padding bg-white border-b border-dark-100">
        <div className="container-max">
          {/* Search */}
          <div className="mb-6 md:mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search meals by name or description..."
              className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 text-sm focus:border-accent-500 focus:ring-2 focus:ring-accent-100 transition-all sm:px-5 sm:text-base"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all sm:px-5 sm:text-sm md:px-6 md:text-base ${
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

      {/* Meals Grid */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {filtered.length > 0 ? (
            <>
              <p className="text-dark-600 mb-8">
                Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 md:gap-8">
                {filtered.map((meal) => (
                  <ProductCard key={meal.id} product={meal} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="mb-4 text-base text-dark-600 sm:text-lg md:text-xl">No meals found matching your search.</p>
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
