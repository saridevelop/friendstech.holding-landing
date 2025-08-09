-- Migración de base de datos para Friendstech.dev
-- Ejecutar en Supabase SQL Editor

-- Suscriptores (newsletter)
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  consent boolean NOT NULL DEFAULT false,
  subscribed_at timestamptz NOT NULL DEFAULT now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz
);

-- Mensajes de contacto
CREATE TABLE IF NOT EXISTS contact_messages (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  ip_hash text,         -- hash SHA-256 de IP para GDPR
  user_agent text
);

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers (email);
CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_at ON subscribers (subscribed_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_ip_hash ON contact_messages (ip_hash, created_at DESC);

-- Comentarios para documentación
COMMENT ON TABLE subscribers IS 'Suscriptores de newsletter con información de consentimiento GDPR';
COMMENT ON COLUMN subscribers.consent IS 'Consentimiento explícito para recibir emails (GDPR)';
COMMENT ON COLUMN subscribers.confirmed_at IS 'Fecha de confirmación de email (doble opt-in)';
COMMENT ON COLUMN subscribers.unsubscribed_at IS 'Fecha de baja de newsletter';

COMMENT ON TABLE contact_messages IS 'Mensajes enviados través del formulario de contacto';
COMMENT ON COLUMN contact_messages.ip_hash IS 'Hash SHA-256 de la IP para rate limiting sin almacenar IP real (GDPR)';

-- Row Level Security (RLS) está activo por defecto en Supabase
-- No creamos policies públicas de inserción - usamos Service Role key desde el servidor
-- Esto es más seguro y evita spam directo desde cliente

-- Verificar que RLS está activo
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Opcional: Policy para lectura administrativa (si necesitas acceso desde dashboard)
-- CREATE POLICY "Admin can read all subscribers" ON subscribers FOR SELECT USING (auth.role() = 'service_role');
-- CREATE POLICY "Admin can read all contact_messages" ON contact_messages FOR SELECT USING (auth.role() = 'service_role');
