'use client'

import NewsletterSection from './NewsletterSection'

export default function Blog() {
  const posts = [
    {
      title: '5 Principios de Diseño para Apps Simples',
      description: 'Aprende a crear interfaces de usuario que son intuitivas y agradables de usar.',
      date: '15 de Agosto, 2025'
    },
    {
      title: 'Cómo la IA está Cambiando el Desarrollo',
      description: 'Exploramos cómo las herramientas de IA pueden potenciar tu flujo de trabajo.',
      date: '12 de Agosto, 2025'
    },
    {
      title: 'La Importancia de la Arquitectura de Software',
      description: 'Construir bases sólidas para que tus proyectos escalen sin problemas.',
      date: '10 de Agosto, 2025'
    }
  ]

  return (
    <>
      {/* Sección de Blog */}
      <section id="blog" className="py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">Blog Técnico</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.title} className="bg-gray-900 rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{post.description}</p>
              <div className="flex justify-between items-center text-gray-500 text-xs">
                <span>{post.date}</span>
                <a href="#" className="text-indigo-400 hover:underline">Leer más</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Newsletter */}
      <NewsletterSection />
    </>
  )
}
