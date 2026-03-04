import { useContext, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { CartContext } from '../context/cart'
import { motion } from 'framer-motion'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useContext(CartContext)
  const [form, setForm] = useState({ name: '', address: '', phone: '' })
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    alert('Order placed! Thank you for choosing Akpu4All.')
    clearCart()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <h1 className="mb-3">Checkout</h1>
      <Card className="mb-3">
        <Card.Body>
          <div className="mb-2">Items: {items.length}</div>
          <div className="fw-bold">Total: ₦{totalPrice.toFixed(2)}</div>
        </Card.Body>
      </Card>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control name="name" value={form.name} onChange={onChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control name="address" value={form.address} onChange={onChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control name="phone" value={form.phone} onChange={onChange} required />
        </Form.Group>
        <Button type="submit" size="lg">Place Order</Button>
      </Form>
    </motion.div>
  )
}
