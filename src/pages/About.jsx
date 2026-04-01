import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="section-padding bg-white">
      <div className="container-max space-y-8">
        <div>
          <h1 className="text-5xl font-display font-bold text-dark-900 md:text-6xl">About <span className="gradient-text">Akpu4All</span></h1>
          <p className="mt-4 max-w-3xl text-lg text-dark-600">
            Akpu4All is a modern Nigerian restaurant created by Hosea and dedicated to serving authentic, flavorful swallows and drinks. Our mission is to bring comfort food to your doorstep with an exceptional online ordering experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="card p-6">
            <h2 className="text-2xl font-bold text-dark-900">Our Story</h2>
            <p className="mt-3 text-dark-600">We blend tradition with innovation, ensuring every dish is crafted with care and premium ingredients.</p>
          </article>
          <article className="card p-6">
            <h2 className="text-2xl font-bold text-dark-900">Our Promise</h2>
            <p className="mt-3 text-dark-600">From classic akpu and soups to grilled specials and refreshing drinks, we celebrate Nigeria’s rich culinary heritage in every order.</p>
          </article>
        </div>
      </div>
    </motion.section>
  )
}
