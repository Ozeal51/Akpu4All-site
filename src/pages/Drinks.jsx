import { useMemo, useState } from 'react'
import { drinks } from '../data/drinks.js'
import DrinkCard from '../components/DrinkCard'
import SearchBar from '../components/SearchBar'
import { motion } from 'framer-motion'

export default function Drinks() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return drinks.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <section className="bg-gradient-to-b from-primary-50 to-white px-4 py-16 md:py-24">
        <div className="container-max">
          <h1 className="text-5xl font-display font-bold text-dark-900 md:text-6xl">
            Refreshing <span className="gradient-text">Drinks</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-dark-600">Discover chilled local favorites and handcrafted beverages.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <SearchBar value={query} onChange={setQuery} placeholder="Search drinks..." />
          <div className="mb-6 text-dark-600">Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}</div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
            <div key={d.id}>
            <DrinkCard drink={d} />
            </div>
        ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
