// @project
import { articuloPath, DECRETO_1017_2025_URL, PAGE_PATH, RESOLUCION_RNDC_2026_URL, RNDC_URL, SICETAC_URL } from '@/path';

/***************************  LONGISTIK - ARTÍCULOS  ***************************/

/**
 * Artículos sobre la norma del RNDC para posicionar el sitio en Google.
 *
 * Cada afirmación sale del texto de la Resolución 20263040016075 de 2026 (artículo o numeral citado
 * en `fuentes`). Antes de publicar un artículo nuevo, verificar contra la norma: aquí no se interpreta
 * ni se redondea, porque un dato errado le cuesta la confianza de un transportador.
 *
 * Forma de cada artículo:
 *   slug       → URL (/articulos/<slug>)
 *   titulo     → H1 y <title>
 *   resumen    → bajada y meta description (máx. ~160 caracteres)
 *   fecha      → ISO, se muestra como "9 de octubre de 2026"
 *   secciones  → { titulo, parrafos?: [], lista?: [], ejemplo?: '' }   (`ejemplo` se muestra rotulado)
 *   fuentes    → { label, href }
 */

const resolucion = { label: 'Resolución 20263040016075 de 2026, Ministerio de Transporte', href: RESOLUCION_RNDC_2026_URL };

const decreto1017 = {
  label: 'Decreto 1017 de 2025, Ministerio de Transporte (Gestor Normativo de Función Pública)',
  href: DECRETO_1017_2025_URL
};

const portafolioRndc360 = {
  label: 'Portafolio, 2 de octubre de 2026: «Plan Meteoro, nuevo RNDC, vía a Buenaventura y reforma a las APP»',
  href: 'https://www.portafolio.co/economia/gobierno/plan-meteoro-nuevo-rndc-via-a-buenaventura-y-reforma-a-las-app-el-paquete-que-promete-el-mintransporte-503776'
};

export const articulos = [
  {
    slug: 'rndc-360-nuevo-rndc-2027',
    titulo: 'RNDC 360: lo que se sabe del nuevo RNDC que llega en 2027',
    resumen:
      'El Ministerio de Transporte anunció que el RNDC será reemplazado por el RNDC 360 desde el 1 de enero de 2027. Qué se sabe y cómo prepararse.',
    fecha: '2026-10-10',
    lectura: '3 min',
    secciones: [
      {
        titulo: 'El anuncio',
        parrafos: [
          'La ministra de Transporte, Elsa Noguera, anunció a comienzos de octubre de 2026 que el Registro Nacional de Despachos de Carga (RNDC) será reemplazado por una nueva plataforma, el RNDC 360, que empezaría a operar el 1 de enero de 2027.',
          'El anuncio responde a las fallas del sistema actual. Según cifras de Colfecar citadas por la ministra, el RNDC acumuló 723 horas caído entre enero y el 24 de septiembre de 2026, y, según explicó la ministra, se bloqueaba cuando llegaba enero porque quienes lo operaban eran contratistas sin contrato vigente.'
        ]
      },
      {
        titulo: 'Qué traería el RNDC 360',
        parrafos: ['Según lo anunciado por el Ministerio:'],
        lista: [
          'Funcionamiento las 24 horas, los siete días de la semana.',
          'Una aplicación para celular.',
          'Un asistente de inteligencia artificial.'
        ]
      },
      {
        titulo: 'Lo que todavía no se sabe',
        parrafos: [
          'A la fecha de este artículo el Ministerio no ha publicado las especificaciones técnicas del RNDC 360: cómo se conectarán los sistemas de las transportadoras, si cambian los web services ni si habrá un periodo de transición. Tampoco hay resolución que lo reglamente. Actualizaremos este artículo cuando haya información oficial.'
        ]
      },
      {
        titulo: 'Cómo prepararse',
        parrafos: ['Mientras llegan las reglas oficiales, esto es lo que conviene hacer:'],
        lista: [
          'Tener la información de la operación (remesas, manifiestos, cumplidos, terceros y vehículos) en un sistema propio, no solo en el portal del RNDC: así el cambio de plataforma no se lleva tu historial.',
          'Evitar llegar a enero de 2027 con cumplidos atrasados o anulaciones acumuladas, por si la transición trae demoras.',
          'Trabajar con un software que se conecte al RNDC por web services y cuyo proveedor se comprometa a adaptar la integración cuando salgan las especificaciones.'
        ]
      },
      {
        titulo: 'Longistik y el RNDC 360',
        parrafos: [
          'Adaptaremos la integración de Longistik cuando el Ministerio publique las especificaciones del RNDC 360. Nuestros clientes seguirán trabajando en el mismo sistema, con sus mismos datos.'
        ]
      }
    ],
    enlaces: [{ label: 'Leer sobre la norma RNDC de 2026', href: `${PAGE_PATH.articulos}/resolucion-rndc-2026` }],
    fuentes: [portafolioRndc360]
  },
  {
    slug: 'manifiesto-electronico-de-carga',
    titulo: 'Manifiesto electrónico de carga en 2026: qué es, qué lleva y qué valida el RNDC',
    resumen:
      'Qué es el manifiesto electrónico de carga según la norma vigente, qué datos lleva, qué revisa el RNDC antes de expedirlo y por qué hoy presta mérito ejecutivo.',
    fecha: '2026-10-10',
    lectura: '6 min',
    secciones: [
      {
        titulo: 'Qué es el manifiesto electrónico de carga',
        parrafos: [
          'Es el documento que la empresa de transporte expide, de manera gratuita, a través del Registro Nacional de Despachos de Carga (RNDC), y que ampara el transporte de la mercancía ante las autoridades. Así lo define el artículo 3 de la Resolución 20263040016075 de 2026, que repite la definición del Decreto 1079 de 2015 tal como quedó tras el Decreto 1017 de 2025.',
          'Se expide para todo transporte público de carga por carretera, sea de radio de acción nacional, intermunicipal o municipal. El conductor debe portarlo, en forma física o digital, durante todo el recorrido (artículo 11 de la resolución).',
          'Una vez ejecutado el contrato de transporte, el manifiesto cumplido presta mérito ejecutivo si cumple las condiciones de claridad, carácter expreso y exigibilidad actual del artículo 422 del Código General del Proceso.'
        ]
      },
      {
        titulo: 'Qué datos lleva',
        parrafos: ['El manual de operación del RNDC (numeral 5.2.4 del Anexo 1) pide, entre otros:'],
        lista: [
          'El consecutivo interno de la empresa: único, de hasta 15 caracteres alfanuméricos. El RNDC no deja repetirlo.',
          'El tipo de manifiesto, la fecha de expedición, el origen y el destino del viaje.',
          'El titular del manifiesto (propietario, poseedor o tenedor del vehículo), la placa del vehículo y la de los remolques.',
          'El conductor, con la categoría y el vencimiento de su licencia, y un segundo conductor si lo hay.',
          'El valor a pagar: lugar y fecha de pago, retención de ICA, anticipo, saldo y la retención FOPAT del 0,1 %.',
          'Las remesas terrestres de carga que ampara el viaje.',
          'El permiso del INVÍAS cuando la carga es extrapesada o extradimensionada.',
          'El NIT de la empresa de monitoreo de flota que reportará los tiempos logísticos.'
        ]
      },
      {
        titulo: 'Lo que el RNDC revisa antes de expedirlo',
        parrafos: [
          'El manifiesto no se expide si falla alguno de estos controles del numeral 5.2.4. Por eso un dato mal digitado deja el camión parado:'
        ],
        lista: [
          'El valor a pagar debe ser igual o superior al costo eficiente de SICE-TAC.',
          'Los cumplidos de manifiesto atrasados no pueden superar el 20 % de los manifiestos de los últimos 30 días.',
          'La placa debe figurar en el RUNT con matrícula activa, servicio público y modalidad de carga, y sin omisiones en el registro inicial.',
          'El SOAT, la revisión técnico-mecánica y la licencia del conductor deben vencer después de la cita de descargue más lejana de las remesas. La revisión técnico-mecánica no se exige al vehículo con menos de 2 años de matriculado.',
          'La suma de los pesos de la mercancía, el cabezote, los remolques y los contenedores vacíos no puede superar el tope de la configuración.',
          'El anticipo no puede ser mayor al valor a pagar menos las retenciones.',
          'El saldo debe pagarse a más tardar 5 días hábiles después del recibo de la mercancía.',
          'No se pueden expedir más de 10 manifiestos para la misma placa en la misma fecha, salvo los municipales.',
          'Los manifiestos tardíos no pueden pasar del 10 % de los expedidos en los últimos 30 días sin autorización previa.',
          'La empresa debe estar al día en el traslado de la retención FOPAT.'
        ]
      },
      {
        titulo: 'Los cinco tipos de manifiesto',
        lista: [
          'General: cualquier viaje que no sea de los otros tipos.',
          'Varios viajes en el día: un mismo vehículo, una misma ruta y una sola remesa, en varios viajes el mismo día.',
          'Multiparada: paradas en municipios intermedios para cargar o descargar, con más de una remesa.',
          'Ida y regreso: origen y destino en el mismo municipio, con un municipio intermedio de retorno y mínimo dos remesas.',
          'Viaje municipal: dentro del área urbana o rural de una misma cabecera municipal.'
        ]
      },
      {
        titulo: 'Código de seguridad y formato único',
        parrafos: [
          'Cuando el RNDC acepta el manifiesto, entrega un número de radicado y un código de seguridad cifrado. Su representación gráfica va en el PDF del manifiesto, en el formato estándar del Ministerio, y las autoridades lo leen en carretera con las aplicaciones móviles del RNDC.',
          'El artículo 19 de la resolución hizo obligatorio el formato único del manifiesto y del cumplido de manifiesto dos meses después de su publicación.'
        ]
      },
      {
        titulo: 'Cómo lo expide Longistik',
        parrafos: [
          'En Longistik el manifiesto se arma con las remesas ya registradas, con consecutivo automático, y se reporta al RNDC por web service sin entrar al portal del Ministerio. Si el RNDC lo rechaza, el error aparece traducido a lenguaje claro y el manifiesto queda pendiente para reenviarlo sin volver a digitar. Soporta manifiestos multiparada sobre rutas con paradas definidas.',
          'La validación del valor a pagar contra SICE-TAC antes de enviar está en desarrollo. Mientras tanto, puedes hacer esa cuenta en el simulador.'
        ]
      }
    ],
    enlaces: [
      { label: 'Ver Longistik en una demo', href: PAGE_PATH.contactPage },
      { label: 'Comparar mi flete en el simulador', href: PAGE_PATH.simulador }
    ],
    fuentes: [resolucion, decreto1017]
  },
  {
    slug: 'software-rndc-o-portal-del-ministerio',
    titulo: '¿Software propio o la plataforma del RNDC? Cómo elegir la forma de reportar',
    resumen:
      'La norma acepta tres formas de reportar al RNDC: web service, el portal del Ministerio y las apps móviles. Cuándo basta el portal y cuándo conviene un software.',
    fecha: '2026-10-10',
    lectura: '4 min',
    secciones: [
      {
        titulo: 'Las tres formas válidas',
        parrafos: [
          'El artículo 6 de la Resolución 20263040016075 de 2026 da por válidas las operaciones registradas en el RNDC por cualquiera de estas vías:'
        ],
        lista: [
          'En línea por interoperabilidad: el software de la empresa se conecta al RNDC por web service (el manual menciona SOAP y REST).',
          'En línea en la plataforma del Ministerio: el portal web del RNDC, donde se digita cada registro.',
          'Las aplicaciones móviles del RNDC que dispone el Ministerio.'
        ]
      },
      {
        titulo: 'Cuándo basta el portal',
        parrafos: [
          'Si la empresa expide pocos manifiestos, el portal cumple la obligación y no cuesta nada. El problema aparece con el volumen: cada remesa, manifiesto y cumplido se digita a mano, la información queda en el sistema del Ministerio y no en uno propio, y todo lo demás (facturación, contabilidad, informes para el cliente) se vuelve a digitar en otro lado.'
        ]
      },
      {
        titulo: 'Cuándo conviene un software conectado al RNDC',
        lista: [
          'Cuando la misma remesa se digita dos veces: una en el sistema interno y otra en el RNDC.',
          'Cuando hay que vigilar a diario los controles del 20 % de cumplidos, fletes y facturas, que bloquean la operación si se superan.',
          'Cuando la factura electrónica con el flete se debe cargar al RNDC y conviene que salga de la remesa cumplida, no de una hoja aparte.',
          'Cuando los clientes piden rastreo o quieren crear sus despachos desde su propio sistema.',
          'Cuando se quiere conservar el historial en un sistema propio, por ejemplo ante el cambio al RNDC 360 anunciado para 2027.'
        ]
      },
      {
        titulo: 'Si el RNDC se cae',
        parrafos: [
          'El plan de contingencia del manual (numeral 9.1) distingue dos casos. Si falla el web service pero el portal funciona, hay que reportar por el portal. Si la falla es de la infraestructura del Ministerio, el viaje puede salir con el PDF del manifiesto y de las remesas sin radicado ni código QR, y todo debe reportarse al RNDC en un máximo de 48 horas después de restablecido el servicio. Si la falla es de la empresa, no aplica la contingencia.',
          'Un software útil para estos casos guarda el documento, lo marca como pendiente y lo reenvía en cuanto el RNDC responde.'
        ]
      },
      {
        titulo: 'Qué preguntarle a un proveedor',
        lista: [
          '¿Reporta por web service con el usuario de mi empresa, o tengo que seguir entrando al portal?',
          '¿Qué pasa con un documento cuando el RNDC lo rechaza o no responde?',
          '¿Muestra los errores del RNDC en lenguaje claro?',
          '¿Ya trabaja con los controles de la Resolución 20263040016075 de 2026?',
          '¿Carga la factura electrónica con el flete al RNDC?',
          '¿Cómo se adaptará al RNDC 360?'
        ]
      },
      {
        titulo: 'Longistik',
        parrafos: [
          'Longistik reporta al RNDC por web service con las credenciales de tu empresa. Si el RNDC se cae o rechaza un documento, lo guarda como pendiente, con el error traducido, para reenviarlo sin volver a digitar. También carga al RNDC la factura electrónica con el flete y se integra con la DIAN, Siigo, World Office y Alegra.'
        ]
      }
    ],
    enlaces: [
      { label: 'Ver Longistik en una demo', href: PAGE_PATH.contactPage },
      { label: 'Abrir el portal del RNDC', href: RNDC_URL }
    ],
    fuentes: [resolucion]
  },
  {
    slug: 'cumplido-de-remesa-y-cumplido-de-manifiesto',
    titulo: 'Cumplido de remesa y cumplido de manifiesto: qué son y en qué orden se registran',
    resumen:
      'Son dos registros distintos y van en un orden fijo. Qué lleva cada uno, qué valida el RNDC y qué pasa si el titular del manifiesto rechaza el valor a pagar.',
    fecha: '2026-10-10',
    lectura: '5 min',
    secciones: [
      {
        titulo: 'Dos cumplidos distintos',
        parrafos: [
          'El cumplido de remesa registra la entrega: la cantidad real entregada y la fecha y hora de entrada al cargue y al descargue. Con esos datos la empresa factura al generador de carga.',
          'El cumplido de manifiesto registra el valor a pagar definitivo al titular del vehículo, que puede cambiar frente al pactado por los tiempos logísticos reales, una variación de ruta o un viaje incompleto. Hace parte integral del manifiesto y es la base de su mérito ejecutivo.'
        ]
      },
      {
        titulo: 'El orden',
        parrafos: ['El manual de operación del RNDC (numeral 5.3 del Anexo 1) define esta secuencia al terminar el viaje:'],
        lista: [
          '1. Monitoreo del manifiesto: la empresa de monitoreo de flota reporta la llegada y la salida del vehículo en cada punto de control.',
          '2. Cumplido inicial de remesa: el RNDC lo genera solo, repartiendo esos tiempos entre las remesas del manifiesto.',
          '3. Cumplido de remesa: la empresa registra la cantidad entregada y las horas de entrada al cargue y al descargue.',
          '4. Cumplido de manifiesto: solo cuando todas las remesas del manifiesto tienen su cumplido.',
          '5. Aceptación o rechazo del titular del manifiesto.'
        ]
      },
      {
        titulo: 'Lo que valida el cumplido de remesa',
        lista: [
          'La remesa debe estar ligada a un manifiesto activo.',
          'Las horas van en estricto orden: llegada al cargue, entrada al cargue, salida del cargue, llegada al descargue, entrada al descargue y salida del descargue.',
          'Las horas se reportan en formato militar, de 00:00 a 23:59, hora legal colombiana.',
          'La cantidad entregada no puede ser menor al 10 % de la cargada ni superar el doble. Fuera de ese rango hay que autorizar el caso especial antes.',
          'Si la entrega se suspende, hay que indicar el motivo.'
        ]
      },
      {
        titulo: 'Lo que lleva el cumplido de manifiesto',
        lista: [
          'Los ajustes al valor a pagar por tiempos logísticos mayores o menores a los pactados, por variación de ruta o por viaje incompleto.',
          'La retención FOPAT del 0,1 % del valor a pagar, que se causa cuando el cumplido queda aceptado en el RNDC.',
          'Los servicios distintos a la movilización de la carga, si se pactaron, en una casilla aparte del valor a pagar. No se pueden descontar de él.'
        ],
        parrafos: [
          'Al valor a pagar solo se le pueden aplicar los descuentos que autoriza el artículo 2.2.1.7.6.7 del Decreto 1079 de 2015.'
        ]
      },
      {
        titulo: 'La aceptación del titular',
        parrafos: [
          'El titular del manifiesto, o el conductor si el titular lo autoriza, acepta o rechaza el valor a pagar en el RNDC dentro del día siguiente a la radicación del cumplido. Si no responde, el RNDC lo acepta automáticamente. Si lo rechaza, la empresa debe anular el cumplido y registrar uno nuevo con los ajustes acordados.',
          'La fecha de pago del valor a pagar no puede pasar de 5 días hábiles después del recibo de la carga, contados desde el día siguiente a la expedición del cumplido.'
        ]
      },
      {
        titulo: 'El plazo que más importa',
        parrafos: [
          'La resolución vigente controla el atraso con la regla del 20 %: si los cumplidos de manifiesto pendientes con más de 5 días hábiles desde la entrega superan el 20 % de los manifiestos de los últimos 30 días, el RNDC no deja expedir manifiestos nuevos. Las 72 horas que citan muchas guías venían de la Resolución 377 de 2013, que quedó derogada.'
        ]
      },
      {
        titulo: 'Cómo lo hace Longistik',
        parrafos: [
          'Longistik exige el orden de la norma: no deja cumplir un manifiesto mientras le falte el cumplido a alguna de sus remesas, y te dice cuáles faltan. Para el cumplido de remesa consulta en el RNDC el monitoreo del manifiesto y te propone las horas de cargue y descargue, que revisas antes de enviar.'
        ]
      }
    ],
    enlaces: [
      { label: 'Calcular mi porcentaje en el simulador', href: PAGE_PATH.simulador },
      { label: 'Leer sobre la regla del 20 %', href: articuloPath('regla-del-20-por-ciento-rndc') }
    ],
    fuentes: [resolucion, decreto1017]
  },
  {
    slug: 'remesa-terrestre-de-carga',
    titulo: 'Remesa terrestre de carga: qué es, qué datos lleva y qué valida el RNDC',
    resumen:
      'La remesa es el primer registro de cada despacho en el RNDC. Qué datos pide la norma, qué tipos hay y las validaciones que más rechazos generan.',
    fecha: '2026-10-10',
    lectura: '5 min',
    secciones: [
      {
        titulo: 'Qué es la remesa terrestre de carga',
        parrafos: [
          'Es el documento que expide la empresa de transporte según los artículos 1018 y 1019 del Código de Comercio, con los datos de la carga que entrega el remitente o generador y las condiciones del contrato de transporte. En la operación muchos la llaman «guía».',
          'Se registra en el RNDC antes del manifiesto, y el RNDC le asigna un número de radicado. Una vez asociada a un manifiesto no puede pasar a otro viaje, salvo en un trasbordo.'
        ]
      },
      {
        titulo: 'Qué datos lleva',
        parrafos: ['El artículo 8 de la Resolución 20263040016075 de 2026 y el numeral 5.2.3 de su Anexo 1 piden, entre otros:'],
        lista: [
          'El consecutivo interno de la empresa, único y de hasta 15 caracteres alfanuméricos.',
          'El nombre y la identificación del generador de carga.',
          'El nombre y la dirección de los lugares de cargue y descargue, con coordenadas cuando no hay recolección ni distribución.',
          'La naturaleza, el código y la descripción de la mercancía, y el peso o el volumen.',
          'El tiempo pactado para el cargue y para el descargue, en horas y minutos.',
          'Las citas de cargue y descargue.',
          'La unidad y la cantidad de empaque.',
          'De forma opcional, el seguro de la mercancía y la orden de compra del generador.'
        ]
      },
      {
        titulo: 'Tipos de operación',
        lista: [
          'General: la que no es contenedor ni mercancía consolidada.',
          'Mercancía consolidada: varios paquetes de uno o varios generadores, con recolección o distribución.',
          'Contenedor cargado y contenedor vacío: con el serial ISO 6346 del contenedor y su peso vacío.'
        ]
      },
      {
        titulo: 'Las validaciones que más rechazos generan',
        lista: [
          'El consecutivo no se puede repetir.',
          'El código de la mercancía sigue la Codificación Armonizada, con dos ceros adelante. Las mercancías peligrosas llevan además el código de las Naciones Unidas.',
          'Las citas van en hora militar, de 00:00 a 23:59: no se acepta 24:00.',
          'Las citas no pueden estar a más de 30 días en el futuro, y la de cargue no puede ser de hace más de 30 días sin registrar antes la excepción.',
          'Entre la cita de cargue y la de descargue no puede haber más de 6 días, salvo maquinaria extradimensionada (código 84), que admite hasta 30.',
          'En contenedor vacío la cantidad es 0; en las demás operaciones debe ser mayor a 0.',
          'La mercancía líquida o gaseosa reporta el peso en kilogramos y además la cantidad y su unidad de volumen.'
        ]
      },
      {
        titulo: 'El control del flete en la factura',
        parrafos: [
          'Antes de registrar una remesa nueva, el RNDC cuenta las remesas cumplidas hace más de 5 días hábiles (o más de los días pactados con el generador) que no tienen su flete en una factura electrónica. Si pasan del 20 % de las remesas cumplidas en los últimos 30 días, no deja crear remesas nuevas. El control no aplica a la mercancía consolidada cuyo generador es la misma empresa de transporte.'
        ]
      },
      {
        titulo: 'Cómo lo hace Longistik',
        parrafos: [
          'Longistik crea la remesa con consecutivo automático y la reporta al RNDC por web service. Para el volumen del día puedes subir un archivo: el sistema valida fila por fila y solo crea y reporta las remesas cuando confirmas. Tus clientes también pueden crear sus remesas por API desde su propio sistema.'
        ]
      }
    ],
    enlaces: [
      { label: 'Ver Longistik en una demo', href: PAGE_PATH.contactPage },
      { label: 'Leer sobre el manifiesto electrónico', href: articuloPath('manifiesto-electronico-de-carga') }
    ],
    fuentes: [resolucion]
  },
  {
    slug: 'tiempos-logisticos-rndc',
    titulo: 'Tiempos logísticos en el RNDC: qué se reporta, quién lo reporta y cuánto cuesta pasarse',
    resumen:
      'Desde el 30 de noviembre de 2025 los tiempos reales de cargue y descargue se reportan al RNDC con monitoreo de flota. Qué se mide y cómo cambia el valor a pagar.',
    fecha: '2026-10-10',
    lectura: '5 min',
    secciones: [
      {
        titulo: 'La obligación',
        parrafos: [
          'Según el artículo 18 de la Resolución 20263040016075 de 2026, las empresas de transporte de carga deben reportar al RNDC las fechas y horas reales de cargue y descargue, mediante sistemas de monitoreo de flota, desde el 30 de noviembre de 2025.',
          'Aplica a los manifiestos general, multiparada e ida y regreso, con remesas de carga general, contenedor cargado, contenedor vacío o mercancía consolidada, siempre que no haya recolección ni distribución (parágrafo del artículo 2).'
        ]
      },
      {
        titulo: 'Qué se mide',
        lista: [
          'Horas de espera para el cargue: desde que el vehículo está disponible en el lugar de cargue hasta que empieza a cargar. Si llega antes de la cita, se cuentan desde la hora de la cita.',
          'Horas de cargue: desde que empieza el cargue hasta que el vehículo sale cargado.',
          'Horas totales de cargue: la suma de las dos anteriores. Lo mismo aplica para el descargue.',
          'Horas logísticas: la suma de las horas totales de cargue y de descargue.'
        ]
      },
      {
        titulo: 'Quién lo reporta',
        parrafos: [
          'La empresa de transporte autoriza en el manifiesto a una empresa de monitoreo de flota (con su NIT). Esa empresa consulta en el RNDC los puntos de control del manifiesto y, cuando el vehículo sale de cada uno, reporta por web service la fecha y hora de llegada y de salida. Si el vehículo se demora más de lo que permite la guía de monitoreo, reporta el punto «sin salida».',
          'Con esos datos el RNDC genera solo el cumplido inicial de cada remesa. La empresa de transporte también puede enviar el registro de monitoreo, explicando por qué no lo reportó la empresa de monitoreo.'
        ]
      },
      {
        titulo: 'Cuánto cuesta pasarse de 8 horas',
        parrafos: [
          'El Decreto 1017 de 2025 (artículo 2.2.1.7.6.8 del Decreto 1079 de 2015) fija que, entre la empresa de transporte y el propietario del vehículo, las horas totales de cargue no pueden superar 8 horas desde el arribo según la cita, y lo mismo para el descargue.',
          'Hasta 8 horas se reconocen según el valor de la hora logística de SICE-TAC. Cada hora adicional obliga a la empresa a pagarle al propietario 3 salarios mínimos diarios vigentes en vehículo articulado o 2 en vehículo rígido, salvo que la demora sea imputable al propio vehículo. Lo que la empresa haya pactado con el generador de carga no cambia esa obligación con el propietario.'
        ],
        ejemplo:
          'Un tractocamión articulado llega a la cita de descargue y sale descargado 11 horas después. Las 3 horas que pasan de 8 suman 9 salarios mínimos diarios adicionales al valor a pagar. La empresa los debe aunque el retraso haya sido del destinatario; recuperarlos depende de lo que pactó con el generador.'
      },
      {
        titulo: 'Cómo llega al cumplido',
        parrafos: [
          'Los tiempos reales alimentan el cumplido de remesa y luego el de manifiesto, donde el valor a pagar se ajusta por tiempos logísticos mayores o menores a los pactados. Si el generador no carga o descarga en las horas pactadas, el flete se incrementa en lo que diga el contrato de transporte; si la demora es de la empresa, se reduce.'
        ]
      },
      {
        titulo: 'Cómo lo hace Longistik',
        parrafos: [
          'Longistik no reemplaza a la empresa de monitoreo de flota: toma lo que ella ya reportó. Al cumplir una remesa consulta en el RNDC el monitoreo del manifiesto y te propone las horas de cargue y descargue, también en manifiestos multiparada. Si los datos no son coherentes, te avisa antes de usarlos.'
        ]
      }
    ],
    enlaces: [
      { label: 'Ver Longistik en una demo', href: PAGE_PATH.contactPage },
      { label: 'Leer sobre los cumplidos', href: articuloPath('cumplido-de-remesa-y-cumplido-de-manifiesto') }
    ],
    fuentes: [resolucion, decreto1017]
  },
  {
    slug: 'decreto-1017-de-2025',
    titulo: 'Decreto 1017 de 2025: mérito ejecutivo del manifiesto, SICE-TAC y pago en 5 días hábiles',
    resumen:
      'El Decreto 1017 de 2025 cambió las reglas del transporte de carga. Lo que significa para el manifiesto, el valor a pagar, el flete y las horas de cargue.',
    fecha: '2026-10-10',
    lectura: '5 min',
    secciones: [
      {
        titulo: 'Qué es',
        parrafos: [
          'El Decreto 1017 del 21 de septiembre de 2025, del Ministerio de Transporte, modificó el capítulo del Decreto 1079 de 2015 que regula el servicio público de transporte terrestre automotor de carga. La Resolución 20263040016075 de 2026, que unificó la norma del RNDC, se expidió en buena parte para aplicarlo.'
        ]
      },
      {
        titulo: 'El manifiesto presta mérito ejecutivo',
        parrafos: [
          'El manifiesto electrónico de carga, una vez ejecutado el contrato de transporte, presta mérito ejecutivo si cumple las condiciones de claridad, carácter expreso y exigibilidad actual del artículo 422 del Código General del Proceso. El cumplido de manifiesto hace parte integral de él y debe cumplir esas mismas condiciones.',
          'Además, la expedición del manifiesto implica que la empresa reconoce que le debe al titular el saldo del valor a pagar, siempre que el cumplido deje constancia del recibo de la mercancía (numeral 11 del artículo 2.2.1.7.5.4).',
          'En la práctica, el manifiesto cumplido sirve como documento para cobrar ese saldo, así que un cumplido con datos confusos o incompletos le resta fuerza. Para un caso concreto, consulta con un abogado.'
        ]
      },
      {
        titulo: 'SICE-TAC es un piso obligatorio',
        parrafos: [
          'Las relaciones económicas entre generador, empresa de transporte y propietario del vehículo las pactan las partes, pero nunca por debajo de los costos eficientes de operación de SICE-TAC, que se consideran costos mínimos obligatorios del valor a pagar (artículo 2.2.1.7.6.2). El RNDC solo permite expedir el manifiesto si el valor a pagar registrado es, como mínimo, ese costo eficiente.'
        ]
      },
      {
        titulo: 'Plazos de pago',
        lista: [
          'Salvo pacto en contrario, el generador paga el flete a la empresa de transporte dentro de los 5 días hábiles siguientes al recibo de la mercancía (artículo 2.2.1.7.6.6).',
          'En ese mismo plazo se le pagan al propietario del vehículo los servicios adicionales y las horas de espera adicionales, sin importar si el generador ya pagó el flete. El incumplimiento genera interés a la tasa máxima legal.',
          'La fecha del valor a pagar al titular no puede pasar de 5 días hábiles después del recibo de la carga, contados desde el día siguiente a la expedición del cumplido.'
        ]
      },
      {
        titulo: 'Horas de cargue y descargue',
        parrafos: [
          'Entre la empresa y el propietario del vehículo, las horas totales de cargue y las de descargue no pueden superar 8 horas cada una desde el arribo según la cita. Cada hora adicional cuesta 3 salarios mínimos diarios en vehículo articulado y 2 en vehículo rígido (artículo 2.2.1.7.6.8).'
        ]
      },
      {
        titulo: 'Otros cambios',
        lista: [
          'Las empresas de transporte de carga operan con radio de acción nacional, incluidos los trayectos dentro del perímetro municipal, y el manifiesto se expide también para los viajes municipales.',
          'La retención FOPAT del 0,1 % sobre el valor del flete del manifiesto, que la empresa de transporte retiene y traslada cada mes.',
          'La vigilancia del servicio queda a cargo de la Superintendencia de Transporte.'
        ]
      },
      {
        titulo: 'Qué hacer',
        lista: [
          'Consultar SICE-TAC antes de pactar cada viaje.',
          'Registrar los cumplidos completos y a tiempo: son la base del cobro y del control del 20 %.',
          'Pactar por escrito con el generador las horas de cargue y descargue y el plazo de pago.',
          'Llevar el control de las horas logísticas de cada viaje para liquidar bien al propietario.'
        ]
      }
    ],
    enlaces: [
      { label: 'Comparar mi flete en el simulador', href: PAGE_PATH.simulador },
      { label: 'Leer sobre los tiempos logísticos', href: articuloPath('tiempos-logisticos-rndc') }
    ],
    fuentes: [decreto1017, resolucion]
  },
  {
    slug: 'resolucion-rndc-2026',
    titulo: 'Resolución 20263040016075 de 2026: lo que cambia en el RNDC',
    resumen:
      'La nueva resolución unifica toda la norma del RNDC. Estos son los controles que más afectan a una empresa de transporte de carga en su día a día.',
    fecha: '2026-10-09',
    lectura: '5 min',
    secciones: [
      {
        titulo: 'Una sola norma para el RNDC',
        parrafos: [
          'El Ministerio de Transporte expidió el 29 de abril de 2026 la Resolución 20263040016075, que unifica, compila y actualiza todas las reglas del Registro Nacional de Despachos de Carga (RNDC). Rige desde el día siguiente a su publicación en el Diario Oficial.',
          'Deroga siete resoluciones anteriores, entre ellas la 377 de 2013, la 20223040045515 de 2022 y la 20253040048905 de 2025, que reglamentaba los tiempos logísticos. Trae como anexo el Manual de Descripción e Instrucciones para la Operación General del RNDC, donde están las validaciones de cada proceso.'
        ]
      },
      {
        titulo: 'Los controles que más pesan en la operación',
        parrafos: ['Varios de estos controles no generan una multa después: detienen la operación en el momento. Son estos:'],
        lista: [
          'El valor a pagar del manifiesto debe ser igual o superior al costo eficiente de SICE-TAC. Si no, el RNDC no lo deja expedir.',
          'Si los cumplidos de manifiesto atrasados superan el 20 % de los manifiestos de los últimos 30 días, no se pueden expedir manifiestos nuevos.',
          'Si las remesas cumplidas sin flete en la factura electrónica superan el 20 %, no se pueden expedir remesas nuevas.',
          'Si las facturas con el flete sin aceptar por un generador superan el 20 %, no se pueden expedir remesas nuevas para ese generador.',
          'Las anulaciones de manifiestos tienen un límite mensual que depende de cuántos manifiestos expide la empresa.',
          'Los tiempos logísticos reales de cargue y descargue se reportan al RNDC a través de empresas de monitoreo de flota, y el cumplido ajusta el valor a pagar según esos tiempos.'
        ]
      },
      {
        titulo: 'El RNDC cruza tus datos con otros sistemas',
        parrafos: [
          'Según el artículo 7, el RNDC compara lo que reportas con el RUNT, el RUES, el sistema de conductores de mercancías peligrosas (SISCONMP), la información del INVÍAS sobre carga extrapesada y extradimensionada, y SICE-TAC. Un dato que no coincide con esos registros termina en rechazo.'
        ]
      },
      {
        titulo: 'Tipos de manifiesto',
        parrafos: ['El artículo 10 reconoce cinco tipos de manifiesto electrónico de carga:'],
        lista: ['Varios viajes en un día.', 'Multiparadas.', 'Ida y regreso.', 'Viaje municipal.', 'General.']
      },
      {
        titulo: 'Qué conviene hacer ya',
        lista: [
          'Consultar SICE-TAC antes de pactar el valor a pagar con el propietario del vehículo, no después del rechazo.',
          'Revisar cada semana cuántos cumplidos de manifiesto llevan más de 5 días hábiles pendientes.',
          'Llevar la cuenta de las anulaciones del mes.',
          'Cargar la factura electrónica con el flete al RNDC a tiempo y pedirle al generador que la acepte.'
        ],
        parrafos: ['Puedes hacer las tres primeras cuentas gratis en nuestro simulador.']
      }
    ],
    enlaces: [
      { label: 'Abrir el simulador', href: PAGE_PATH.simulador },
      { label: 'Leer sobre SICE-TAC', href: `${PAGE_PATH.articulos}/sice-tac-flete-minimo-manifiesto` }
    ],
    fuentes: [resolucion]
  },
  {
    slug: 'sice-tac-flete-minimo-manifiesto',
    titulo: 'SICE-TAC: por qué el RNDC rechaza un manifiesto con el flete bajo',
    resumen:
      'El RNDC solo deja expedir manifiestos con un valor a pagar igual o superior al costo eficiente de SICE-TAC. Así se consulta y así se evita el rechazo.',
    fecha: '2026-10-09',
    lectura: '4 min',
    secciones: [
      {
        titulo: 'La regla',
        parrafos: [
          'El artículo 9 de la Resolución 20263040016075 de 2026 dice que las empresas de transporte solo pueden expedir manifiestos electrónicos de carga con un valor a pagar «igual o superior a los costos eficientes de operación» que determina SICE-TAC. La regla viene del Decreto 1017 de 2025, que convirtió esos costos en un mínimo obligatorio (artículo 2.2.1.7.6.2 del Decreto 1079 de 2015).',
          'El valor a pagar es lo que la empresa le paga al propietario, poseedor o tenedor del vehículo por el viaje. Si queda por debajo del costo eficiente, el RNDC rechaza el manifiesto y el camión no sale.'
        ]
      },
      {
        titulo: 'Qué es SICE-TAC',
        parrafos: [
          'Es el Sistema de Información de Costos Eficientes para el Transporte Automotor de Carga por Carretera, del Ministerio de Transporte. Calcula el costo eficiente de un viaje según la configuración del vehículo, la naturaleza de la carga, el origen y el destino, y los tiempos de espera, cargue y descargue.',
          'La consulta es gratuita y no pide usuario ni contraseña. Se hace desde el Portal Logístico de Colombia.'
        ]
      },
      {
        titulo: 'Un ejemplo',
        ejemplo:
          'Viaje Cali–Bogotá en un tractocamión 3S3. SICE-TAC da un costo eficiente de $4.850.000. Con un valor a pagar de $5.200.000 el manifiesto pasa; con $4.850.000 también pasa, porque la norma dice «igual o superior»; con $4.500.000 el RNDC lo rechaza porque queda $350.000 por debajo. Las cifras son ilustrativas: el costo real hay que consultarlo en SICE-TAC para cada viaje.'
      },
      {
        titulo: 'El control también llega a la factura',
        parrafos: [
          'Cuando la empresa carga al RNDC la factura electrónica con el flete, el sistema revisa que el valor de cada remesa cumpla el mínimo de SICE-TAC. El generador tiene 5 días hábiles para aceptar el flete; si no lo hace, el RNDC lo acepta automáticamente siempre que cumpla esa regla, porque en ningún caso se pueden hacer pagos por debajo de los costos eficientes.'
        ]
      },
      {
        titulo: 'Cómo evitar el rechazo',
        lista: [
          'Consulta SICE-TAC antes de pactar el viaje con el propietario del vehículo, no al expedir el manifiesto.',
          'Guarda la consulta con la configuración y la ruta exactas que vas a reportar.',
          'Si en el cumplido el valor a pagar cambia por tiempos logísticos, ruta o viaje incompleto, vuelve a revisarlo contra el costo eficiente.'
        ]
      }
    ],
    enlaces: [
      { label: 'Comparar mi flete en el simulador', href: PAGE_PATH.simulador },
      { label: 'Consultar SICE-TAC en el Portal Logístico', href: SICETAC_URL }
    ],
    fuentes: [resolucion, decreto1017, { label: 'Portal Logístico de Colombia (SICE-TAC)', href: SICETAC_URL }]
  },
  {
    slug: 'regla-del-20-por-ciento-rndc',
    titulo: 'La regla del 20 %: cuándo el RNDC no te deja expedir más manifiestos',
    resumen:
      'Cumplidos atrasados, fletes sin facturar y facturas sin aceptar: tres controles del 20 % que pueden dejar a una transportadora sin poder despachar.',
    fecha: '2026-10-09',
    lectura: '5 min',
    secciones: [
      {
        titulo: 'Tres controles con el mismo límite',
        parrafos: [
          'La Resolución 20263040016075 de 2026 usa el mismo límite, el 20 %, para tres controles distintos. Los tres miran los últimos 30 días calendario y los tres bloquean: cuando se supera el límite, el RNDC no deja crear documentos nuevos hasta ponerse al día.'
        ]
      },
      {
        titulo: '1. Cumplidos de manifiesto pendientes',
        parrafos: [
          'Antes de registrar un manifiesto nuevo, el RNDC cuenta los cumplidos de manifiesto pendientes que llevan más de 5 días hábiles desde la entrega de la mercancía (la fecha de salida del descargue registrada en el cumplido de la remesa, o la cita de descargue si ese cumplido aún no existe). Si son más del 20 % de los manifiestos expedidos en los últimos 30 días, no deja generar manifiestos nuevos.',
          'Para prevenirlo, el RNDC tiene una consulta con la lista de manifiestos pendientes de cumplir, incluidos los que ya vencieron.'
        ],
        ejemplo:
          '100 manifiestos expedidos en los últimos 30 días. Con 20 cumplidos atrasados (20 %) todavía se puede despachar; con 21 (21 %) el RNDC bloquea los manifiestos nuevos hasta cumplir al menos uno.'
      },
      {
        titulo: '2. Remesas cumplidas sin flete en la factura',
        parrafos: [
          'Antes de registrar una remesa nueva, el RNDC cuenta las remesas cumplidas que llevan más de 5 días hábiles desde la entrega (o más de los días pactados con el generador para pagar el flete) sin que su flete aparezca en una factura electrónica. Si son más del 20 % de las remesas cumplidas en los últimos 30 días, no deja generar remesas nuevas.',
          'Este control no aplica a las remesas de mercancía consolidada cuyo generador de carga es la misma empresa de transporte.'
        ]
      },
      {
        titulo: '3. Facturas con el flete sin aceptar',
        parrafos: [
          'El generador de carga debe aceptar en el RNDC el flete de la factura electrónica. Si las facturas sin aceptar con más de 5 días hábiles desde su radicación superan el 20 % de las facturas radicadas en los últimos 30 días, el RNDC no deja expedir remesas nuevas para ese generador. El bloqueo es por cliente, no para toda la empresa.'
        ]
      },
      {
        titulo: 'Cómo no llegar al límite',
        lista: [
          'Cumplir cada manifiesto en cuanto el conductor descarga, no al final de la semana.',
          'Mirar el porcentaje de cumplidos atrasados todos los días, no cuando ya llegó al 20 %.',
          'Facturar el flete a tiempo y hacerle seguimiento a la aceptación del generador.'
        ]
      }
    ],
    enlaces: [
      { label: 'Calcular mi porcentaje en el simulador', href: PAGE_PATH.simulador },
      { label: 'Leer sobre el límite de anulaciones', href: `${PAGE_PATH.articulos}/limite-anulaciones-manifiestos-rndc` }
    ],
    fuentes: [resolucion]
  },
  {
    slug: 'limite-anulaciones-manifiestos-rndc',
    titulo: 'Límite de anulaciones de manifiestos en el RNDC',
    resumen:
      'El RNDC limita cuántos manifiestos puede anular una empresa cada mes: 30 %, 20 % o 10 % según su volumen. Qué pasa si te pasas.',
    fecha: '2026-10-09',
    lectura: '3 min',
    secciones: [
      {
        titulo: 'El límite depende de cuántos manifiestos expides',
        parrafos: [
          'El manual de operación del RNDC, anexo a la Resolución 20263040016075 de 2026, fija un porcentaje máximo de anulaciones según la cantidad de manifiestos que la empresa expidió en el mes calendario del manifiesto que se quiere anular:'
        ],
        lista: [
          'Entre 1 y 499 manifiestos en el mes: hasta el 30 %.',
          'Entre 500 y 2.000 manifiestos en el mes: hasta el 20 %.',
          'Más de 2.000 manifiestos en el mes: hasta el 10 %.'
        ]
      },
      {
        titulo: 'Qué pasa si se supera',
        parrafos: [
          'El RNDC no bloquea la anulación, pero la empresa debe hacer una solicitud explicando el motivo y manifestar de forma expresa, en el portal, que sabe que puede ser investigada por la Superintendencia de Transporte. El RNDC le reporta esa información a la Supertransporte.'
        ],
        ejemplo:
          'Una empresa expidió 80 manifiestos en el mes, así que su límite es el 30 %: 24 anulaciones. La anulación número 25 ya exige la manifestación expresa y queda reportada.'
      },
      {
        titulo: 'Anular para corregir',
        parrafos: [
          'Cuando un manifiesto se anula por cambio en la remesa, de tarifa, de destino por el generador, de conductor o de vehículo, el RNDC permite registrar el consecutivo del manifiesto nuevo que lo reemplaza. Esos reemplazos no cuentan para el límite de anulaciones.'
        ]
      }
    ],
    enlaces: [{ label: 'Calcular mi límite en el simulador', href: PAGE_PATH.simulador }],
    fuentes: [resolucion]
  }
];

export function buscarArticulo(slug) {
  return articulos.find((articulo) => articulo.slug === slug);
}

/** "2026-10-09" → "9 de octubre de 2026" (sin depender de la zona horaria del servidor). */
export function formatoFecha(iso) {
  const [anio, mes, dia] = iso.split('-').map(Number);
  return new Date(Date.UTC(anio, mes - 1, dia)).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
