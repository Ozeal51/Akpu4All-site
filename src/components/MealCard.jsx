import { Card, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { motion } from 'framer-motion'

export default function MealCard({ meal }) {
  const { addItem } = useContext(CartContext)
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <Card className="h-100 shadow-sm">
        <Card.Img variant="top" src={meal.image} alt={meal.name} style={{ objectFit: 'cover', height: 180 }} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{meal.name}</Card.Title>
          <Card.Text className="text-muted flex-grow-1">{meal.description}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">₦{meal.price.toFixed(2)}</span>
            <Button variant="primary" onClick={() => addItem({ id: meal.id, name: meal.name, price: meal.price, image: meal.image })}>
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}
