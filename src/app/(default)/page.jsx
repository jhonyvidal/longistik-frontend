// @next
import dynamic from 'next/dynamic';

// @project
import JsonLd from '@/components/JsonLd';
import { grafo, preguntasLd } from '@/seo';

const ScrollFab = dynamic(() => import('@/components/ScrollFab'));
const Main = dynamic(() => import('@/views/landings/default'));

/***************************  PAGE - ROOT  ***************************/

export default function HomePage() {
  return (
    <>
      {/* Las preguntas frecuentes de la home, como FAQPage para resultados enriquecidos y motores de IA */}
      <JsonLd data={grafo(preguntasLd())} />

      <Main />

      {/* scroll to top section */}
      <ScrollFab />
    </>
  );
}
