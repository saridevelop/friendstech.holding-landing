# PROMPT PARA VS CODE (CLAUDE SONNET 4)

Eres un **ingeniero senior de Next.js + Supabase**. Tengo un proyecto desplegado en Vercel: **friendstech.dev**. Quiero integrar, de la forma **más simple y gratuita**, dos cosas:

1) **Newsletter** (“Únete a nuestra comunidad privada”): guardar emails en **Supabase**.  
2) **Contacto** (“Contacta”): guardar mensajes (nombre, email, asunto, mensaje) en **Supabase**.

**Requisitos clave**:
- Usar **Supabase** (plan gratuito).  
- **Sin servicios de pago** para enviar emails. (El envío de emails es **opcional** y puede quedar preparado pero desactivado).  
- Validación con **Zod**.  
- Formularios con **honeypot** anti‑spam.  
- **Rate‑limit básico** server-side (gratis), evitando soluciones de pago.  
- Cumplimiento **GDPR** básico (consentimiento y baja).  
- **Exportación a CSV** de suscriptores con un endpoint protegido por token.  
- Código limpio, tipado, y **adaptado automáticamente** si el proyecto usa **App Router** (`app/`) o **Pages Router** (`pages/`).  
- En **Vercel**, usa **Node.js runtime** para las rutas que dependan del SDK de Supabase.

---

## 0) Inspección inicial
1. Detecta si el repo usa **App Router** o **Pages Router**.  
2. Detecta el sistema de estilos (Tailwind/CSS Modules/etc.) y nómbralo.  
3. Localiza la sección donde irán los formularios (newsletter y contacto) o, si no existe, crea componentes reutilizables `NewsletterForm` y `ContactForm` y una página simple para probarlos.

Devuélveme un resumen breve del estado actual del proyecto antes de aplicar cambios.

---

## 1) Dependencias y configuración
- Añade dependencias:
  ```bash
  npm i @supabase/supabase-js zod
  ```
- Crea `lib/supabaseAdmin.ts` (o `src/lib/...` si corresponde) para el cliente admin de Supabase:
  ```ts
  // lib/supabaseAdmin.ts
  import { createClient } from '@supabase/supabase-js';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Faltan variables de entorno de Supabase');
  }

  export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  ```
- Crea/actualiza `.env.local` con **placeholders** (no pongas valores reales):
  ```
  NEXT_PUBLIC_SUPABASE_URL=
  SUPABASE_SERVICE_ROLE_KEY=
  ADMIN_EXPORT_TOKEN=please-change-me
  APP_URL=http://localhost:3000
  ```
- Documenta que en **Vercel** se deben configurar estas mismas variables en “Project → Settings → Environment Variables”.

---

## 2) Esquema de base de datos (SQL)
Crea una migración o indícame cómo ejecutar este SQL en Supabase:

```sql
-- Suscriptores (newsletter)
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  consent boolean not null default false,
  subscribed_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz
);

-- Mensajes de contacto
create table if not exists contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now(),
  ip_hash text,         -- hash SHA-256 de IP para GDPR
  user_agent text
);

-- Índices útiles
create index if not exists idx_subscribers_email on subscribers (email);
create index if not exists idx_contact_messages_created_at on contact_messages (created_at desc);

-- Si RLS está activo (por defecto en Supabase), NO crees policies de inserción pública.
-- Usaremos la Service Role key desde el servidor, que se salta RLS.
```

Confirma que **RLS** queda ON por defecto y que no exponemos inserciones desde cliente.

---

## 3) Rutas API (Node runtime)
> Adapta **file paths** a App Router (`app/api/.../route.ts`) o Pages Router (`pages/api/...ts`) automáticamente.  
> **IMPORTANTE**: Usa `export const runtime = 'nodejs'` en App Router para evitar problemas del SDK de Supabase en Edge.

### 3.1 `/api/subscribe` (POST)
- Recibe `{ email: string, consent?: boolean }`.
- Valida con Zod (`email` válido).
- Normaliza `email` (lowercase/trim).
- Inserta o ignora duplicado en `subscribers`.
- Guarda `consent` si viene `true`.
- **Respuesta**: `{ ok: true, alreadyExists?: boolean }` o error 400.

### 3.2 `/api/unsubscribe` (POST o GET)
- Recibe `email` (o `token?` si creas un token simple basado en email).
- Marca `unsubscribed_at = now()` si existe.
- **Respuesta**: `{ ok: true }` aunque no exista (para evitar filtrado de emails).

### 3.3 `/api/contact` (POST)
- Recibe `{ name: string; email: string; subject?: string; message: string }`.
- Valida con Zod (`name` min 2, `message` min 10).
- Obtiene IP desde `x-forwarded-for`, calcula `ip_hash` con SHA‑256 (no guardes IP en claro).
- Inserta registro en `contact_messages`.
- **Respuesta**: `{ ok: true }` o error 400.

### 3.4 `/api/export-subscribers` (GET)
- Protegido por header `Authorization: Bearer ${ADMIN_EXPORT_TOKEN}`.
- Devuelve `text/csv` con columnas: `email,consent,subscribed_at,confirmed_at,unsubscribed_at`.

### 3.5 Rate-limit básico gratuito
- Implementa rate-limit simple **por IP hash** para `/api/subscribe` y `/api/contact`:
  - Sin crear tablas nuevas: usa consulta de **últimos N minutos** sobre la propia tabla.
  - Para `/api/subscribe`: deniega si el mismo `email` ha insertado >3 veces en 10 min.
  - Para `/api/contact`: deniega si el mismo `ip_hash` ha enviado >5 mensajes en 10 min.
- Mensaje de error: 429 “Demasiadas solicitudes. Inténtalo más tarde.”

**Notas**:
- No uses almacenamiento en memoria (no fiable en serverless).
- Evita dependencias de pago.

---

## 4) Componentes de UI con *honeypot*
Crea dos componentes cliente con validación y *honeypot*:

### `components/NewsletterForm.tsx`
- Campos: `email` (required), `consent` (checkbox “Acepto la política de privacidad”), campo **honeypot** oculto `company`.
- `POST /api/subscribe`.
- Mensajes de estado (éxito/error).
- Accesible (labels/aria), y con clases al estilo del proyecto.

### `components/ContactForm.tsx`
- Campos: `name`, `email`, `subject`, `message`, *honeypot* oculto `website`.
- `POST /api/contact`.
- Mensajes de estado (éxito/error).

Inserta estos componentes en las páginas adecuadas (por ejemplo: sección “Únete” y “Contacta”). Si no hay páginas, crea rutas `/unete` y `/contacto` mínimas.

---

## 5) Validación (Zod) y utilidades
Crea `lib/validation.ts`:
```ts
import { z } from 'zod';

export const subscribeSchema = z.object({
  email: z.string().email(),
  consent: z.boolean().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(10),
});
```

Crea `lib/crypto.ts`:
```ts
import crypto from 'crypto';
export function sha256(input: string) {
  return crypto.createHash('sha256').update(input).digest('hex');
}
```

Crea `lib/http.ts` para helpers de respuestas y CSV:
```ts
export function json(data: any, init?: number | ResponseInit) {
  const respInit = typeof init === 'number' ? { status: init } : init;
  return new Response(JSON.stringify(data), { ...respInit, headers: { 'Content-Type': 'application/json', ...(respInit?.headers || {}) }});
}

export function csv(content: string, filename = 'export.csv') {
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
```

---

## 6) Implementación de las rutas (plantillas)
> **Adapta** a App Router o Pages Router automáticamente. Usa `runtime = 'nodejs'` en App Router.

**/api/subscribe** (borrador de referencia):
```ts
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { subscribeSchema } from '@/lib/validation';
import { sha256 } from '@/lib/crypto';
import { json } from '@/lib/http';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, consent } = subscribeSchema.parse(body);
    const normalized = email.trim().toLowerCase();

    // Rate-limit básico por email: >3 en 10 min
    const { data: recent, error: recentErr } = await supabaseAdmin
      .from('subscribers')
      .select('id, subscribed_at')
      .eq('email', normalized)
      .gte('subscribed_at', new Date(Date.now() - 10 * 60 * 1000).toISOString());
    if (recentErr) console.warn(recentErr);
    if ((recent?.length || 0) > 3) {
      return json({ ok: false, error: 'Demasiadas solicitudes' }, 429);
    }

    // Inserta o marca duplicado
    const { data, error } = await supabaseAdmin
      .from('subscribers')
      .insert({ email: normalized, consent: Boolean(consent) })
      .select('email')
      .single();

    // Duplicado (unique constraint)
    // En Supabase, error code '23505' (Postgres unique_violation)
    if (error && (error as any).code === '23505') {
      return json({ ok: true, alreadyExists: true }, 200);
    }
    if (error) throw error;

    return json({ ok: true }, 200);
  } catch (e: any) {
    return json({ ok: false, error: e.message }, 400);
  }
}
```

**/api/unsubscribe** (básico):
```ts
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { json } from '@/lib/http';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return json({ ok: true }, 200);
    const normalized = String(email).trim().toLowerCase();

    const { error } = await supabaseAdmin
      .from('subscribers')
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq('email', normalized);

    if (error) console.warn(error);
    return json({ ok: true }, 200);
  } catch {
    return json({ ok: true }, 200);
  }
}
```

**/api/contact**:
```ts
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { contactSchema } from '@/lib/validation';
import { sha256 } from '@/lib/crypto';
import { json } from '@/lib/http';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = contactSchema.parse(body);
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
    const ipHash = sha256(ip);
    const ua = req.headers.get('user-agent') || '';

    // Rate-limit simple: >5 mensajes por IP hash en 10 min
    const { data: recent, error: recentErr } = await supabaseAdmin
      .from('contact_messages')
      .select('id, created_at, ip_hash')
      .gte('created_at', new Date(Date.now() - 10 * 60 * 1000).toISOString());
    if (recentErr) console.warn(recentErr);
    const countSameIp = (recent || []).filter(r => r.ip_hash === ipHash).length;
    if (countSameIp > 5) return json({ ok: false, error: 'Demasiadas solicitudes' }, 429);

    const { error } = await supabaseAdmin.from('contact_messages').insert({
      name, email, subject: subject ?? null, message, ip_hash: ipHash, user_agent: ua,
    });
    if (error) throw error;

    return json({ ok: true }, 200);
  } catch (e: any) {
    return json({ ok: false, error: e.message }, 400);
  }
}
```

**/api/export-subscribers**:
```ts
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { csv } from '@/lib/http';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token || token !== process.env.ADMIN_EXPORT_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('subscribers')
    .select('email, consent, subscribed_at, confirmed_at, unsubscribed_at')
    .order('subscribed_at', { ascending: false });

  if (error) return new Response(error.message, { status: 500 });

  const rows = data || [];
  const header = 'email,consent,subscribed_at,confirmed_at,unsubscribed_at';
  const lines = rows.map((r: any) => [
    r.email,
    r.consent ? 'true' : 'false',
    r.subscribed_at ?? '',
    r.confirmed_at ?? '',
    r.unsubscribed_at ?? '',
  ].map((v: any) => `"${String(v).replace(/\"/g, '"')}"`).join(','));
  const content = [header, ...lines].join('\n');

  return csv(content, `subscribers_${new Date().toISOString().slice(0,10)}.csv`);
}
```

---

## 7) UI (formularios con *honeypot*)
**NewsletterForm.tsx** (resumen):
```tsx
'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle'|'ok'|'error'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hp = (e.currentTarget as any)['company']?.value;
    if (hp) return; // honeypot
    setStatus('idle');
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, consent }),
    });
    const json = await res.json();
    setStatus(json.ok ? 'ok' : 'error');
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="sr-only" htmlFor="newsletter-email">Email</label>
      <input id="newsletter-email" required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email..."
        className="input" />
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} />
        <span>Acepto la <a href="/privacidad" className="underline">política de privacidad</a>.</span>
      </label>
      <button className="btn">Unirme</button>
      {status==='ok' && <p className="text-green-600 text-sm">¡Gracias! Te hemos registrado.</p>}
      {status==='error' && <p className="text-red-600 text-sm">No se pudo registrar. Intenta de nuevo.</p>}
    </form>
  );
}
```

**ContactForm.tsx** (resumen):
```tsx
'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState<'idle'|'ok'|'error'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hp = (e.currentTarget as any)['website']?.value;
    if (hp) return; // honeypot
    setStatus('idle');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setStatus(json.ok ? 'ok' : 'error');
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input required placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="input" />
      <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="input" />
      <input placeholder="Asunto" value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} className="input" />
      <textarea required placeholder="Mensaje" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="textarea" />
      <button className="btn">Enviar</button>
      {status==='ok' && <p className="text-green-600 text-sm">¡Mensaje enviado!</p>}
      {status==='error' && <p className="text-red-600 text-sm">No se pudo enviar. Intenta de nuevo.</p>}
    </form>
  );
}
```

---

## 8) GDPR y contenido legal
- Añade checkbox de consentimiento en **Newsletter** (ya incluido) con enlace a `/privacidad`.  
- Implementa `/api/unsubscribe` y deja previsto incluir enlace de baja en emails futuros.  
- No guardes IPs en claro; solo `ip_hash`.

---

## 9) Pruebas y verificación
- Crea una página temporal (`/sandbox` o similar) que renderice ambos formularios.  
- Prueba casos:
  - Email válido / inválido.  
  - Duplicado de email (`alreadyExists`).  
  - Honeypot (rellena `company`/`website` y verifica que el servidor ignora).  
  - Rate‑limit (múltiples envíos rápidos).  
  - Exportación CSV con `Authorization: Bearer ADMIN_EXPORT_TOKEN`.  
- Devuélveme **diffs** (unified) de todos los archivos modificados/creados y un **README corto** con pasos de despliegue en Vercel.

---

## 10) Entregables
1. Archivos creados/modificados (con rutas correctas).  
2. Instrucciones de **variables de entorno** para local y Vercel.  
3. SQL aplicado (y cómo lo apliqué).  
4. Diffs + README.  
5. Nota sobre dónde incluir los componentes en el sitio actual.

---

## 11) Opcional (dejar preparado sin costo)
- Deja comentado un stub con **Nodemailer** usando SMTP gratuito (por ejemplo, una cuenta propia) **sin ejecutarlo en deploy**, solo documentado, para futura notificación/autorespuesta.  
- Incluye un endpoint `/api/health` simple para status 200.

---

**Ahora, por favor:**
- Ejecuta los pasos, adapta a App/Pages Router según el proyecto, **no rompas el build**.  
- Muestra el **resumen de cambios + diffs** y las **instrucciones** finales.
