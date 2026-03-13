import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Meals from './pages/Meals.jsx'
import Drinks from './pages/Drinks.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import { ProtectedRoute, GuestRoute } from './components/ProtectedRoute.jsx'
import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '4.5rem' }}>
        <Routes>
          {/* Full-page auth routes (no inner Container) */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Standard routes with Container */}
          <Route
            path="/*"
            element={
              <Container className="py-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/meals" element={<Meals />} />
                  <Route path="/drinks" element={<Drinks />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Container>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
