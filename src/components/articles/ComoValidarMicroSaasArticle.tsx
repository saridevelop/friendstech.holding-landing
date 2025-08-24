'use client'

import { useReadingMode } from '@/contexts/ReadingModeContext'
import ReadingModeToggle from './ReadingModeToggle'

export default function ComoValidarMicroSaasArticle() {
  const { theme } = useReadingMode()

  const themeClasses = theme === 'dark' 
    ? 'bg-gray-900 text-gray-100' 
    : 'bg-white text-gray-900'

  const headingClasses = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const subheadingClasses = theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
  const textClasses = theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
  const mutedClasses = theme === 'dark' ? 'text-gray-400' : 'text-gray-600'

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses}`}>
      <ReadingModeToggle />
      <article className={`max-w-4xl mx-auto px-8 py-16 text-lg leading-relaxed`}>
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${headingClasses}`}>
            Cómo Validar Ideas de Micro-SaaS Hablando Directamente con el Cliente
          </h1>
          <h2 className={`text-xl md:text-2xl font-medium mb-8 ${subheadingClasses}`}>
            (Antes de Escribir Una Línea de Código)
          </h2>
          <div className={`flex justify-center items-center gap-6 mb-6 ${mutedClasses}`}>
            <time>23 de Agosto, 2025</time>
            <span>•</span>
            <span>Tiempo de lectura: 8 minutos</span>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            {['micro-saas', 'validación', 'startup'].map((tag) => (
              <span
                key={tag}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  theme === 'dark' 
                    ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-800/50' 
                    : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-none space-y-12">
          <div className={`text-xl md:text-2xl leading-relaxed mb-12 p-8 rounded-2xl border-l-4 ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-indigo-400 text-gray-200' 
              : 'bg-gray-50 border-indigo-500 text-gray-800'
          }`}>
            <p className="font-medium">
              La mayoría de desarrolladores cometen el mismo error: construyen la solución primero y buscan clientes después. Nosotros decidimos hacer exactamente lo opuesto: hablar con negocios reales, escuchar sus problemas específicos, y solo desarrollar cuando alguien está dispuesto a pagar por la solución.
            </p>
          </div>

          <p className={`text-lg leading-relaxed mb-8 ${textClasses}`}>
            Este enfoque problem-first, combinado con desarrollo de workflows customizados usando JavaScript serverless y APIs de IA, nos permite crear soluciones exactamente adaptadas a problemas específicos sin asumir riesgo de desarrollo.
          </p>

          <section className="space-y-8">
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 mt-16 ${headingClasses}`}>
              Por Qué Escuchar Antes de Desarrollar
            </h2>

            <p className={`text-lg leading-relaxed mb-6 ${textClasses}`}>
              Después de analizar cientos de fracasos de startups, el patrón es claro: el 70% falla porque construye productos que nadie quiere. Como desarrolladores, tendemos a enamorarnos de soluciones técnicas elegantes sin validar si alguien pagaría por resolverlas.
            </p>

            <div className={`p-6 rounded-xl mb-6 ${
              theme === 'dark' 
                ? 'bg-yellow-900/20 border border-yellow-600/30' 
                : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <p className={`text-lg font-semibold ${textClasses}`}>
                Nuestro approach es simple pero contrarian: <strong className={headingClasses}>ninguna línea de código se escribe hasta que alguien confirma que pagaría por la solución</strong>.
              </p>
            </div>

            <p className={`text-lg leading-relaxed mb-8 ${textClasses}`}>
              Esta metodología elimina el riesgo más grande en desarrollo de productos: invertir semanas en algo que nadie necesita realmente.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 mt-16 ${headingClasses}`}>
              Nuestro Stack Técnico: Workflows Customizados, No Plantillas
            </h2>

            <p className={`text-lg leading-relaxed mb-8 ${textClasses}`}>
              A diferencia de consultores que implementan herramientas existentes o desarrolladores que crean aplicaciones genéricas, nuestro approach se basa en <strong className={headingClasses}>customizaciones de workflow completamente adaptadas</strong> al problema específico del cliente.
            </p>

            <h3 className={`text-2xl font-semibold mb-6 ${subheadingClasses}`}>Ventajas de nuestro stack:</h3>

            <ul className="space-y-4 mb-8">
              {[
                { title: "Integración directa", desc: "Trabajamos con los Excel y APIs que ya usan, sin migrar datos" },
                { title: "Microfrontales específicos", desc: "Interfaces diseñadas exactamente para su proceso, no genéricas" },
                { title: "Serverless escalable", desc: "Costos operativos mínimos, escalamiento automático" },
                { title: "IA integrada", desc: "Claude y OpenAI procesando exactamente sus datos y contexto" },
                { title: "Deploy flexible", desc: "Vercel para simplicidad, VMs dedicadas para casos complejos" }
              ].map((item, index) => (
                <li key={index} className={`flex items-start gap-3 text-lg ${textClasses}`}>
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-3 flex-shrink-0"></span>
                  <span><strong className={headingClasses}>{item.title}</strong>: {item.desc}</span>
                </li>
              ))}
            </ul>

            <div className={`p-6 rounded-xl mb-8 ${
              theme === 'dark' 
                ? 'bg-green-900/20 border border-green-600/30' 
                : 'bg-green-50 border border-green-200'
            }`}>
              <p className={`text-lg font-medium ${textClasses}`}>
                Esta arquitectura nos permite <strong className={headingClasses}>crear soluciones que parecen desarrolladas internamente</strong> por su equipo, pero con la potencia de IA y serverless moderno.
              </p>
            </div>
          </section>

          <section className="space-y-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-12 mt-16 ${headingClasses}`}>
              El Framework de Validación Temprana
            </h2>

            <div className={`p-8 rounded-2xl mb-12 ${
              theme === 'dark' 
                ? 'bg-gray-800/30 border border-gray-700/50' 
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${headingClasses}`}>
                Paso 1: Conversaciones de Descubrimiento
              </h3>
              
              <p className={`text-lg mb-6 ${textClasses}`}>
                <strong className={`${headingClasses} text-xl`}>Objetivo:</strong> Identificar problemas reales, no validar ideas preconcebidas.
              </p>

              <p className={`text-lg leading-relaxed mb-8 ${textClasses}`}>
                Comenzamos con conversaciones informales con dueños de negocios, gerentes operativos, y profesionales que conocemos. La clave está en preguntar sobre sus frustraciones diarias, no sobre tecnología.
              </p>

              <h4 className={`text-xl font-semibold mb-4 ${subheadingClasses}`}>Preguntas que funcionan:</h4>
              <ul className="space-y-3 mb-8">
                {[
                  "¿Cuál es la tarea más repetitiva que hace cada día?",
                  "¿Qué proceso le consume más tiempo del que debería?",
                  "¿Qué información necesita que siempre es difícil de obtener?",
                  "¿Qué le quita el sueño sobre su operación?"
                ].map((question, index) => (
                  <li key={index} className={`flex items-start gap-3 text-lg ${textClasses}`}>
                    <span className="text-green-500 font-bold text-2xl">&ldquo;</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-red-900/20 border border-red-500/30' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                    🚩 Red flag
                  </p>
                  <p className={textClasses}>Si tienen que pensar mucho para responder, probablemente no es un problema urgente.</p>
                </div>

                <div className={`p-4 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-green-900/20 border border-green-500/30' 
                    : 'bg-green-50 border border-green-200'
                }`}>
                  <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                    ✅ Green flag
                  </p>
                  <p className={textClasses}>Cuando responden inmediatamente y se emocionan explicando el problema.</p>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-2xl mb-12 ${
              theme === 'dark' 
                ? 'bg-gray-800/30 border border-gray-700/50' 
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${headingClasses}`}>
                Paso 2: Validación de Urgencia
              </h3>
              
              <p className={`text-lg mb-6 ${textClasses}`}>
                <strong className={`${headingClasses} text-xl`}>Objetivo:</strong> Confirmar que el problema vale la pena resolver.
              </p>

              <p className={`text-lg leading-relaxed mb-8 ${textClasses}`}>
                Una vez identificado un problema, preguntamos directamente: &ldquo;Si existiera una herramienta que resolviera esto por $X mensuales, ¿la usaría?&rdquo;
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                    Señales de urgencia real:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Calculan inmediatamente cuánto les costaría el problema",
                      "Preguntan cuándo estaría disponible",
                      "Mencionan soluciones parciales que ya intentaron",
                      "Ofrecen pagar por adelantado para tener prioridad"
                    ].map((item, index) => (
                      <li key={index} className={`flex items-start gap-3 ${textClasses}`}>
                        <span className="text-green-500 text-lg">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                    Señales de falsa urgencia:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Respuestas como "tal vez" o "tendríamos que evaluarlo"',
                      "Piden características complejas inmediatamente",
                      "No pueden cuantificar el impacto del problema"
                    ].map((item, index) => (
                      <li key={index} className={`flex items-start gap-3 ${textClasses}`}>
                        <span className="text-red-500 text-lg">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-2xl mb-12 ${
              theme === 'dark' 
                ? 'bg-gray-800/30 border border-gray-700/50' 
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${headingClasses}`}>
                Paso 3: Prototipo Mínimo Viable (PMV)
              </h3>
              
              <p className={`text-lg mb-6 ${textClasses}`}>
                <strong className={`${headingClasses} text-xl`}>Objetivo:</strong> Validar la solución con el mínimo esfuerzo posible.
              </p>

              <p className={`text-lg leading-relaxed mb-8 ${textClasses}`}>
                En lugar de desarrollar aplicaciones completas, creamos prototipos funcionales en 3-5 días usando nuestro stack técnico optimizado para desarrollo rápido.
              </p>

              <h4 className={`text-xl font-semibold mb-6 ${subheadingClasses}`}>Nuestro stack para PMVs rápidos:</h4>
              <ul className="space-y-4 mb-8">
                {[
                  { tech: "Frontend", desc: "Microfrontales en JavaScript vanilla o React, deployados en Vercel" },
                  { tech: "Backend", desc: "Funciones serverless en Supabase o Vercel para lógica específica" },
                  { tech: "Datos", desc: "Procesamiento directo de Excel del cliente o integración con sus APIs existentes" },
                  { tech: "IA", desc: "APIs de Claude y OpenAI para procesamiento inteligente de datos" },
                  { tech: "Base de datos", desc: "Supabase para persistencia rápida y Firebase cuando necesitamos real-time" }
                ].map((item, index) => (
                  <li key={index} className={`flex items-start gap-3 text-lg ${textClasses}`}>
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></span>
                    <span><strong className={headingClasses}>{item.tech}</strong>: {item.desc}</span>
                  </li>
                ))}
              </ul>

              <div className={`p-6 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-blue-900/20 border border-blue-600/30' 
                  : 'bg-blue-50 border border-blue-200'
              }`}>
                <p className={`text-lg font-semibold ${textClasses}`}>
                  <strong className={headingClasses}>Criterio de éxito:</strong> El cliente usa el prototipo inmediatamente y pide mejoras específicas.
                </p>
              </div>
            </div>

            <div className={`p-8 rounded-2xl mb-12 ${
              theme === 'dark' 
                ? 'bg-gray-800/30 border border-gray-700/50' 
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${headingClasses}`}>
                Paso 4: Validación de Pago
              </h3>
              
              <p className={`text-lg mb-6 ${textClasses}`}>
                <strong className={`${headingClasses} text-xl`}>Objetivo:</strong> Confirmar disposición real a pagar antes de invertir en desarrollo.
              </p>

              <p className={`text-lg leading-relaxed mb-8 ${textClasses}`}>
                Presentamos el prototipo funcional y proponemos una estructura de desarrollo financiada:
              </p>

              <blockquote className={`border-l-4 border-indigo-500 pl-6 py-4 mb-8 italic text-lg ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
              } rounded-r-lg`}>
                <p className={textClasses}>
                  &ldquo;<strong className={headingClasses}>Propuesta de Desarrollo Colaborativo</strong>: Usted financia el desarrollo completo de la solución personalizada para su negocio. A cambio, obtiene la herramienta funcionando perfectamente para sus necesidades, soporte prioritario, y un precio preferencial permanente. Nosotros retenemos derechos para ofrecer versiones adaptadas a otros negocios.&rdquo;
                </p>
              </blockquote>

              <h4 className={`text-xl font-semibold mb-6 ${subheadingClasses}`}>Estructura win-win que proponemos:</h4>
              <ul className="space-y-3">
                {[
                  "Cliente paga 100% del desarrollo inicial",
                  "Obtiene solución completamente personalizada",
                  "Precio mensual preferencial (30-50% descuento) de por vida",
                  "Soporte técnico prioritario",
                  "Exclusividad sectorial en su área geográfica (opcional)"
                ].map((item, index) => (
                  <li key={index} className={`flex items-start gap-3 text-lg ${textClasses}`}>
                    <span className="text-green-500 text-lg">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className={`text-3xl md:text-4xl font-bold mb-12 mt-16 ${headingClasses}`}>
              Su Próximo Paso Ejecutable
            </h2>

            <ol className="space-y-6">
              {[
                { step: "Identifique 10 personas", desc: "que conozca con negocios o trabajen en operaciones empresariales" },
                { step: "Programe conversaciones informales", desc: "de 15-20 minutos para &ldquo;entender mejor su industria&rdquo;" },
                { step: "Escuche activamente", desc: "problemas operativos, no venda soluciones" },
                { step: "Documente patrones", desc: "de problemas que aparecen repetidamente" },
                { step: "Valide una oportunidad", desc: "creando un prototipo de 3-5 días" }
              ].map((item, index) => (
                <li key={index} className={`flex gap-6 text-lg ${textClasses}`}>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <strong className={headingClasses}>{item.step}</strong> {item.desc}
                  </div>
                </li>
              ))}
            </ol>

            <div className={`p-6 rounded-xl mt-8 ${
              theme === 'dark' 
                ? 'bg-indigo-900/20 border border-indigo-500/30' 
                : 'bg-indigo-50 border border-indigo-200'
            }`}>
              <p className={`text-lg font-semibold ${textClasses}`}>
                <strong className={headingClasses}>Criterio de éxito inicial:</strong> Encontrar una persona que, después de ver su prototipo, pregunte inmediatamente cuánto costaría y cuándo estaría listo.
              </p>
            </div>

            <p className={`text-xl leading-relaxed text-center py-8 ${textClasses}`}>
              El mercado está en las conversaciones que no estamos teniendo. Cada problema real que alguien enfrenta es una oportunidad potencial de micro-SaaS.
            </p>
          </section>

          <hr className={`my-16 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} />

          <div className="text-center">
            <p className={`text-lg italic ${mutedClasses}`}>
              ¿Quiere profundizar en técnicas específicas de conversaciones de descubrimiento o estructuras legales para contratos de desarrollo colaborativo? Síguenos para metodologías prácticas de validación temprana.
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}