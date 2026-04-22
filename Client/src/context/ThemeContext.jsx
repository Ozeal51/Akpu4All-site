import { useEffect, useState } from 'react'
import { ThemeContext } from './theme.js'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('akpu-theme')
    return saved || 'light'
  })

  useEffect(() => {
    localStorage.setItem('akpu-theme', theme)
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
