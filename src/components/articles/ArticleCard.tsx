'use client'

import Link from 'next/link'
import { Article } from '@/lib/articles'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
      <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
        {article.title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
        {article.description}
      </p>
      <div className="flex justify-between items-center text-gray-500 text-xs mb-4">
        <span>{article.date}</span>
        {article.readTime && (
          <span>{article.readTime}</span>
        )}
      </div>
      {article.tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <Link
        href={`/blog/${article.slug}`}
        className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors text-sm font-medium"
      >
        Leer más →
      </Link>
    </div>
  )
}