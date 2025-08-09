import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
          >
            ← Volver al inicio
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-8">Política de Privacidad</h1>
        
        <div className="prose prose-gray prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Información que recopilamos</h2>
            <p className="text-gray-300 mb-4">
              En Friendstech.dev recopilamos la siguiente información:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Newsletter:</strong> Email y consentimiento explícito para recibir comunicaciones.</li>
              <li><strong>Formulario de contacto:</strong> Nombre, email, asunto y mensaje.</li>
              <li><strong>Datos técnicos:</strong> Dirección IP (hasheada por seguridad) y User-Agent para prevenir spam.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Cómo usamos tu información</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Enviar newsletter con actualizaciones sobre proyectos y contenido relevante.</li>
              <li>Responder a consultas y mensajes de contacto.</li>
              <li>Mejorar nuestros servicios y prevenir spam.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Base legal (GDPR)</h2>
            <p className="text-gray-300 mb-4">
              Procesamos tus datos bajo las siguientes bases legales:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Consentimiento:</strong> Para el envío de newsletter (Art. 6(1)(a) GDPR).</li>
              <li><strong>Interés legítimo:</strong> Para responder consultas y prevenir spam (Art. 6(1)(f) GDPR).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Tus derechos</h2>
            <p className="text-gray-300 mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Acceso:</strong> Solicitar una copia de tus datos.</li>
              <li><strong>Rectificación:</strong> Corregir datos inexactos.</li>
              <li><strong>Supresión:</strong> Solicitar el borrado de tus datos.</li>
              <li><strong>Portabilidad:</strong> Obtener tus datos en formato estructurado.</li>
              <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos.</li>
              <li><strong>Retirar consentimiento:</strong> Darte de baja de la newsletter en cualquier momento.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Darse de baja</h2>
            <p className="text-gray-300 mb-4">
              Puedes darte de baja de nuestra newsletter:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Usando el enlace de baja que incluiremos en todos los emails.</li>
              <li>Contactándonos directamente en: <a href="mailto:info@friendstech.dev" className="text-indigo-400 hover:text-indigo-300">info@friendstech.dev</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Seguridad de datos</h2>
            <p className="text-gray-300 mb-4">
              Implementamos medidas de seguridad apropiadas:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Hasheado de direcciones IP para proteger la privacidad.</li>
              <li>Almacenamiento seguro en Supabase con cifrado en tránsito y reposo.</li>
              <li>Acceso limitado solo a personal autorizado.</li>
              <li>Rate-limiting para prevenir abuso.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Retención de datos</h2>
            <p className="text-gray-300 mb-4">
              Conservamos tus datos:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Newsletter:</strong> Hasta que te des de baja o solicites la eliminación.</li>
              <li><strong>Mensajes de contacto:</strong> Por un máximo de 3 años para fines de comunicación empresarial.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Transferencias internacionales</h2>
            <p className="text-gray-300 mb-4">
              Tus datos pueden ser transferidos y procesados en países fuera del EEE. 
              Utilizamos proveedores que cumplen con las salvaguardas apropiadas bajo el GDPR.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">9. Contacto</h2>
            <p className="text-gray-300 mb-4">
              Para ejercer tus derechos o hacer consultas sobre esta política:
            </p>
            <p className="text-gray-300">
              <strong>Email:</strong> <a href="mailto:info@friendstech.dev" className="text-indigo-400 hover:text-indigo-300">info@friendstech.dev</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">10. Cambios a esta política</h2>
            <p className="text-gray-300 mb-4">
              Podemos actualizar esta política ocasionalmente. Te notificaremos de cambios significativos 
              a través de nuestra newsletter o sitio web.
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Última actualización:</strong> 9 de agosto de 2025
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
