/***************************  LONGISTIK - TESTIMONIOS  ***************************/

/**
 * 📌 APARTADO LIBRE — testimonios de clientes.
 *
 * Mientras `testimonials` esté vacío, la sección NO se muestra en la home.
 * Para activarla, agrega una entrada por testimonio con esta forma:
 *
 *   {
 *     title: 'Reporte al RNDC',          // tema del testimonio, se muestra como encabezado
 *     ratings: 5,                        // 1 a 5
 *     review: 'Texto textual del cliente…',
 *     profile: {
 *       avatar: '/assets/images/clientes/foto-persona.png', // opcional, puede ir vacío
 *       name: 'Nombre Apellido',
 *       role: 'Cargo — Empresa'
 *     }
 *   }
 *
 * Importante: publicar únicamente frases que el cliente haya autorizado por escrito,
 * con su nombre y cargo reales.
 */

export const testimonial = {
  heading: 'Lo que dicen quienes ya dejaron de operar en el RNDC',
  caption: 'Testimonios de las empresas de transporte que usan Longistik todos los días.',
  testimonials: []
};
