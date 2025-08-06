'use client'

import { Package, ArrowRight, LucideIcon, TrendingUp, ShoppingBag } from 'lucide-react'
import Image from 'next/image'

interface Project {
  title: string;
  description: string;
  logo?: string;
  url?: string;
  icon?: LucideIcon;
  iconColor: string;
  textColor: string;
  technologies: string[];
  status?: 'active' | 'private' | 'closed';
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: 'PadelBook.ing',
      description: 'Sistema de reservas de pádel que permite a los clubs gestionar sus pistas, reservas y clientes de manera sencilla.',
      logo: '/images/projects/padelbook-logo.png',
      url: 'https://padelbook.ing',
      iconColor: 'bg-black-500',
      textColor: 'text-blue-400',
      technologies: ['React', 'Tailwind CSS', 'Supabase', 'Cloudflare'],
      status: 'active'
    },
    {
      title: 'MailTuner',
      description: 'Herramienta que te permite ajustar tus emails con IA de una manera sencilla y rápida, optimizando el contenido y el tono para mejorar la efectividad.',
      logo: '/images/projects/logo-MailTuner.webp',
      url: 'https://mailtuner.app',
      iconColor: 'bg-white-500',
      textColor: 'text-orange-400',
      technologies: ['Next.js', 'Vercel', 'Tailwind CSS', 'OpenAI'],
      status: 'active'
    },
    {
      title: 'CryptoTrader Bot',
      description: 'Programa de trading automático de criptomonedas que utiliza análisis técnico avanzado para realizar operaciones de compra y venta de forma automatizada.',
      icon: TrendingUp,
      iconColor: 'bg-purple-500',
      textColor: 'text-purple-400',
      technologies: ['Python', 'Pandas', 'NumPy', 'TA-Lib', 'CCXT'],
      status: 'private'
    },
    {
      title: 'SockIt',
      description: 'Tienda online de calcetines coloridos y estampados con automatización IA para edición y publicación de productos de forma inteligente.',
      logo: '/images/projects/sockit-logo.svg',
      iconColor: 'bg-yellow-500',
      textColor: 'text-yellow-400',
      technologies: ['Shopify', 'OpenAI', 'Next.js'],
      status: 'closed'
    }
  ]

  return (
    <section id="projects" className="py-16 sm:py-24">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">Nuestros Proyectos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {projects.map((project, index) => (
          <div key={project.title} className="bg-gray-900 rounded-xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 ${project.iconColor} text-white rounded-full flex items-center justify-center overflow-hidden`}>
                {project.logo ? (
                  <Image 
                    src={project.logo} 
                    alt={`${project.title} logo`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                ) : project.icon ? (
                  <project.icon className="w-6 h-6" />
                ) : null}
              </div>
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
            </div>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span key={tech} className={`bg-gray-800 ${project.textColor} px-3 py-1 rounded-full text-xs font-medium`}>
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              {project.status === 'active' && project.url ? (
                <a 
                  href={project.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${project.textColor} hover:opacity-75 font-medium transition-colors duration-200 flex items-center`}
                >
                  Visitar proyecto
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              ) : project.status === 'private' ? (
                <span className={`${project.textColor} font-medium flex items-center opacity-75`}>
                  PROYECTO PRIVADO
                  <Package className="w-4 h-4 ml-2" />
                </span>
              ) : project.status === 'closed' ? (
                <span className={`${project.textColor} font-medium flex items-center opacity-75`}>
                  CERRADA
                  <ShoppingBag className="w-4 h-4 ml-2" />
                </span>
              ) : (
                <span className={`${project.textColor} hover:opacity-75 font-medium transition-colors duration-200 flex items-center cursor-pointer`}>
                  Ver más
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
