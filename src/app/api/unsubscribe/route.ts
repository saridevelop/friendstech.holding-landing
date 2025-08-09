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

    if (error) console.warn('Error in unsubscribe:', error);
    return json({ ok: true }, 200);
  } catch (error) {
    console.warn('Error in /api/unsubscribe:', error);
    return json({ ok: true }, 200); // Siempre devolvemos ok para no filtrar emails
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email');
  
  if (!email) {
    return new Response('Email parameter required', { status: 400 });
  }

  try {
    const normalized = email.trim().toLowerCase();

    const { error } = await supabaseAdmin
      .from('subscribers')
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq('email', normalized);

    if (error) console.warn('Error in unsubscribe:', error);
    
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Baja de Newsletter</title>
          <meta charset="utf-8">
          <style>
            body { font-family: system-ui, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
            .success { color: #16a34a; background: #f0fdf4; padding: 20px; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="success">
            <h1>✅ Te has dado de baja exitosamente</h1>
            <p>Ya no recibirás más correos de nuestra newsletter.</p>
            <p><a href="/">Volver al sitio web</a></p>
          </div>
        </body>
      </html>
    `, { 
      status: 200, 
      headers: { 'Content-Type': 'text/html; charset=utf-8' } 
    });
  } catch (error) {
    console.warn('Error in GET /api/unsubscribe:', error);
    return new Response('Error procesando la baja', { status: 500 });
  }
}
