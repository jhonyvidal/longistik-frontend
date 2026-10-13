/***************************  LONGISTIK - CASO REAL (CASO DE ÉXITO)  ***************************/

/**
 * 📌 PENDIENTE — caso real de Servicargas, cliente en producción.
 *
 * Mientras `empresa` esté vacío, la sección NO se muestra en la home (ni el enlace «Caso real» del navbar).
 * Todo lo que va aquí tiene que ser verificable: cifras de la base de datos de producción y frases
 * que el cliente haya autorizado por escrito. Si una cifra no se puede sustentar, se quita.
 *
 * Forma de los datos:
 *   empresa: 'Servicargas',
 *   ciudad: 'Ciudad, Departamento',
 *   logo: '/assets/images/clientes/servicargas.png',   // opcional, con autorización
 *   desde: 'marzo de 2025',                            // mes y año en que empezó a operar en Longistik
 *   titulo: 'Titular del resultado principal',
 *   cifras: [{ valor: '1.200', label: 'remesas al mes' }, …],   // 2 a 4 cifras
 *   antes: ['Cómo operaban antes…', …],
 *   despues: ['Qué cambió con Longistik…', …],
 *   cita: { texto: 'Frase textual del cliente', autor: 'Nombre Apellido', cargo: 'Cargo' }   // opcional
 */

export const casoExito = {
  heading: 'Un cliente real, operando todos los días',
  caption: 'No es una demo: así despacha hoy una transportadora colombiana con Longistik.',
  empresa: '',
  ciudad: '',
  logo: '',
  desde: '',
  titulo: '',
  cifras: [],
  antes: [],
  despues: [],
  cita: null
};

/** El caso tiene contenido real para mostrarse. */
export const hayCaso = Boolean(casoExito.empresa);
