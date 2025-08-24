'use client'

import { Code, Smartphone, Palette, Lightbulb, ArrowRight } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Code,
      title: 'Micro-SaaS Development',
      description: 'Desarrollamos micro-SaaS serverless con JavaScript, Claude y OpenAI para soluciones específicas que resuelven problemas reales.',
      color: 'text-indigo-400'
    },
    {
      icon: Smartphone,
      title: 'Automatizaciones con IA',
      description: 'Creamos workflows automatizados que integran IA para optimizar procesos empresariales y reducir trabajo manual.',
      color: 'text-purple-400'
    },
    {
      icon: Palette,
      title: 'Validación Temprana',
      description: 'Validamos ideas hablando directamente con clientes antes de escribir código, reduciendo riesgos de desarrollo.',
      color: 'text-green-400'
    },
    {
      icon: Lightbulb,
      title: 'Consultoría Técnica',
      description: 'Ayudamos a definir arquitecturas serverless, integraciones con APIs de IA y estrategias de desarrollo ágil.',
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
