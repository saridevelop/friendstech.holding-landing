'use client'

import { Rocket, Smartphone, Package, ArrowRight } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: 'Project Launch',
      description: 'Una plataforma de gestión de proyectos que simplifica la colaboración y el seguimiento de tareas para equipos pequeños.',
      icon: Rocket,
      iconColor: 'bg-indigo-500',
      textColor: 'text-indigo-400',
      technologies: ['React', 'Firebase', 'Tailwind CSS']
    },
    {
      title: 'Mobile Assistant',
      description: 'Una app móvil para iOS y Android que ayuda a los usuarios a organizar sus finanzas personales de forma intuitiva.',
      icon: Smartphone,
      iconColor: 'bg-purple-500',
      textColor: 'text-purple-400',
      technologies: ['React Native', 'Node.js']
    },
    {
      title: 'E-commerce API',
      description: 'Una API RESTful robusta y escalable para gestionar productos, pedidos y pagos para tiendas online.',
      icon: Package,
      iconColor: 'bg-green-500',
      textColor: 'text-green-400',
      technologies: ['Python', 'FastAPI', 'PostgreSQL']
    }
  ]

  return (
    <section id="projects" className="py-16 sm:py-24">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">Nuestros Proyectos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={project.title} className="bg-gray-900 rounded-xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 ${project.iconColor} text-white rounded-full flex items-center justify-center`}>
                <project.icon className="w-6 h-6" />
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
            <a href="#" className={`${project.textColor} hover:opacity-75 font-medium transition-colors duration-200 flex items-center`}>
              {index === 0 ? 'Visitar proyecto' : 'Ver más'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
