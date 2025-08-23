'use client'

import { useReadingMode } from '@/contexts/ReadingModeContext'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function ReadingModeToggle() {
  const { theme, toggleTheme } = useReadingMode()

  return (
    <div className="fixed top-24 right-4 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-2xl">
      <button
        onClick={toggleTheme}
        className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-400'
        }`}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <div
          className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 flex items-center justify-center ${
            theme === 'dark' ? 'translate-x-0.5' : 'translate-x-7'
          }`}
        >
          {theme === 'dark' ? (
            <MoonIcon className="w-4 h-4 text-gray-600" />
          ) : (
            <SunIcon className="w-4 h-4 text-yellow-600" />
          )}
        </div>
      </button>
    </div>
  )
}