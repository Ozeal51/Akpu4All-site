import { useContext } from 'react'
import { Navbar, Nav, Container, Badge, Dropdown } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/theme'
import { CartContext } from '../context/cart'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { cartCount } = useContext(CartContext)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const avatarInitial = user?.name?.charAt(0).toUpperCase() || '?'

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
          <div className="d-flex align-items-center gap-2 gap-lg-3 flex-wrap">
            {/* Theme Toggle */}
            <button className="btn btn-outline-secondary btn-sm" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Cart */}
            <Nav.Link as={NavLink} to="/cart" className="position-relative">
              🛒
              {cartCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {/* Auth */}
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="none"
                  className="user-avatar-btn p-0 border-0"
                  id="user-dropdown"
                  aria-label="User menu"
                >
                  <div className="nav-avatar">{avatarInitial}</div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-dropdown-menu">
                  <Dropdown.Header>
                    <div className="fw-semibold">{user?.name}</div>
                    <div className="text-muted small">{user?.email}</div>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item as={NavLink} to="/profile">
                    👤 My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/cart">
                    🛒 My Cart {cartCount > 0 && <Badge bg="danger" pill>{cartCount}</Badge>}
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/checkout">
                    📦 Checkout
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    🚪 Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex gap-2">
                <Nav.Link as={NavLink} to="/login" className="btn btn-sm auth-nav-btn-outline">
                  Sign In
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="btn btn-sm auth-nav-btn">
                  Sign Up
                </Nav.Link>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
