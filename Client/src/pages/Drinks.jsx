import { useEffect, useMemo, useState } from 'react'
import { drinks as localDrinks } from '../data/drinks.js'
import DrinkCard from '../components/DrinkCard'
import SearchBar from '../components/SearchBar'
import { motion } from 'framer-motion'
import { productsAPI } from '../services/api.js'
import { mapProduct } from '../utils/mapProduct.js'

export default function Drinks() {
  const [query, setQuery] = useState('')
  const [drinks, setDrinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadDrinks = async () => {
      setLoading(true)
      setError('')

      try {
        const { data } = await productsAPI.list({ menuType: 'drink' })
        const serverDrinks = (data.products || []).map(mapProduct)

        if (isMounted && serverDrinks.length > 0) {
          setDrinks(serverDrinks)
          return
        }
      } catch (fetchError) {
        if (isMounted) {
          setError('Live drinks could not load. Showing the local catalog instead.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }

      if (isMounted) {
        setDrinks(localDrinks)
      }
    }

    loadDrinks()

    return () => {
      isMounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    const normalizedQuery = query.toLowerCase()

    return drinks.filter((drink) => {
      const searchableName = (drink.name ?? '').toLowerCase()
      const searchableDescription = (drink.description ?? '').toLowerCase()

      return searchableName.includes(normalizedQuery) || searchableDescription.includes(normalizedQuery)
    })
  }, [query, drinks])

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <section className="bg-gradient-to-b from-primary-50 to-white px-4 py-12 md:py-20">
        <div className="container-max">
          <h1 className="text-3xl font-display font-bold text-dark-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Refreshing <span className="gradient-text">Drinks</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-dark-600 sm:text-base md:text-lg">Discover chilled favorites and everyday refreshment picks.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          {error ? (
            <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
              {error}
            </div>
          ) : null}

          <SearchBar value={query} onChange={setQuery} placeholder="Search drinks..." />
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="card h-[20rem] animate-pulse rounded-[1.5rem] bg-white p-4">
                  <div className="h-48 rounded-2xl bg-dark-100" />
                  <div className="mt-4 h-4 w-2/3 rounded bg-dark-100" />
                  <div className="mt-3 h-3 w-full rounded bg-dark-100" />
                  <div className="mt-2 h-3 w-5/6 rounded bg-dark-100" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-dark-600 sm:mb-6 sm:text-base">Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}</div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {filtered.map((d) => (
                  <div key={d.id}>
                    <DrinkCard drink={d} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </motion.div>
  )
}
