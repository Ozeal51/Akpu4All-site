import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <h1 className="mb-3">About Akpu4All</h1>
      <p>
        Akpu4All is a modern Nigerian restaurant dedicated to serving authentic, flavorful meals and drinks. Our mission is
        to bring comfort food to your doorstep with an exceptional online ordering experience.
      </p>
      <p>
        Our team blends tradition with innovation, ensuring every dish is crafted with care. From classic akpu and soups to
        grilled specials and refreshing drinks, we celebrate the rich culinary heritage of Nigeria.
      </p>
    </motion.div>
  )
}
