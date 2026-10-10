import PropTypes from 'prop-types';

/***************************  SEO - DATOS ESTRUCTURADOS  ***************************/

/**
 * Inserta un bloque JSON-LD (schema.org). Componente de servidor: el bloque viaja en el HTML
 * inicial, que es lo que leen Google y los rastreadores de IA.
 * Se escapa `<` para que ningún texto pueda cerrar la etiqueta <script>.
 */
export default function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }} />;
}

JsonLd.propTypes = { data: PropTypes.object };
