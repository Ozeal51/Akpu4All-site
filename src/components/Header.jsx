import { useContext } from 'react'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { ThemeContext } from '../context/theme'
import { CartContext } from '../context/cart'

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { cartCount } = useContext(CartContext)

  return (
    <Navbar expand="lg" fixed="top" className="navbar-glass" data-bs-theme={theme}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold navbar-brand-custom">
          Akpu4All
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="akpu-navbar" />
        <Navbar.Collapse id="akpu-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/meals">
              Meals
            </Nav.Link>
            <Nav.Link as={NavLink} to="/drinks">
              Drinks
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-secondary btn-sm" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <Nav.Link as={NavLink} to="/cart" className="position-relative">
              Cart{' '}
              <Badge bg="danger" pill>
                {cartCount}
              </Badge>
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
