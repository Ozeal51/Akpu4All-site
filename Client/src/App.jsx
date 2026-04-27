import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
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

export default function App() {
  const whatsappNumber = '09021927275'
  const whatsappLink = `https://wa.me/2349021927275?text=${encodeURIComponent('Hi Akpu4All, I want to place an order.')}`

  return (
    <div className="min-h-screen bg-white text-dark-800">
      <Navbar />
      <main className="min-h-screen pt-20">
        <Routes>
          {/* Full-page routes (auth pages) */}
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

          {/* Standard routes with consistent padding */}
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
      </main>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Message us on WhatsApp at ${whatsappNumber}`}
        className="fixed bottom-5 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-green-600 sm:bottom-6 sm:right-6"
      >
        <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.02c-.29-.15-1.71-.85-1.98-.94-.26-.1-.45-.15-.64.14-.19.29-.73.94-.89 1.13-.17.19-.33.21-.62.07-.29-.15-1.2-.44-2.29-1.39-.85-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.45.12-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.55-.88-2.12-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44s1.03 2.83 1.17 3.03c.14.19 2.03 3.09 4.92 4.33.69.29 1.22.46 1.64.59.69.22 1.33.19 1.83.12.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
          <path d="M16.01 3.2C8.95 3.2 3.23 8.92 3.23 15.98c0 2.5.73 4.94 2.1 7.02L3 29l6.19-2.27c2 .99 4.2 1.51 6.45 1.51h.01c7.06 0 12.78-5.72 12.78-12.78 0-3.42-1.33-6.63-3.75-9.05A12.7 12.7 0 0 0 16.01 3.2zm-.36 22.9h-.01a10.3 10.3 0 0 1-5.24-1.43l-.38-.22-3.67 1.35 1.2-3.78-.25-.39a10.28 10.28 0 0 1-1.59-5.51c0-5.68 4.62-10.3 10.3-10.3 2.75 0 5.33 1.07 7.27 3.01 1.94 1.94 3.01 4.52 3.01 7.27 0 5.68-4.62 10.3-10.3 10.3z" />
        </svg>
        <span>WhatsApp: {whatsappNumber}</span>
      </a>

      <Footer />
    </div>
  )
}
