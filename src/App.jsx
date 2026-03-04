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
import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '4.5rem' }}>
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/drinks" element={<Drinks />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  )
}
