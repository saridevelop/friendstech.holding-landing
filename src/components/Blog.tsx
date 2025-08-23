'use client'

import Link from 'next/link'
import { getFeaturedArticles } from '@/lib/articles'
import ArticleCard from './articles/ArticleCard'
import NewsletterSection from './NewsletterSection'

export default function Blog() {
  const featuredArticles = getFeaturedArticles()

  return (
    <>
      {/* Sección de Blog */}
      <section id="blog" className="py-16 sm:py-24">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Blog Técnico</h2>
          <Link 
            href="/blog" 
            className="text-indigo-400 hover:text-indigo-300 transition-colors hidden sm:block"
          >
            Ver todos los artículos →
          </Link>
        </div>
        
        {featuredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            <p className="text-lg">Próximamente: artículos sobre micro-SaaS, validación de ideas y automatización con IA</p>
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link 
            href="/blog" 
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Ver todos los artículos →
          </Link>
        </div>
      </section>

      {/* Sección de Newsletter */}
      <NewsletterSection />
    </>
  )
}
