import { motion } from 'framer-motion'

const features = [
  {
    icon: '🍳',
    title: 'Fresh Ingredients',
    description: 'Premium quality ingredients sourced fresh daily for authentic taste',
  },
  {
    icon: '⚡',
    title: 'Fast Service',
    description: 'Quick preparation without compromising on quality and freshness',
  },
  {
    icon: '🚚',
    title: 'Quick Delivery',
    description: 'Reliable delivery service to get hot meals to your doorstep',
  },
  {
    icon: '💰',
    title: 'Affordable Prices',
    description: 'Best value for money without sacrificing quality',
  },
  {
    icon: '⭐',
    title: 'Highly Rated',
    description: 'Trusted by thousands of customers across the region',
  },
  {
    icon: '🎯',
    title: 'Custom Orders',
    description: 'Personalize your meals to match your taste preferences',
  },
]

export default function Features() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-primary-50">
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
            Why Choose <span className="gradient-text">Akpu4All</span>
          </h2>
          <p className="text-lg text-dark-600">
            Exceptional dining experience with premium quality meals and outstanding service
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group card hover:shadow-lift p-6 md:p-8 space-y-4"
            >
              {/* Icon */}
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-xl text-dark-900 group-hover:text-accent-600 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-dark-600 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Divider */}
              <div className="h-1 w-0 bg-gradient-to-r from-accent-500 to-primary-500 group-hover:w-12 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
