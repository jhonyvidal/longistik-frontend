// @project
import { absoluteUrl, INDEXABLE } from '@/seo';

/***************************  ROBOTS.TXT  ***************************/

// Rastreadores de motores de IA que se permiten de forma explícita (además de `*`), para que
// ChatGPT, Claude, Perplexity, Gemini, Copilot, Apple Intelligence, Meta AI y otros asistentes
// puedan leer el sitio y recomendarlo. Los `-User` son las visitas que hace el asistente cuando
// alguien le pregunta en vivo; los demás alimentan sus buscadores y modelos.
const BOTS_IA = [
  // OpenAI (ChatGPT)
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic (Claude)
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google (Gemini y AI Overviews) y Microsoft (Copilot)
  'Google-Extended',
  'Googlebot',
  'Bingbot',
  // Apple, Meta, DuckDuckGo, Mistral y Amazon
  'Applebot',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'DuckAssistBot',
  'MistralAI-User',
  'Amazonbot',
  // Common Crawl: corpus abierto que usan muchos modelos
  'CCBot'
];

export default function robots() {
  // Sin dominio configurado (local o previews) no se indexa nada
  if (!INDEXABLE) return { rules: { userAgent: '*', disallow: '/' } };

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: BOTS_IA, allow: '/', disallow: '/api/' }
    ],
    sitemap: absoluteUrl('/sitemap.xml')
  };
}
