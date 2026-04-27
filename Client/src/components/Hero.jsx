import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { meals } from '../data/meals.js'

export default function Hero() {
  const featuredItems = meals.slice(0, 3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative overflow-hidden bg-white pt-28 sm:pt-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-gradient-to-b from-primary-50 to-white" />
      <div className="relative container-max flex h-full items-center px-4 pb-14 md:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-7">
            <div className="space-y-4">
              <motion.div
                variants={itemVariants}
                className="w-fit rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white"
              >
                Fresh meals, Fast delivery
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="max-w-xl text-balance font-display text-4xl font-bold leading-tight text-dark-900 sm:text-5xl md:text-6xl"
              >
                Order your favorites Swallow
                <br />
                <span className="text-dark-500">from Akpu4All in minutes.</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="max-w-xl text-balance text-sm leading-relaxed text-dark-600 sm:text-base md:text-lg"
              >
                Browse meals and drinks, add what you love to cart, and place your order.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-8"
            >
              <Link
                to="/meals"
                className="group inline-block rounded-full bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <span className="flex items-center justify-center gap-2">
                  Order Meals
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                to="/about"
                className="btn-outline text-center"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3"
            >
              <div className="rounded-2xl border border-dark-200 bg-white p-4 shadow-sm">
                <div>
                  <p className="text-lg font-semibold text-dark-900">4.9</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-dark-500">Average Food Rating</p>
                </div>
              </div>

              <div className="rounded-2xl border border-dark-200 bg-white p-4 shadow-sm">
                <div>
                  <p className="text-lg font-semibold text-dark-900">12+</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-dark-500">Meal & Drink Categories</p>
                </div>
              </div>

              <div className="rounded-2xl border border-dark-200 bg-white p-4 shadow-sm">
                <div>
                  <p className="text-lg font-semibold text-dark-900">24/7</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-dark-500">Ordering Access</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-2xl">
              <div className="overflow-hidden rounded-[2rem] border border-dark-200 bg-dark-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <img
                  src={featuredItems[0]?.image}
                  alt={featuredItems[0]?.name || 'Featured product'}
                  className="h-[420px] w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-[560px]"
                />
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute left-4 top-4 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-lg backdrop-blur"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-500">Featured category</p>
                <p className="mt-1 text-base font-bold text-dark-900">Chef's Picks</p>
              </motion.div>

              <div className="absolute bottom-4 right-4 grid gap-3 sm:grid-cols-2">
                {featuredItems.slice(1).map((item) => (
                  <div key={item.id} className="w-40 overflow-hidden rounded-2xl border border-white/70 bg-white shadow-md sm:w-44">
                    <img src={item.image} alt={item.name} className="h-24 w-full object-cover" />
                    <div className="p-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-dark-500">{item.category}</p>
                      <p className="mt-1 line-clamp-1 text-sm font-semibold text-dark-900">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
