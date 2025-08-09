export function json(data: any, init?: number | ResponseInit) {
  const respInit = typeof init === 'number' ? { status: init } : init;
  return new Response(JSON.stringify(data), { 
    ...respInit, 
    headers: { 
      'Content-Type': 'application/json', 
      ...(respInit?.headers || {}) 
    }
  });
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
