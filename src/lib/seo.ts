import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
}

const defaultMetadata = {
  siteName: 'friendstech.dev',
  siteUrl: 'https://friendstech.dev',
  twitterHandle: '@friendstechdev',
  defaultImage: '/og-image.png',
  locale: 'es_ES',
}

export function generateMetadata({
  title,
  description = 'Convertimos ideas en micro-SaaS y automatizaciones con IA. Desarrollo serverless, validación temprana y soluciones personalizadas para empresas.',
  keywords = ['micro-saas', 'desarrollo software', 'automatización IA', 'startup', 'validación ideas', 'serverless'],
  canonicalUrl,
  ogImage = defaultMetadata.defaultImage,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}: SEOProps = {}): Metadata {
  const fullTitle = title 
    ? `${title} | ${defaultMetadata.siteName}`
    : `${defaultMetadata.siteName} - Micro-SaaS y Automatización con IA`

  const fullUrl = canonicalUrl 
    ? `${defaultMetadata.siteUrl}${canonicalUrl}`
    : defaultMetadata.siteUrl

  const allKeywords = [...keywords, 'friendslab', 'micro-saas', 'automatización', 'inteligencia artificial', 'validación temprana', 'desarrollo ágil']

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords.join(', '),
    authors: authors?.map(name => ({ name })) || [{ name: defaultMetadata.siteName }],
    creator: defaultMetadata.siteName,
    publisher: defaultMetadata.siteName,
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: ogType,
      locale: defaultMetadata.locale,
      url: fullUrl,
      siteName: defaultMetadata.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || defaultMetadata.siteName,
        },
      ],
      ...(ogType === 'article' && {
        publishedTime,
        modifiedTime,
        authors,
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: defaultMetadata.twitterHandle,
      creator: defaultMetadata.twitterHandle,
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }

  return metadata
}

export function generateArticleJsonLd({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  authors = ['friendstech.dev'],
  tags = [],
  readTime,
}: {
  title: string
  description: string
  url: string
  publishedTime: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  readTime?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${defaultMetadata.siteUrl}${url}`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: authors.map(name => ({
      '@type': 'Person',
      name,
    })),
    publisher: {
      '@type': 'Organization',
      name: defaultMetadata.siteName,
      url: defaultMetadata.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${defaultMetadata.siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${defaultMetadata.siteUrl}${url}`,
    },
    keywords: tags.join(', '),
    ...(readTime && {
      timeRequired: readTime,
    }),
  }
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: defaultMetadata.siteName,
    url: defaultMetadata.siteUrl,
    logo: `${defaultMetadata.siteUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/friendstechdev',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'info@friendstech.dev',
    },
    description: 'Convertimos ideas en micro-SaaS y automatizaciones con IA. Desarrollo serverless, validación temprana y soluciones personalizadas.',
  }
}
