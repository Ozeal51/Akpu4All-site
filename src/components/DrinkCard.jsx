import { Card, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { motion } from 'framer-motion'

export default function DrinkCard({ drink }) {
  const { addItem } = useContext(CartContext)
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <Card className="h-100 shadow-sm">
        <Card.Img variant="top" src={drink.image} alt={drink.name} style={{ objectFit: 'cover', height: 180 }} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{drink.name}</Card.Title>
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <span className="fw-bold">₦{drink.price.toFixed(2)}</span>
            <Button variant="primary" onClick={() => addItem({ id: drink.id, name: drink.name, price: drink.price, image: drink.image })}>
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}
