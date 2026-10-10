/***************************  REGLAS DEL RNDC - RESOLUCIÓN 20263040016075 DE 2026  ***************************/

/**
 * Cálculos del simulador (/simulador-sice-tac). Funciones puras, sin React, para poder probarlas
 * aparte y reutilizarlas. Cada una cita la parte de la norma de donde sale.
 */

/**
 * Art. 9: solo se pueden expedir manifiestos con un valor a pagar «igual o superior» al costo
 * eficiente de SICE-TAC.
 */
export function validarFlete(costoEficiente, valorAPagar) {
  const diferencia = valorAPagar - costoEficiente;
  return { pasa: diferencia >= 0, diferencia };
}

// Umbrales del indicador que propone el plan de mejora (1.2). El de la norma es solo el 20 %.
export const UMBRAL_CUMPLIDOS = { amarillo: 12, limite: 20 };

// Con menos manifiestos el porcentaje se mueve mucho con un solo cumplido atrasado.
export const MUESTRA_MINIMA = 10;

/**
 * Art. 9 y numeral del cumplido de manifiesto: los cumplidos pendientes con más de 5 días hábiles
 * desde la entrega no pueden superar el 20 % de los manifiestos expedidos en los últimos 30 días.
 */
export function evaluarCumplidos(manifiestos, pendientes) {
  const porcentaje = manifiestos > 0 ? (pendientes / manifiestos) * 100 : 0;
  // Máximo de pendientes que todavía «no supera» el 20 %
  const maximoPermitido = Math.floor((manifiestos * UMBRAL_CUMPLIDOS.limite) / 100);
  const nivel = pendientes > maximoPermitido ? 'rojo' : porcentaje >= UMBRAL_CUMPLIDOS.amarillo ? 'amarillo' : 'verde';

  return {
    porcentaje,
    nivel,
    maximoPermitido,
    margen: maximoPermitido - pendientes, // > 0: cuántos más pueden atrasarse; < 0: cuántos hay que cumplir
    muestraPequena: manifiestos < MUESTRA_MINIMA
  };
}

/**
 * Manual del RNDC, anulación de manifiestos (tabla 2): el porcentaje permitido depende de los
 * manifiestos expedidos en el mes calendario del manifiesto que se anula.
 * La tabla dice «más de 2001» y «entre 500 y 2000»; aquí todo lo que pasa de 2000 toma el 10 %.
 * Los reemplazos (motivos R, T, G, C o V) no cuentan para este límite.
 */
export function limiteAnulaciones(manifiestosDelMes) {
  const porcentaje = manifiestosDelMes > 2000 ? 10 : manifiestosDelMes >= 500 ? 20 : 30;
  const maximo = Math.floor((manifiestosDelMes * porcentaje) / 100);
  return { porcentaje, maximo };
}

export function evaluarAnulaciones(manifiestosDelMes, anulados) {
  const { porcentaje, maximo } = limiteAnulaciones(manifiestosDelMes);
  const restantes = maximo - anulados;
  // Amarillo cuando queda una quinta parte del cupo o menos
  const nivel = restantes < 0 ? 'rojo' : restantes <= Math.floor(maximo / 5) ? 'amarillo' : 'verde';
  return { porcentaje, maximo, restantes, nivel };
}

/***************************  FORMATO  ***************************/

export const formatoNumero = (valor) => new Intl.NumberFormat('es-CO').format(valor);
export const formatoPesos = (valor) => `$${formatoNumero(Math.abs(valor))}`;
export const formatoPorcentaje = (valor) => `${new Intl.NumberFormat('es-CO', { maximumFractionDigits: 1 }).format(valor)} %`;
