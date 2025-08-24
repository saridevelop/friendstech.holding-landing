import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FriendsLab.dev - Micro-SaaS y Automatización con IA',
    short_name: 'FriendsLab',
    description: 'Convertimos ideas en micro-SaaS y automatizaciones con IA. Desarrollo serverless, validación temprana y soluciones personalizadas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#6366f1',
    categories: ['business', 'developer', 'technology'],
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    lang: 'es',
  }
}