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

  try {
    const { data, error } = await supabaseAdmin
      .from('subscribers')
      .select('email, consent, subscribed_at, confirmed_at, unsubscribed_at')
      .order('subscribed_at', { ascending: false });

    if (error) {
      console.error('Error fetching subscribers:', error);
      return new Response(error.message, { status: 500 });
    }

    const rows = data || [];
    const header = 'email,consent,subscribed_at,confirmed_at,unsubscribed_at';
    const lines = rows.map((r: any) => [
      r.email,
      r.consent ? 'true' : 'false',
      r.subscribed_at ?? '',
      r.confirmed_at ?? '',
      r.unsubscribed_at ?? '',
    ].map((v: any) => `"${String(v).replace(/"/g, '""')}"`).join(','));
    
    const content = [header, ...lines].join('\n');

    return csv(content, `subscribers_${new Date().toISOString().slice(0,10)}.csv`);
  } catch (error) {
    console.error('Error in export-subscribers:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
