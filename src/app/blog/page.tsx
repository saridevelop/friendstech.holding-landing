import ArticleCard from '@/components/articles/ArticleCard'
import { getAllArticles } from '@/lib/articles'
import NewsletterSection from '@/components/NewsletterSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Blog Técnico - Micro-SaaS, IA y Validación de Ideas',
  description: 'Artículos sobre micro-SaaS, automatización con IA, validación temprana de ideas, desarrollo serverless y metodologías prácticas para startups.',
  keywords: ['blog micro-saas', 'artículos automatización IA', 'validación ideas startup', 'desarrollo serverless', 'claude openai'],
  canonicalUrl: '/blog',
  ogType: 'website',
})

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            ← Volver a la home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog Técnico</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights, metodologías y experiencias reales construyendo micro-SaaS y automatizaciones con IA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
}