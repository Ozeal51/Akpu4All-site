import { useEffect, useState } from 'react'
import { ThemeContext } from './theme.js'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('akpu-theme')

    if (saved === 'light') return 'milky'
    if (saved === 'dark') return 'dark-green'

    return saved || 'milky'
  })

  useEffect(() => {
    localStorage.setItem('akpu-theme', theme)

    const bootstrapTheme = theme === 'dark-green' ? 'dark' : 'light'

    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('data-bs-theme', bootstrapTheme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'milky' ? 'dark-green' : 'milky'))
  }

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}
