'use client'

import { Code, Smartphone, Palette, Lightbulb, ArrowRight } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Code,
      title: 'Desarrollo a Medida',
      description: 'Soluciones de software desde cero, adaptadas a las necesidades específicas de tu negocio.',
      color: 'text-indigo-400'
    },
    {
      icon: Smartphone,
      title: 'Apps Móviles',
      description: 'Creación de aplicaciones nativas o híbridas para iOS y Android con una excelente experiencia de usuario.',
      color: 'text-purple-400'
    },
    {
      icon: Palette,
      title: 'Diseño de Producto',
      description: 'Diseño de UX/UI enfocado en la usabilidad, la estética y la conversión para tus productos digitales.',
      color: 'text-green-400'
    },
    {
      icon: Lightbulb,
      title: 'Consultoría',
      description: 'Validamos tu idea, definimos la estrategia técnica y planificamos la hoja de ruta de tu producto.',
      color: 'text-yellow-400'
    }
  ]

  return (
    <section id="services" className="py-16 sm:py-24">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">Nuestros Servicios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div key={service.title} className="bg-gray-900 rounded-xl p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <service.icon className={`${service.color} w-8 h-8`} />
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
            </div>
            <p className="text-gray-400 mb-4">{service.description}</p>
            <a href="#contact" className={`${service.color} hover:opacity-75 font-medium flex items-center`}>
              Contáctanos <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
