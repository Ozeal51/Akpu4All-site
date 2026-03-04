import { Card, Col, Row } from 'react-bootstrap'

const reviews = [
  { name: 'Mrs Joy', text: 'Amazing Akpu and Nsala! Tastes like home.' },
  { name: 'Mr Smmy', text: 'Fast delivery and great portions.' },
  { name: 'Miss Eliana', text: 'Love the Akpu with oha soup — perfectly made.' },
]

export default function Reviews() {
  return (
    <section>
      <h3 className="mb-3">Customer Reviews</h3>
      <Row xs={1} md={3} className="g-3">
        {reviews.map((r, idx) => (
          <Col key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Text className="fst-italic">“{r.text}”</Card.Text>
                <Card.Subtitle className="text-muted">— {r.name}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  )
}
