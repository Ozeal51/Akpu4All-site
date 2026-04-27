import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion'
import { CartContext } from '../context/cart'
import { ThemeContext } from '../context/theme.js'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const { cartCount } = useContext(CartContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Meals', href: '/meals' },
    { label: 'Drinks', href: '/drinks' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-dark-200 bg-white/95 backdrop-blur-lg">
      <div className="border-b border-dark-100 bg-primary-50/70 px-3 py-1 text-center text-[11px] font-medium uppercase tracking-wide text-dark-600 sm:text-xs">
        Inspired by African Tradition • Perfected for everyday Swallow ordering
      </div>

      <div className="container-max px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-xl font-bold text-dark-900 transition-colors hover:text-dark-700 sm:text-2xl"
          >
            Akpu4All
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group relative text-sm font-semibold uppercase tracking-wide text-dark-700 transition-colors hover:text-dark-900"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-dark-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative rounded-lg p-2 text-dark-700 hover:bg-dark-100 hover:text-accent-500 transition-colors"
              aria-label="Order cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2m0 0L7 13h10l4-8H5.4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l-1 5h12" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold leading-none text-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              className={`theme-toggle ${theme === 'dark-green' ? 'theme-toggle-active' : ''}`}
              aria-label={`Switch to ${theme === 'milky' ? 'dark green' : 'milky'} theme`}
              title={`Theme: ${theme === 'milky' ? 'Milky' : 'Dark Green'}`}
            >
              <span className="theme-toggle-track" aria-hidden="true">
                <span className="theme-toggle-dot theme-toggle-dot-milky" />
                <span className="theme-toggle-dot theme-toggle-dot-green" />
                <span className="theme-toggle-thumb" />
              </span>
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="h-10 w-10 rounded-full border border-dark-200 bg-white font-semibold text-dark-800 transition-colors hover:bg-dark-100">
                  {user?.name?.charAt(0).toUpperCase() || '?'}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4 border-b border-dark-100">
                    <p className="font-semibold text-dark-900">{user?.name}</p>
                    <p className="text-sm text-dark-600">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-dark-700 hover:bg-dark-50 transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-dark-700 hover:bg-dark-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-ghost hidden px-3 py-2 text-sm sm:inline-flex">
                  Sign In
                </Link>
                <Link to="/register" className="hidden rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:inline-flex">
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-dark-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 border-t border-dark-100 pb-2 pt-3 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block rounded-lg px-3 py-2 text-sm font-semibold uppercase tracking-wide text-dark-700 transition-colors hover:bg-dark-50 hover:text-dark-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {!isAuthenticated && (
              <div className="mt-3 grid grid-cols-2 gap-2 px-1">
                <Link
                  to="/login"
                  className="rounded-lg border border-dark-200 px-3 py-2 text-center text-sm font-medium text-dark-700 hover:bg-dark-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
