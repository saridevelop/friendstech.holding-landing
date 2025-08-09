import NewsletterForm from '@/components/NewsletterForm'
import Contact from '@/components/Contact'
import Link from 'next/link'

export default function SandboxPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
          >
            ← Volver al inicio
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-8 text-center">🧪 Sandbox - Pruebas de Formularios</h1>
        <p className="text-gray-400 text-center mb-12">
          Página temporal para probar los formularios de newsletter y contacto.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Newsletter Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Newsletter Form</h2>
            <NewsletterForm />
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Casos de prueba:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Email válido con consentimiento ✅</li>
                <li>• Email duplicado (debe mostrar "ya suscrito")</li>
                <li>• Email inválido</li>
                <li>• Sin consentimiento (error)</li>
                <li>• Honeypot: llenar campo "company" en DevTools</li>
                <li>• Rate limit: &gt;3 suscripciones mismo email en 10min</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Contact Form</h2>
            <Contact />
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Casos de prueba:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Formulario completo válido ✅</li>
                <li>• Nombre muy corto (&lt;2 caracteres)</li>
                <li>• Email inválido</li>
                <li>• Mensaje muy corto (&lt;10 caracteres)</li>
                <li>• Honeypot: llenar campo "website" en DevTools</li>
                <li>• Rate limit: &gt;5 mensajes misma IP en 10min</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Testing */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">🔧 Pruebas de API</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-white mb-4">Health Check</h3>
              <p className="text-gray-300 text-sm mb-4">Verificar que las APIs están funcionando:</p>
              <code className="bg-gray-900 p-2 rounded text-green-400 text-sm block">
                GET /api/health
              </code>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-white mb-4">Export Subscribers</h3>
              <p className="text-gray-300 text-sm mb-4">Solo con token de admin:</p>
              <code className="bg-gray-900 p-2 rounded text-green-400 text-sm block">
                GET /api/export-subscribers<br/>
                Authorization: Bearer ADMIN_EXPORT_TOKEN
              </code>
            </div>
          </div>
        </div>

        {/* Configuration Status */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">⚙️ Estado de Configuración</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-white mb-4">Variables de Entorno Requeridas:</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• <code className="bg-gray-900 px-2 py-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code></li>
              <li>• <code className="bg-gray-900 px-2 py-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code></li>
              <li>• <code className="bg-gray-900 px-2 py-1 rounded">ADMIN_EXPORT_TOKEN</code></li>
              <li>• <code className="bg-gray-900 px-2 py-1 rounded">APP_URL</code></li>
            </ul>
            
            <h3 className="font-semibold text-white mb-4 mt-6">Base de Datos:</h3>
            <p className="text-sm text-gray-300">
              Ejecutar <code className="bg-gray-900 px-2 py-1 rounded">supabase-migration.sql</code> en Supabase SQL Editor.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
