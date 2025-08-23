import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsletterSection from '@/components/NewsletterSection'
import Link from 'next/link'
import { ReadingModeProvider } from '@/contexts/ReadingModeContext'

// Import article components
import ComoValidarMicroSaasArticle from '@/components/articles/ComoValidarMicroSaasArticle'

const articleComponents: Record<string, React.ComponentType> = {
  'como-validar-micro-saas-problem-first': ComoValidarMicroSaasArticle,
}

export function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)
  
  if (!article) {
    notFound()
  }

  const ArticleComponent = articleComponents[article.slug]
  
  if (!ArticleComponent) {
    notFound()
  }

  return (
    <ReadingModeProvider>
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            ← Volver al blog
          </Link>
        </div>

        <ArticleComponent />

        <div className="mt-16 pt-16 border-t border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">¿Te gustó este artículo?</h3>
            <p className="text-gray-400 mb-6">
              Compártelo en X.com y síguenos para más contenido sobre micro-SaaS y automatización con IA
            </p>
            <div className="flex justify-center gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`📄 ${article.title} - Por @friendstechdev`)}&url=${encodeURIComponent(`https://friendstech.dev/blog/${article.slug}`)}&hashtags=microsaas,startup,validacion`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                📤 Compartir en X
              </a>
              <a
                href="https://twitter.com/friendstechdev"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                🐦 Seguir @friendstechdev
              </a>
            </div>
          </div>
        </div>

        <NewsletterSection />
      </main>
      <Footer />
    </ReadingModeProvider>
  )
}