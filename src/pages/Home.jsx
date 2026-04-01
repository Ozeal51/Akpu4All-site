import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { meals } from '../data/meals.js'

export default function Home() {
  const featured = meals.slice(0, 6)

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Best Sellers Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 text-dark-900">
              Our <span className="gradient-text">Best Sellers</span>
            </h2>
            <p className="text-lg text-dark-600">
              Discover the most loved meals from our authentic Nigerian menu
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
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
            <Link to="/meals" className="btn-primary text-lg inline-block group">
              <span className="flex items-center gap-2">
                View All Meals
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="section-padding bg-gradient-to-r from-primary-50 to-accent-50">
        <div className="container-max">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl md:text-6xl font-bold gradient-text mb-2">5000+</p>
              <p className="text-lg text-dark-600">Happy Customers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl md:text-6xl font-bold gradient-text mb-2">4.9/5</p>
              <p className="text-lg text-dark-600">Customer Rating</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl md:text-6xl font-bold gradient-text mb-2">30 min</p>
              <p className="text-lg text-dark-600">Average Delivery Time</p>
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
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Ready to Order?
              </h2>
              <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                Experience authentic Nigerian cuisine prepared fresh and delivered hot to your door.
              </p>
            </div>

            <Link to="/meals" className="btn-primary text-lg inline-block group hover:scale-105 transition-transform">
              Order Now
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
