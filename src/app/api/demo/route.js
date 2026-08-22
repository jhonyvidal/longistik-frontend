// @next
import { NextResponse } from 'next/server';

/***************************  API - SOLICITUD DE DEMO  ***************************/

/**
 * Recibe el formulario de "Agenda una demo".
 *
 * Hoy hace dos cosas:
 *  1. Deja la solicitud en los logs del servidor (siempre).
 *  2. Si existe la variable de entorno DEMO_WEBHOOK_URL, reenvía la solicitud a esa URL.
 *     Sirve para conectar el formulario con un correo, una hoja de cálculo o un CRM
 *     (Zapier, Make, n8n o un endpoint propio) sin agregar dependencias al proyecto.
 *
 * ⚠️ Mientras DEMO_WEBHOOK_URL no esté configurada, las solicitudes solo quedan en el log:
 * hay que definir a dónde deben llegar los leads antes de publicar el sitio.
 */

const REQUIRED_FIELDS = ['name', 'company', 'email', 'phone'];

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo de la solicitud no válido' }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !String(payload?.[field] || '').trim());
  if (missing.length) {
    return NextResponse.json({ error: `Faltan campos obligatorios: ${missing.join(', ')}` }, { status: 400 });
  }

  const lead = {
    nombre: String(payload.name).trim(),
    empresa: String(payload.company).trim(),
    correo: String(payload.email).trim(),
    telefono: String(payload.phone).trim(),
    flota: String(payload.fleet || '').trim(),
    mensaje: String(payload.message || '').trim(),
    recibidoEn: new Date().toISOString()
  };

  console.info('[longistik] nueva solicitud de demo:', lead);

  const webhook = process.env.DEMO_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });

      if (!response.ok) throw new Error(`El webhook respondió ${response.status}`);
    } catch (error) {
      console.error('[longistik] no se pudo reenviar la solicitud de demo:', error);
      return NextResponse.json({ error: 'No se pudo registrar la solicitud' }, { status: 502 });
    }
  }

  return NextResponse.json({ message: 'Solicitud recibida' }, { status: 200 });
}
