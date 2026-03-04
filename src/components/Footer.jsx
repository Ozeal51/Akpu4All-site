import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="bg-light border-top mt-5" style={{ marginTop: '6rem' }}>
      <Container className="py-4 text-center">
        <p className="mb-1">© {new Date().getFullYear()} Akpu4All</p>
        <small className="text-muted">Delicious meals and drinks at our restaurant</small>
      </Container>
    </footer>
  )
}
