import { useMemo, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { drinks } from '../data/drinks.js'
import DrinkCard from '../components/DrinkCard'
import SearchBar from '../components/SearchBar'
import { motion } from 'framer-motion'

export default function Drinks() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return drinks.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <h1 className="mb-3">Drinks</h1>
      <SearchBar value={query} onChange={setQuery} placeholder="Search drinks..." />
      <Row xs={1} md={3} className="g-3">
        {filtered.map((d) => (
          <Col key={d.id}>
            <DrinkCard drink={d} />
          </Col>
        ))}
      </Row>
    </motion.div>
  )
}
