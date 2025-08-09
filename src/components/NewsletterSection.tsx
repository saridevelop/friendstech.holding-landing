'use client'

import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    console.log('Newsletter form submit triggered') // Debug log
    
    // Honeypot check
    const formData = new FormData(e.currentTarget)
    if (formData.get('company')) {
      console.log('Honeypot triggered') // Debug log
      return
    }

    console.log('Email:', email, 'Consent:', consent) // Debug log

    if (!consent) {
      setStatus('error')
      setMessage('Debes aceptar la política de privacidad')
      return
    }

    setStatus('loading')
    setMessage('')

    console.log('Making newsletter API request...') // Debug log

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent }),
      })

      console.log('Newsletter response status:', response.status) // Debug log
      const data = await response.json()
      console.log('Newsletter response data:', data) // Debug log

      if (data.ok) {
        setStatus('success')
        setMessage(data.alreadyExists ? 
          '¡Ya estás suscrito! Gracias por tu interés.' : 
          '¡Genial! Te has suscrito a nuestra newsletter.'
        )
        setEmail('')
        setConsent(false)
      } else {
        setStatus('error')
        setMessage(data.error || 'Ocurrió un error. Inténtalo de nuevo.')
      }
    } catch (error) {
      console.error('Newsletter fetch error:', error) // Debug log
      setStatus('error')
      setMessage('Error de conexión. Verifica tu internet.')
    }
  }

  return (
    <section id="newsletter" className="py-16 sm:py-24">
      <div className="bg-gray-900 rounded-xl p-8 sm:p-12 text-center shadow-xl max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Únete a nuestra comunidad privada</h2>
        <p className="text-gray-400 mb-8">
          Accede a contenido exclusivo: análisis de producto, herramientas secretas y los aprendizajes que usamos en cada proyecto.
        </p>
        
        <form onSubmit={handleNewsletterSubmit} className="space-y-6">
          {/* Honeypot field */}
          <input 
            type="text" 
            name="company" 
            tabIndex={-1} 
            autoComplete="off" 
            className="hidden" 
            aria-hidden="true" 
          />
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu email" 
              required
              disabled={status === 'loading'}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={status === 'loading' || !email || !consent}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Suscribiendo...' : 'Suscribirse'}
            </button>
          </div>

          <label className="flex items-center justify-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={status === 'loading'}
              className="text-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
            />
            <span>
              Acepto la{' '}
              <a 
                href="/privacidad" 
                className="underline text-indigo-400 hover:text-indigo-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                política de privacidad
              </a>
              .
            </span>
          </label>

          {message && (
            <p className={`text-sm ${
              status === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
