import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CTASection({ 
  title = "Ready to Order?", 
  subtitle = "Experience authentic Nigerian cuisine prepared fresh and delivered hot to your door.",
  buttonText = "Order Now",
  buttonLink = "/meals",
  dark = true 
}) {
  return (
    <section className={`section-padding ${dark ? 'bg-dark-900 text-white' : 'bg-gradient-to-r from-primary-50 to-accent-50 text-dark-900'}`}>
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
              {title}
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${dark ? 'text-dark-300' : 'text-dark-600'}`}>
              {subtitle}
            </p>
          </div>

          <Link 
            to={buttonLink} 
            className={`${dark ? 'btn-primary' : 'bg-accent-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-600 hover:shadow-lg'} text-lg inline-block group hover:scale-105 transition-transform`}
          >
            {buttonText}
            <svg className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
