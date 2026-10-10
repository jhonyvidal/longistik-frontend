// @project
import { llmsTxt } from '@/seo';

/***************************  LLMS.TXT  ***************************/

// Resumen del sitio en Markdown para motores de IA (https://llmstxt.org). Se genera en el build.
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsTxt(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
