import dynamic from 'next/dynamic';

// @project
import JsonLd from '@/components/JsonLd';
import { SEO_CONTENT } from '@/metadata';
import { grafo, simuladorLd } from '@/seo';

const Simulador = dynamic(() => import('@/views/landings/default/simulador'));

/***************************  METADATA - SIMULADOR  ***************************/

export const metadata = { ...SEO_CONTENT.simulador };

/***************************  PAGE - SIMULADOR  ***************************/

export default function SimuladorPage() {
  return (
    <>
      {/* El simulador como herramienta gratuita, para buscadores y motores de IA */}
      <JsonLd data={grafo(simuladorLd())} />
      <Simulador />
    </>
  );
}
