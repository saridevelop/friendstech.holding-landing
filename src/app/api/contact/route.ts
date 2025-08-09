import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { contactSchema } from '@/lib/validation';
import { sha256 } from '@/lib/crypto';
import { json } from '@/lib/http';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Honeypot check
    if (body.website) {
      return json({ ok: true }, 200);
    }
    
    // Validación con mensajes user-friendly
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((issue: any) => issue.message)
        .join(', ');
      return json({ ok: false, error: errorMessage }, 400);
    }
    
    const { name, email, subject, message } = validationResult.data;
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
    const ipHash = sha256(ip);
    const ua = req.headers.get('user-agent') || '';

    // Rate-limit simple: >5 mensajes por IP hash en 10 min
    const { data: recent, error: recentErr } = await supabaseAdmin
      .from('contact_messages')
      .select('id, created_at, ip_hash')
      .gte('created_at', new Date(Date.now() - 10 * 60 * 1000).toISOString());
    
    if (recentErr) console.warn('Error checking rate limit:', recentErr);
    const countSameIp = (recent || []).filter(r => r.ip_hash === ipHash).length;
    if (countSameIp > 5) {
      return json({ ok: false, error: 'Demasiadas solicitudes. Inténtalo más tarde.' }, 429);
    }

    const { error } = await supabaseAdmin.from('contact_messages').insert({
      name, 
      email, 
      subject: subject ?? null, 
      message, 
      ip_hash: ipHash, 
      user_agent: ua,
    });
    
    if (error) throw error;

    return json({ ok: true }, 200);
  } catch (e: any) {
    console.error('Error in /api/contact:', e);
    return json({ ok: false, error: 'Error interno del servidor. Inténtalo más tarde.' }, 500);
  }
}
