import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'

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
  const strengthPercent = (passwordStrength / 5) * 100
  const strengthColor =
    passwordStrength <= 1
      ? 'bg-red-500'
      : passwordStrength === 2
        ? 'bg-yellow-500'
        : passwordStrength === 3
          ? 'bg-blue-500'
          : 'bg-green-500'

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-12">
      <div className="container-max flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-lg rounded-2xl border border-dark-100 bg-white p-8 shadow-lift"
        >
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-display font-bold gradient-text">Akpu4All</h1>
            <p className="mt-2 text-sm text-dark-600">Create your account to get started</p>
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
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-dark-800">Full Name <span className="text-red-500">*</span></label>
              <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Full Name" className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" autoComplete="name" required />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-dark-800">Email Address <span className="text-red-500">*</span></label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" autoComplete="email" required />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-dark-800">Phone Number <span className="text-dark-500">(optional)</span></label>
              <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 000 000 0000" className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" autoComplete="tel" />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-dark-800">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Min. 6 characters" className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 pr-12 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" autoComplete="new-password" required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password visibility">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {formData.password && (
              <div>
                <div className="h-1.5 w-full rounded-full bg-dark-200">
                  <div className={`h-1.5 rounded-full transition-all ${strengthColor}`} style={{ width: `${strengthPercent}%` }} />
                </div>
                <p className="mt-1 text-xs text-dark-600">Strength: {strengthLabels[passwordStrength]}</p>
              </div>
            )}

            <div>
              <label htmlFor="confirm" className="mb-2 block text-sm font-semibold text-dark-800">Confirm Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input id="confirm" type={showConfirm ? 'text' : 'password'} name="confirm" value={formData.confirm} onChange={handleChange} placeholder="Repeat your password" className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 pr-12 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" autoComplete="new-password" required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowConfirm((v) => !v)} aria-label="Toggle confirm password visibility">
                  {showConfirm ? '🙈' : '👁️'}
                </button>
              </div>
              {formData.confirm && formData.password !== formData.confirm && <p className="mt-1 text-xs text-red-600">Passwords do not match</p>}
            </div>

            <label className="flex items-start gap-2 text-sm text-dark-700">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5" />
              <span>
                I agree to the{' '}
                <Link to="/about" className="text-accent-600 hover:text-accent-700">Terms & Conditions</Link>
              </span>
            </label>

            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-sm text-dark-400">
            <div className="h-px flex-1 bg-dark-200" />
            <span>Already have an account?</span>
            <div className="h-px flex-1 bg-dark-200" />
          </div>

          <Link to="/login" className="btn-outline block w-full text-center">
            Sign In
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
