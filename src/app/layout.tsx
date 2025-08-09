import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Friendstech.dev - Convertimos ideas en productos digitales',
  description: 'Somos un equipo de expertos que ayudamos a empresas y emprendedores a convertir ideas en productos digitales simples, efectivos y pragmáticos.',
  keywords: 'desarrollo software, aplicaciones móviles, desarrollo web, consultoria técnica, UX/UI design, productos digitales',
  authors: [{ name: 'Friendstech.dev' }],
  creator: 'Friendstech.dev',
  openGraph: {
    title: 'Friendstech.dev - Convertimos ideas en productos digitales',
    description: 'Somos un equipo de expertos que ayudamos a empresas y emprendedores a convertir ideas en productos digitales simples, efectivos y pragmáticos.',
    url: 'https://friendstech.dev',
    siteName: 'Friendstech.dev',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Friendstech.dev - Convertimos ideas en productos digitales',
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
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6EKH928H30"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6EKH928H30');
          `}
        </Script>
      </head>
      <body className="bg-gray-950 text-gray-200">
        {children}
      </body>
    </html>
  )
}
