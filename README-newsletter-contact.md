# 📬 Newsletter y Contacto - Friendstech.dev

## 🚀 Implementación Completada

Se ha integrado exitosamente un sistema completo de **Newsletter** y **Contacto** con:

- ✅ **Supabase** para almacenamiento (plan gratuito)
- ✅ **Validación con Zod** 
- ✅ **Honeypot anti-spam**
- ✅ **Rate-limiting básico gratuito**
- ✅ **Cumplimiento GDPR básico**
- ✅ **Exportación CSV** protegida por token
- ✅ **App Router** (Next.js 14)
- ✅ **Tailwind CSS** integrado

## 🛠️ Configuración Requerida

### 1. Base de Datos Supabase

1. Crear proyecto en [Supabase](https://supabase.com)
2. Ir a **SQL Editor** y ejecutar el contenido de `supabase-migration.sql`
3. Obtener las credenciales:
   - **URL**: Project Settings → API → Project URL
   - **Service Role Key**: Project Settings → API → service_role key

### 2. Variables de Entorno

#### Local (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
ADMIN_EXPORT_TOKEN=token-seguro-para-exportar-csv
APP_URL=http://localhost:3000
```

#### Vercel (Production)
En **Project Settings → Environment Variables** añadir:
```
NEXT_PUBLIC_SUPABASE_URL = https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
ADMIN_EXPORT_TOKEN = token-seguro-para-exportar-csv
APP_URL = https://tu-dominio.vercel.app
```

## 📁 Archivos Creados/Modificados

### Nuevos Archivos
```
src/lib/
├── supabaseAdmin.ts      # Cliente admin de Supabase
├── validation.ts         # Esquemas Zod
├── crypto.ts            # Utilidades de hashing
└── http.ts              # Helpers HTTP/CSV

src/app/api/
├── subscribe/route.ts    # POST newsletter subscription
├── unsubscribe/route.ts  # POST/GET baja newsletter  
├── contact/route.ts      # POST mensajes contacto
├── export-subscribers/route.ts # GET export CSV (admin)
└── health/route.ts       # GET health check

src/app/
├── privacidad/page.tsx   # Página política privacidad
└── sandbox/page.tsx      # Página pruebas (temporal)

src/components/
└── NewsletterSection.tsx # Componente newsletter separado

.env.local               # Variables entorno local
supabase-migration.sql   # Script creación BD
```

### Archivos Modificados
```
src/components/
├── Blog.tsx             # Simplificado, importa NewsletterSection
├── Contact.tsx          # Integrado con API backend
└── Footer.tsx           # Revertido a estado original

package.json             # Dependencias añadidas
```

## 🧪 Pruebas

### Página de Sandbox
Visita `/sandbox` para probar ambos formularios con casos de prueba documentados.

### Casos de Prueba Newsletter
- ✅ Email válido con consentimiento
- ❌ Email duplicado (respuesta: "ya suscrito")
- ❌ Email inválido 
- ❌ Sin consentimiento
- 🕷️ Honeypot: llenar campo `company` (se ignora silenciosamente)
- ⏱️ Rate limit: >3 suscripciones mismo email en 10min

### Casos de Prueba Contacto  
- ✅ Formulario completo válido
- ❌ Nombre <2 caracteres
- ❌ Email inválido
- ❌ Mensaje <10 caracteres  
- 🕷️ Honeypot: llenar campo `website` (se ignora silenciosamente)
- ⏱️ Rate limit: >5 mensajes misma IP en 10min

### APIs Disponibles
```bash
# Health check
GET /api/health

# Newsletter subscription  
POST /api/subscribe
Body: { "email": "test@example.com", "consent": true }

# Unsubscribe
POST /api/unsubscribe  
Body: { "email": "test@example.com" }

# GET unsubscribe (para enlaces email)
GET /api/unsubscribe?email=test@example.com

# Contact form
POST /api/contact
Body: { "name": "Juan", "email": "juan@example.com", "subject": "Consulta", "message": "Hola..." }

# Export subscribers (requiere admin token)
GET /api/export-subscribers
Header: Authorization: Bearer ADMIN_EXPORT_TOKEN
```

## 🔒 Características de Seguridad

### Rate Limiting
- **Newsletter**: Max 3 suscripciones por email en 10 minutos
- **Contacto**: Max 5 mensajes por IP en 10 minutos  
- Sin almacenamiento en memoria (compatible serverless)

### Anti-Spam
- **Honeypot fields**: `company` (newsletter), `website` (contacto)
- **IP Hashing**: SHA-256 para cumplimiento GDPR
- **User-Agent logging**: Para análisis anti-spam

### GDPR Compliance
- ✅ Consentimiento explícito newsletter
- ✅ Política de privacidad completa
- ✅ Derecho al olvido (unsubscribe)
- ✅ No almacenamiento IP en claro
- ✅ Exportación de datos (admin)

## 🚀 Despliegue en Vercel

1. **Push código** a tu repositorio
2. **Configurar variables** de entorno en Vercel
3. **Verificar build** (debería pasar sin errores)
4. **Probar APIs** en producción

### Verificación Post-Despliegue
```bash
# Health check
curl https://tu-dominio.vercel.app/api/health

# Test newsletter (cambia email)
curl -X POST https://tu-dominio.vercel.app/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","consent":true}'
```

## 📊 Monitorización

### Logs Útiles
- Errors de Supabase en consola Vercel
- Rate limiting triggers
- Honeypot activations
- Export CSV downloads

### Supabase Dashboard
- **Subscribers**: Monitorizar crecimiento newsletter
- **Contact Messages**: Revisar consultas
- **API Stats**: Uso de APIs

## 🔮 Funcionalidades Preparadas (Futuro)

### Email Automation (Preparado)
```typescript
// src/lib/email.ts (no incluido, preparado para futuro)
// Integración con Nodemailer + SMTP gratuito
// Auto-respuestas y confirmaciones
// Templates HTML/texto
```

### Analytics (Preparado)
- Métricas de conversión newsletter
- Origen de suscriptores  
- Tasa de apertura (con pixel tracking)

---

## 🎯 Ubicación en el Sitio

- **Newsletter**: Componente separado `NewsletterSection.tsx` usado en `Blog.tsx`
- **Contacto**: Sección existente en homepage mejorada con backend
- **Privacidad**: Nueva página `/privacidad` enlazada desde newsletter

## ⚡ Performance

- **Runtime**: Node.js (compatible Supabase SDK)
- **Bundle**: Solo dependencias necesarias (+14 packages)
- **Edge**: APIs optimizadas para Vercel serverless
- **Caching**: Headers apropiados para CSV exports

---

**¡Implementación lista para producción!** 🎉

Para cualquier duda o mejora, contacta: info@friendstech.dev
