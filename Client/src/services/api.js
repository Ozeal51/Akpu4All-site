import axios from 'axios'

const defaultApiBaseUrl = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl,
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
    if (error.response?.status === 401) {
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
