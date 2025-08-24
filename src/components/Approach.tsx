'use client'

import { MessageSquare, Code2, Zap, Target } from 'lucide-react'

export default function Approach() {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Conversaciones Reales',
      description: 'Hablamos directamente con clientes potenciales para identificar problemas específicos antes de desarrollar.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Target,
      title: 'Validación Temprana',
      description: 'Creamos prototipos mínimos viables en 3-5 días para validar la solución sin riesgo de desarrollo.',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Code2,
      title: 'Desarrollo Serverless',
      description: 'Construimos micro-SaaS con JavaScript, Next.js y arquitecturas serverless para máxima eficiencia.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Zap,
      title: 'Automatización IA',
      description: 'Integramos Claude y OpenAI para crear soluciones que automatizan procesos complejos de manera inteligente.',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    }
  ]

  return (
    <section id="approach" className="py-16 sm:py-24 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Nuestro Enfoque Problem-First
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A diferencia del desarrollo tradicional, comenzamos con conversaciones reales para entender problemas específicos. 
            Solo desarrollamos cuando alguien confirma que pagaría por la solución.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Step number */}
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {step.description}
              </p>

              {/* Connection line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-indigo-600 to-transparent transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl p-8 border border-indigo-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Resultado: Cero Riesgo, Máximo Valor
            </h3>
            <p className="text-gray-300 text-lg">
              <strong className="text-indigo-400">Ninguna línea de código</strong> se escribe hasta confirmar que hay demanda real. 
              Esto elimina el mayor riesgo en desarrollo de productos: <strong className="text-purple-400">construir algo que nadie quiere</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}