import { useState, useEffect, useCallback } from 'react'
import { AuthContext } from './auth.js'
import { authAPI, API_BASE_URL } from '../services/api.js'

function getAuthErrorMessage(err, fallbackMessage) {
  const apiMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg
  if (apiMessage) {
    return apiMessage
  }

  if (err.code === 'ERR_NETWORK') {
    return `Cannot reach the server right now. Please check the API URL (${API_BASE_URL}), CORS settings, or backend deployment.`
  }

  if (err.message) {
    return err.message
  }

  return fallbackMessage
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('akpu-user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(() => !!localStorage.getItem('akpu-token'))
  const [authError, setAuthError] = useState(null)

  // Verify token on mount
  useEffect(() => {
    const token = localStorage.getItem('akpu-token')
    if (!token) return

    authAPI
      .getMe()
      .then((res) => {
        setUser(res.data.user)
        localStorage.setItem('akpu-user', JSON.stringify(res.data.user))
      })
      .catch(() => {
        localStorage.removeItem('akpu-token')
        localStorage.removeItem('akpu-user')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const register = useCallback(async ({ name, email, password, phone }) => {
    setAuthError(null)
    try {
      const res = await authAPI.register({ name, email, password, phone })
      const { token, user: userData } = res.data
      localStorage.setItem('akpu-token', token)
      localStorage.setItem('akpu-user', JSON.stringify(userData))
      setUser(userData)
      return { success: true }
    } catch (err) {
      const message = getAuthErrorMessage(err, 'Registration failed')
      setAuthError(message)
      return { success: false, message }
    }
  }, [])

  const login = useCallback(async ({ email, password }) => {
    setAuthError(null)
    try {
      const res = await authAPI.login({ email, password })
      const { token, user: userData } = res.data
      localStorage.setItem('akpu-token', token)
      localStorage.setItem('akpu-user', JSON.stringify(userData))
      setUser(userData)
      return { success: true }
    } catch (err) {
      console.log('Login error:', err)
      const message = getAuthErrorMessage(err, 'Login failed')
      setAuthError(message)
      return { success: false, message }
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('akpu-token')
    localStorage.removeItem('akpu-user')
    setUser(null)
    setAuthError(null)
  }, [])

  const updateProfile = useCallback(async (data) => {
    try {
      const res = await authAPI.updateProfile(data)
      const updated = res.data.user
      setUser(updated)
      localStorage.setItem('akpu-user', JSON.stringify(updated))
      return { success: true }
    } catch (err) {
      const message = getAuthErrorMessage(err, 'Update failed')
      return { success: false, message }
    }
  }, [])

  const changePassword = useCallback(async (data) => {
    try {
      await authAPI.changePassword(data)
      return { success: true }
    } catch (err) {
      const message = getAuthErrorMessage(err, 'Password change failed')
      return { success: false, message }
    }
  }, [])

  const clearError = useCallback(() => setAuthError(null), [])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        isAuthenticated,
        register,
        login,
        logout,
        updateProfile,
        changePassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
