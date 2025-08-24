import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://friendslab.dev'),
  title: {
    default: 'FriendsLab.dev - Micro-SaaS y Automatización con IA',
    template: '%s | FriendsLab.dev'
  },
  description: 'Convertimos ideas en micro-SaaS y automatizaciones con IA. Desarrollo serverless, validación temprana y soluciones personalizadas para empresas.',
  keywords: ['micro-saas', 'automatización IA', 'desarrollo serverless', 'validación ideas', 'startup', 'claude', 'openai', 'javascript'],
  authors: [{ name: 'FriendsLab.dev', url: 'https://friendslab.dev' }],
  creator: 'FriendsLab.dev',
  publisher: 'FriendsLab.dev',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://friendslab.dev',
    siteName: 'FriendsLab.dev',
    title: 'FriendsLab.dev - Micro-SaaS y Automatización con IA',
    description: 'Convertimos ideas en micro-SaaS y automatizaciones con IA. Desarrollo serverless, validación temprana y soluciones personalizadas.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FriendsLab.dev - Micro-SaaS y Automatización con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@friendstechdev',
    creator: '@friendstechdev',
    title: 'FriendsLab.dev - Micro-SaaS y Automatización con IA',
    description: 'Convertimos ideas en micro-SaaS y automatizaciones con IA. Desarrollo serverless, validación temprana y soluciones personalizadas.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verificar-google-search-console',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png', 
        sizes: '512x512',
        url: '/android-chrome-512x512.png',
      }
    ]
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

        {/* Structured Data */}
        <Script 
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'FriendsLab.dev',
              url: 'https://friendslab.dev',
              logo: 'https://friendslab.dev/logo.png',
              sameAs: ['https://twitter.com/friendstechdev'],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                email: 'hola@friendslab.dev',
              },
              description: 'Convertimos ideas en micro-SaaS y automatizaciones con IA. Desarrollo serverless, validación temprana y soluciones personalizadas.',
            })
          }}
        />
      </head>
      <body className="bg-gray-950 text-gray-200">
        {children}
      </body>
    </html>
  )
}
