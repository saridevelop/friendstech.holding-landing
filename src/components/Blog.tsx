'use client'

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
      <section id="newsletter" className="py-16 sm:py-24">
        <div className="bg-gray-900 rounded-xl p-8 sm:p-12 text-center shadow-xl max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Únete a nuestra comunidad privada</h2>
          <p className="text-gray-400 mb-8">
            Accede a contenido exclusivo: análisis de producto, herramientas secretas y los aprendizajes que usamos en cada proyecto.
          </p>
          <form action="#" method="POST" className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input 
              type="email" 
              name="email" 
              placeholder="Introduce tu email" 
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
