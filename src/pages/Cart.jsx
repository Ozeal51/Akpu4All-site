import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Cart() {
  const { items, addItem, removeItem, deleteItem, totalPrice, clearCart } = useContext(CartContext)

  if (items.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <h1 className="mb-3">Your Cart</h1>
        <p>Your cart is empty.</p>
        <Button as={Link} to="/meals">Browse Meals</Button>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <h1 className="mb-3">Your Cart</h1>
      <Row className="g-3">
        <Col md={8}>
          {items.map((i) => (
            <Card key={i.id} className="mb-3">
              <Card.Body className="d-flex align-items-center gap-3">
                <img src={i.image} alt={i.name} width={80} height={80} style={{ objectFit: 'cover', borderRadius: 8 }} />
                <div className="flex-grow-1">
                  <div className="fw-bold">{i.name}</div>
                  <div className="text-muted">₦{i.price.toFixed(2)} x {i.qty}</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button size="sm" variant="outline-secondary" onClick={() => removeItem(i.id)}>-</Button>
                  <Button size="sm" variant="outline-secondary" onClick={() => addItem(i)}>+</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => deleteItem(i.id)}>Remove</Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Total</span>
                <span className="fw-bold">₦{totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-grid gap-2">
                <Button as={Link} to="/checkout" variant="primary">Proceed to Checkout</Button>
                <Button variant="outline-danger" onClick={clearCart}>Clear Cart</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </motion.div>
  )
}
