export const runtime = 'nodejs';

export async function GET() {
  return new Response(JSON.stringify({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'friendstech.dev api'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
