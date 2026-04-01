import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, authError, clearError } = useAuth()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [localError, setLocalError] = useState('')

  const from = location.state?.from?.pathname || '/'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setLocalError('')
    clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')

    if (!formData.email || !formData.password) {
      setLocalError('Please fill in all fields')
      return
    }

    setSubmitting(true)
    const result = await login(formData)
    setSubmitting(false)

    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setLocalError(result.message)
    }
  }

  const error = localError || authError

  return (
    <div className="auth-page">
      <Container className="auth-container">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo */}
          <div className="auth-logo">
            <span className="auth-brand">Akpu4All</span>
            <p className="auth-subtitle">Welcome back! Sign in to your account</p>
          </div>

          {error && (
            <Alert variant="danger" dismissible onClose={() => { setLocalError(''); clearError() }} className="auth-alert">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="auth-input"
                autoComplete="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="password-wrapper">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="auth-input"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end mb-3">
              <Link to="/forgot-password" className="auth-link small">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="auth-btn w-100" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </Form>

          <div className="auth-divider">
            <span>New to Akpu4All?</span>
          </div>

          <Link to="/register" className="btn auth-btn-outline w-100">
            Create an Account
          </Link>
        </motion.div>
      </Container>
    </div>
  )
}
