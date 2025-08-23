'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

interface ReadingModeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ReadingModeContext = createContext<ReadingModeContextType | undefined>(undefined)

export function ReadingModeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('reading-theme') as Theme
    
    if (savedTheme) setTheme(savedTheme)
  }, [])

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('reading-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ReadingModeContext.Provider value={{
      theme,
      toggleTheme
    }}>
      {children}
    </ReadingModeContext.Provider>
  )
}

export function useReadingMode() {
  const context = useContext(ReadingModeContext)
  if (context === undefined) {
    throw new Error('useReadingMode must be used within a ReadingModeProvider')
  }
  return context
}