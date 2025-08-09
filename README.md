# Friendstech.dev - Landing Page

Landing page profesional para Friendstech.dev, desarrollada con Next.js 14, TypeScript y TailwindCSS.

## 🚀 Características

- **Diseño moderno y responsivo** - Optimizado para móviles, tablets y desktop
- **SEO optimizado** - Meta tags, estructura semántica y rendimiento optimizado
- **Componentes modulares** - Arquitectura escalable y mantenible
- **Animaciones suaves** - Experiencia de usuario fluida y atractiva
- **Formulario de contacto** - Listo para integrar con servicios de email
- **Newsletter subscription** - Preparado para MailerLite, ConvertKit, etc.

## 🛠️ Stack Tecnológico

- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático para mayor robustez
- **TailwindCSS** - Estilos utilitarios y diseño responsivo
- **Lucide React** - Iconos modernos y consistentes

## 📦 Instalación

1. Clona o copia el proyecto
2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 🏗️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea la build de producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css      # Estilos globales
│   ├── layout.tsx       # Layout principal con metadata SEO
│   └── page.tsx         # Página principal
├── components/
│   ├── Header.tsx       # Navegación principal
│   ├── Hero.tsx         # Sección hero con CTA
│   ├── Projects.tsx     # Portfolio de proyectos
│   ├── Services.tsx     # Servicios para empresas
│   ├── About.tsx        # Sobre nosotros
│   ├── Blog.tsx         # Blog técnico + newsletter
│   ├── Contact.tsx      # Formulario de contacto
│   └── Footer.tsx       # Footer con enlaces
└── lib/                 # Utilidades (futuro)
```

## 🎨 Personalización

### Colores y Tema

Los colores principales se definen en `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
}
```

### Contenido

Puedes modificar el contenido editando directamente los componentes:

- **Hero**: Cambia el titular y subtítulo en `src/components/Hero.tsx`
- **Proyectos**: Actualiza el array `projects` en `src/components/Projects.tsx`
- **Blog**: Modifica el array `posts` en `src/components/Blog.tsx`
- **Servicios**: Edita el array `services` en `src/components/Services.tsx`

## 🔧 Integraciones Pendientes

### Formulario de Contacto

El formulario está preparado para integrarse con servicios como:

- **Formspree**
- **Netlify Forms**
- **EmailJS**
- **Resend**

Edita la función `handleSubmit` en `src/components/Contact.tsx`.

### Newsletter

La suscripción a newsletter está lista para conectar con:

- **MailerLite**
- **ConvertKit**
- **Mailchimp**

Modifica el formulario en `src/components/Blog.tsx`.

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configuración automática detectada
3. Deploy instantáneo

### Netlify

1. Conecta tu repositorio a Netlify
2. Build command: `npm run build`
3. Publish directory: `out`

### Otros proveedores

El proyecto genera archivos estáticos con `next export`, compatible con cualquier hosting.

## 📱 Responsividad

- **Mobile-first**: Diseñado primero para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Componentes adaptables**: Navegación, grid layouts, tipografía

## ⚡ Rendimiento

- **Optimizaciones Next.js**: Image optimization, automatic code splitting
- **CSS optimizado**: PurgeCSS automático con TailwindCSS
- **Fonts**: Google Fonts con display=swap
- **Imágenes**: Formato WebP cuando sea posible

## 📊 SEO

- **Meta tags** completos en `layout.tsx`
- **Open Graph** y **Twitter Cards**
- **Schema markup** listo para implementar
- **Sitemap** automático con Next.js

## 🛡️ Seguridad

- **HTTPS**: Forzado en producción
- **Content Security Policy**: Listo para configurar
- **Validación de formularios**: Client-side y server-side

## 📞 Soporte

Para dudas o customizaciones adicionales, contacta a:

- **Email**: hola@friendstech.dev
- **Web**: [friendstech.dev](https://friendstech.dev)

---

**Desarrollado con ❤️ por Friendstech.dev**
