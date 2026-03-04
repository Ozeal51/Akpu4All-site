import { Form, Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    alert('Thanks for contacting Akpu4All! We will reach out shortly.')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <h1 className="mb-3">Contact Us</h1>
      <Row className="g-4">
        <Col md={6}>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={onChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={form.email} onChange={onChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" value={form.phone} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} name="message" value={form.message} onChange={onChange} required />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
        <Col md={6}>
          <div className="ratio ratio-4x3">
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.866798474902!2d7.462087869598943!3d9.075897464086673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b6a51fb0f3b%3A0x5a97c0944d66fc0a!2sDELIZZ%20SUPERMARKET%20ABUJA!5e0!3m2!1sen!2sng!4v1772630055183!5m2!1sen!2sng" 
            width="600" 
            height="450" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </Col>
      </Row>
    </motion.div>
  )
}
