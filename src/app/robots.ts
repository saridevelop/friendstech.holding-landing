import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '*.pdf'],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/blog/', '/blog/*'],
        disallow: ['/private/', '/admin/', '/api/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/blog/', '/blog/*'],
        disallow: ['/private/', '/admin/', '/api/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: ['/blog/', '/blog/*'],
        disallow: ['/private/', '/admin/', '/api/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: ['/blog/', '/blog/*'],
        disallow: ['/private/', '/admin/', '/api/'],
      },
      {
        userAgent: 'Claude',
        allow: ['/blog/', '/blog/*'],
        disallow: ['/private/', '/admin/', '/api/'],
      },
    ],
    sitemap: 'https://friendslab.dev/sitemap.xml',
  }
}