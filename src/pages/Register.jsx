import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Form, Button, Alert, Spinner, ProgressBar } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import './Auth.css'

function getPasswordStrength(password) {
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
const strengthVariants = ['', 'danger', 'warning', 'info', 'success', 'success']

export default function Register() {
  const navigate = useNavigate()
  const { register, authError, clearError } = useAuth()

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [localError, setLocalError] = useState('')
  const [agreed, setAgreed] = useState(false)

  const passwordStrength = getPasswordStrength(formData.password)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setLocalError('')
    clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')

    if (!formData.name || !formData.email || !formData.password || !formData.confirm) {
      setLocalError('Please fill in all required fields')
      return
    }
    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters')
      return
    }
    if (formData.password !== formData.confirm) {
      setLocalError('Passwords do not match')
      return
    }
    if (!agreed) {
      setLocalError('Please agree to the Terms & Conditions')
      return
    }

    setSubmitting(true)
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    })
    setSubmitting(false)

    if (result.success) {
      navigate('/', { replace: true })
    } else {
      setLocalError(result.message)
    }
  }

  const error = localError || authError

  return (
    <div className="auth-page">
      <Container className="auth-container">
        <motion.div
          className="auth-card auth-card-wide"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo */}
          <div className="auth-logo">
            <span className="auth-brand">Akpu4All</span>
            <p className="auth-subtitle">Create your account to get started</p>
          </div>

          {error && (
            <Alert variant="danger" dismissible onClose={() => { setLocalError(''); clearError() }} className="auth-alert">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="auth-input"
                autoComplete="name"
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="auth-input"
                autoComplete="email"
                required
              />
            </Form.Group>

            {/* Phone */}
            <Form.Group className="mb-3">
              <Form.Label>Phone Number <span className="text-muted">(optional)</span></Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 000 000 0000"
                className="auth-input"
                autoComplete="tel"
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-1">
              <Form.Label>Password <span className="text-danger">*</span></Form.Label>
              <div className="password-wrapper">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="auth-input"
                  autoComplete="new-password"
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

            {/* Password Strength */}
            {formData.password && (
              <div className="mb-3">
                <ProgressBar
                  now={(passwordStrength / 5) * 100}
                  variant={strengthVariants[passwordStrength]}
                  className="password-strength-bar"
                />
                <small className={`text-${strengthVariants[passwordStrength]}`}>
                  Strength: {strengthLabels[passwordStrength]}
                </small>
              </div>
            )}

            {/* Confirm Password */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>
              <div className="password-wrapper">
                <Form.Control
                  type={showConfirm ? 'text' : 'password'}
                  name="confirm"
                  value={formData.confirm}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="auth-input"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? '🙈' : '👁️'}
                </button>
              </div>
              {formData.confirm && formData.password !== formData.confirm && (
                <small className="text-danger">Passwords do not match</small>
              )}
            </Form.Group>

            {/* Terms */}
            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                id="terms"
                label={
                  <span>
                    I agree to the{' '}
                    <Link to="/about" className="auth-link">
                      Terms & Conditions
                    </Link>
                  </span>
                }
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
            </Form.Group>

            <Button type="submit" className="auth-btn w-100" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </Form>

          <div className="auth-divider">
            <span>Already have an account?</span>
          </div>

          <Link to="/login" className="btn auth-btn-outline w-100">
            Sign In
          </Link>
        </motion.div>
      </Container>
    </div>
  )
}
