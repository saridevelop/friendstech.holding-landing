import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FriendsLab.dev - Convertimos ideas en productos digitales',
  description: 'Somos dos desarrolladores expertos que ayudamos a empresas y emprendedores a convertir ideas en productos digitales simples, efectivos y pragmáticos.',
  keywords: 'desarrollo software, aplicaciones móviles, desarrollo web, consultoria técnica, UX/UI design, productos digitales',
  authors: [{ name: 'FriendsLab.dev' }],
  creator: 'FriendsLab.dev',
  openGraph: {
    title: 'FriendsLab.dev - Convertimos ideas en productos digitales',
    description: 'Somos dos desarrolladores expertos que ayudamos a empresas y emprendedores a convertir ideas en productos digitales simples, efectivos y pragmáticos.',
    url: 'https://friendslab.dev',
    siteName: 'FriendsLab.dev',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FriendsLab.dev - Convertimos ideas en productos digitales',
    description: 'Somos dos desarrolladores expertos que ayudamos a empresas y emprendedores a convertir ideas en productos digitales simples, efectivos y pragmáticos.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-gray-950 text-gray-200">
        {children}
      </body>
    </html>
  )
}
