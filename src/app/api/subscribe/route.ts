import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { subscribeSchema } from '@/lib/validation';
import { json } from '@/lib/http';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Honeypot check
    if (body.company) {
      return json({ ok: true }, 200);
    }
    
    // Validación con mensajes user-friendly
    const validationResult = subscribeSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((issue: any) => issue.message)
        .join(', ');
      return json({ ok: false, error: errorMessage }, 400);
    }
    
    const { email, consent } = validationResult.data;
    const normalized = email.trim().toLowerCase();

    // Rate-limit básico por email: >3 en 10 min
    const { data: recent, error: recentErr } = await supabaseAdmin
      .from('subscribers')
      .select('id, subscribed_at')
      .eq('email', normalized)
      .gte('subscribed_at', new Date(Date.now() - 10 * 60 * 1000).toISOString());
    
    if (recentErr) console.warn(recentErr);
    if ((recent?.length || 0) > 3) {
      return json({ ok: false, error: 'Demasiadas solicitudes. Inténtalo más tarde.' }, 429);
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
    console.error('Error in /api/subscribe:', e);
    return json({ ok: false, error: 'Error interno del servidor. Inténtalo más tarde.' }, 500);
  }
}
