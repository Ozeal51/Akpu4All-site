import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { meals } from '../data/meals.js'
import MealCard from '../components/MealCard.jsx'
import Reviews from '../components/Reviews.jsx'
import { motion } from 'framer-motion'

export default function Home() {
  const featured = meals.slice(0, 3)
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <section className="hero-section p-4 p-md-5 rounded-3 mb-4 text-center text-white">
        <div>
          <h1 className="display-5 fw-bold">Akpu4All</h1>
          <p className="lead mb-4">Authentic Nigerian meals and refreshing drinks — order online.</p>
          <Button as={Link} to="/meals" size="lg">
            Order Now
          </Button>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="mb-3">Featured Meals</h2>
        <Row xs={1} md={3} className="g-3">
          {featured.map((m) => (
            <Col key={m.id}>
              <MealCard meal={m} />
            </Col>
          ))}
        </Row>
      </section>

      <Reviews />
    </motion.div>
  )
}
