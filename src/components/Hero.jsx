import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero() {
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
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative container-max px-4 h-full flex items-center py-20 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.div
                variants={itemVariants}
                className="badge-primary w-fit"
              >
                🍲 Authentic Nigerian Cuisine
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-display font-bold text-5xl md:text-6xl leading-tight text-balance"
              >
                Fresh, Delicious Meals <span className="gradient-text">Delivered Fast</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg text-dark-600 leading-relaxed text-balance max-w-xl"
              >
                Experience the authentic taste of Nigeria. From Akpu to Jollof, every meal is prepared fresh with premium ingredients and delivered hot to your door.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-8"
            >
              <Link
                to="/meals"
                className="btn-primary text-center inline-block group"
              >
                <span className="flex items-center justify-center gap-2">
                  Order Now
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
              className="flex flex-wrap gap-6 pt-8"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center font-bold">⭐</div>
                <div>
                  <p className="font-semibold text-dark-900">4.9 Rating</p>
                  <p className="text-sm text-dark-600">From 1000+ reviews</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-fresh-50 text-fresh-600 flex items-center justify-center font-bold">✓</div>
                <div>
                  <p className="font-semibold text-dark-900">Fresh Daily</p>
                  <p className="text-sm text-dark-600">Cooked to order</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">🚚</div>
                <div>
                  <p className="font-semibold text-dark-900">Fast Delivery</p>
                  <p className="text-sm text-dark-600">30 mins or less</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full max-h-96 md:max-h-none">
              {/* Image container with border */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://media.istockphoto.com/id/1388097964/photo/egusi-ogbonno-vegetable-and-afang-soup-with-pounded-yam.jpg?s=612x612&w=0&k=20&c=jJVnUgfTPEsIDm1CF76ZLnt423-c88f-aPmGtLSxa0A="
                  alt="Fresh Nigerian meals"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Decorative frame */}
              <div className="absolute -inset-4 rounded-3xl border-2 border-primary-300 opacity-50"></div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-lg"
              >
                <p className="font-bold text-accent-600 text-lg">Best Seller</p>
                <p className="text-sm text-dark-600">Akpu with Egusi soup</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-dark-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [2, 6, 2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-dark-400 rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  )
}
