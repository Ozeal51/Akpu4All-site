import { createContext } from 'react'

export const ThemeContext = createContext({
  theme: 'milky',
  setTheme: () => {},
  toggleTheme: () => {},
})
