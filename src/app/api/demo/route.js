// @next
import { NextResponse } from 'next/server';

/***************************  API - SOLICITUD DE DEMO  ***************************/

/**
 * Recibe el formulario de "Agenda una demo" y lo reenvía al backend del panel de Longistik
 * (POST {DEMO_API_URL}, ver docs/demo-requests-api.md en ConfigPanel). Allá se valida, se guarda
 * el lead, se avisa al equipo y se le confirma al prospecto por correo.
 *
 * La llamada es servidor a servidor: DEMO_API_KEY nunca llega al navegador. Se reenvía la IP del
 * visitante en X-Client-IP para que el límite de solicitudes por IP del backend funcione.
 *
 * Sin DEMO_API_URL (desarrollo local) la solicitud solo queda en el log del servidor.
 */

// fetch con AbortSignal.timeout y process.env requieren el runtime de Node
export const runtime = 'nodejs';

const ERROR_REGISTRO = { error: 'No se pudo registrar la solicitud' };

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo de la solicitud no válido' }, { status: 400 });
  }

  const apiUrl = process.env.DEMO_API_URL;
  if (!apiUrl) {
    console.info('[longistik] DEMO_API_URL sin configurar; solicitud de demo solo en el log:', payload);
    return NextResponse.json({ message: 'Solicitud recibida' }, { status: 200 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || '';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.DEMO_API_KEY || '',
        ...(ip ? { 'X-Client-IP': ip } : {})
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(30000)
    });

    // 200, 400 y 429 se le pasan tal cual al formulario; cualquier otra cosa (401/503 por llave o
    // configuración, 5xx) es un problema nuestro, no del visitante.
    if ([200, 400, 429].includes(response.status)) {
      return NextResponse.json(await response.json(), { status: response.status });
    }

    console.error('[longistik] el backend de demos respondió', response.status, await response.text().catch(() => ''));
  } catch (error) {
    console.error('[longistik] no se pudo contactar el backend de demos:', error);
  }

  console.error('[longistik] solicitud de demo NO registrada (recuperar del log):', payload);
  return NextResponse.json(ERROR_REGISTRO, { status: 502 });
}
