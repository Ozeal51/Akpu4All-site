import axios from 'axios'

const fallbackProdApiBaseUrl = 'https://akpu4all-api.onrender.com/api'
const fallbackDevApiBaseUrl = 'http://localhost:5000/api'
const configuredApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  import.meta.env.VITE_API_URL?.trim() ||
  import.meta.env.REACT_APP_API_URL?.trim() ||
  (import.meta.env.DEV ? fallbackDevApiBaseUrl : fallbackProdApiBaseUrl)

const API = axios.create({
  baseURL: configuredApiBaseUrl,
})

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('akpu-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 responses globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || ''
    const isAuthAttempt = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register')

    if (error.response?.status === 401 && !isAuthAttempt) {
      localStorage.removeItem('akpu-token')
      localStorage.removeItem('akpu-user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
  changePassword: (data) => API.put('/auth/change-password', data),
}

export const productsAPI = {
  list: (params = {}) => API.get('/products', { params }),
  getById: (id) => API.get(`/products/${id}`),
}

export const ordersAPI = {
  listMine: () => API.get('/orders/mine'),
  getById: (id) => API.get(`/orders/${id}`),
  create: (data) => API.post('/orders', data),
}

export const vendorsAPI = {
  list: () => API.get('/vendors'),
  getById: (id) => API.get(`/vendors/${id}`),
}

export const transactionsAPI = {
  listMine: () => API.get('/transactions'),
  getById: (id) => API.get(`/transactions/${id}`),
  create: (data) => API.post('/transactions', data),
}

export default API
