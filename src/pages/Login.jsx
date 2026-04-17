import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'

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
    <section className="min-h-[calc(100vh-5rem)] bg-primary-50 px-4 py-12">
      <div className="container-max flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md rounded-[2rem] border border-dark-100 bg-white p-8 shadow-soft"
        >
          <div className="mb-6 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dark-500">Welcome back</p>
            <h1 className="mt-2 text-3xl font-display font-bold text-dark-900">Sign in</h1>
            <p className="mt-2 text-sm text-dark-600">Continue to your account and complete your next food order.</p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <div className="flex items-start justify-between gap-3">
                <span>{error}</span>
                <button
                  type="button"
                  className="font-semibold"
                  onClick={() => {
                    setLocalError('')
                    clearError()
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-dark-800">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full rounded-full border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-dark-800">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-full border-2 border-dark-200 px-4 py-3 pr-12 focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-accent-600 hover:text-accent-700">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-sm text-dark-400">
            <div className="h-px flex-1 bg-dark-200" />
            <span>New to Akpu4All?</span>
            <div className="h-px flex-1 bg-dark-200" />
          </div>

          <Link to="/register" className="btn-outline block w-full text-center">
            Create an Account
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
