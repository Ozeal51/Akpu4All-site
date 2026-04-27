import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { meals } from '../data/meals.js'

export default function Home() {
  const featured = meals.slice(0, 6)
  const spotlight = meals.slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Spotlight Categories */}
      <section className="section-padding bg-primary-50">
        <div className="container-max">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-dark-500">Meal Spotlight</p>
              <h2 className="font-display text-3xl font-bold text-dark-900 md:text-4xl">
                Freshly prepared, flavor first
              </h2>
            </div>
            <Link to="/meals" className="text-sm font-semibold uppercase tracking-wide text-dark-700 hover:text-dark-900">
              See full menu →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {spotlight.map((item) => (
              <article key={item.id} className="card overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-3 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-500">{item.category}</p>
                  <h3 className="text-lg font-semibold text-dark-900">{item.name}</h3>
                  <p className="line-clamp-2 text-sm text-dark-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <h2 className="mb-4 font-display text-3xl font-bold text-dark-900 md:text-5xl">
              Best Sellers
            </h2>
            <p className="text-sm text-dark-600 sm:text-base md:text-lg">
              Discover customer-favorite meals and drinks from our current menu data.
            </p>
          </motion.div>

          {/* Meals Grid */}
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/meals" className="group inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:text-base">
              <span className="flex items-center gap-2">
                View Full Menu
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid gap-4 text-center sm:grid-cols-3 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="mb-2 text-4xl font-bold text-dark-900 md:text-5xl">5000+</p>
              <p className="text-sm uppercase tracking-wide text-dark-600">Happy Customers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="mb-2 text-4xl font-bold text-dark-900 md:text-5xl">4.9/5</p>
              <p className="text-sm uppercase tracking-wide text-dark-600">Customer Rating</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="mb-2 text-4xl font-bold text-dark-900 md:text-5xl">30 min</p>
              <p className="text-sm uppercase tracking-wide text-dark-600">Average Delivery Time</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-dark-900 text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-bold md:text-5xl">
                Ready to place your next order?
              </h2>
              <p className="mx-auto max-w-2xl text-sm text-dark-300 sm:text-base md:text-xl">
                Browse meals, add your favorites, and checkout in minutes with Akpu4All.
              </p>
            </div>

            <Link to="/meals" className="inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:scale-[1.02] hover:bg-blue-700">
              Start Ordering
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
