import { useMemo, useState } from 'react'
import { Row, Col, Modal, Image } from 'react-bootstrap'
import { meals, mealCategories } from '../data/meals.js'
import MealCard from '../components/MealCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import { motion } from 'framer-motion'

export default function Meals() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    return meals.filter((m) => {
      const byCategory = category === 'All' || m.category === category
      const byQuery = m.name.toLowerCase().includes(query.toLowerCase()) || m.description.toLowerCase().includes(query.toLowerCase())
      return byCategory && byQuery
    })
  }, [query, category])

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <h1 className="mb-3">Meals</h1>
      <SearchBar value={query} onChange={setQuery} placeholder="Search meals..." />
      <CategoryFilter categories={mealCategories} active={category} onChange={setCategory} />

      <Row xs={1} md={3} className="g-3">
        {filtered.map((m) => (
          <Col key={m.id} onClick={() => setSelected(m)} style={{ cursor: 'pointer' }}>
            <MealCard meal={m} />
          </Col>
        ))}
      </Row>

      <Modal show={!!selected} onHide={() => setSelected(null)} centered>
        {selected && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selected.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image src={selected.image} alt={selected.name} fluid className="mb-3" />
              <p className="mb-1">{selected.description}</p>
              <p className="fw-bold mb-0">Category: {selected.category}</p>
              <p className="fw-bold">Price: #{selected.price.toFixed(2)}</p>
            </Modal.Body>
          </>
        )}
      </Modal>
    </motion.div>
  )
}
