// @project
import { llmsFullTxt } from '@/seo';

/***************************  LLMS-FULL.TXT  ***************************/

// Resumen del sitio más el texto completo de los artículos, para motores de IA. Se genera en el build.
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsFullTxt(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
