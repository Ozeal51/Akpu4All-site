import { motion } from 'framer-motion'

const features = [
  {
    icon: '⚙️',
    title: 'Freshly prepared meals',
    description: 'Every meal and drink is selected for taste, quality, and consistency.',
  },
  {
    icon: '🚚',
    title: 'Reliable Fulfillment',
    description: 'Smooth checkout and dependable order handling from kitchen to doorstep.',
  },
  {
    icon: '✨',
    title: 'Premium UI Experience',
    description: 'Clean, modern, and mobile-first food ordering built for clarity and speed.',
  },
]

export default function Features() {
  return (
    <section className="section-padding bg-primary-50">
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
            Crafted for <span className="gradient-text">everyday Swallows cravings</span>
          </h2>
          <p className="text-sm text-dark-600 sm:text-base md:text-lg">
            Akpu4All helps you discover meals quickly and order confidently.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card space-y-5 p-6"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dark-900 text-2xl text-white">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-dark-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-dark-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
