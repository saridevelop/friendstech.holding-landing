export interface Article {
  id: string
  title: string
  description: string
  date: string
  slug: string
  content?: string
  featured?: boolean
  tags?: string[]
  readTime?: string
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Cómo Validamos Ideas de Micro-SaaS Hablando Directamente con el Cliente (Antes de Escribir Una Línea de Código)',
    description: 'La mayoría de desarrolladores cometen el mismo error: construyen la solución primero y buscan clientes después. Nosotros decidimos hacer exactamente lo opuesto.',
    date: '23 de Agosto, 2025',
    slug: 'como-validar-micro-saas-problem-first',
    featured: true,
    tags: ['micro-saas', 'validación', 'startup'],
    readTime: '8 minutos'
  }
]

export const getFeaturedArticles = () => articles.filter(article => article.featured)

export const getArticleBySlug = (slug: string) => articles.find(article => article.slug === slug)

export const getAllArticles = () => articles