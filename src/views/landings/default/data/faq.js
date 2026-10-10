// @project
import branding from '@/branding.json';
import { ctaVerde } from './botones';
import { formatoCOP, planes, volumenPlan } from './planes';

/***************************  LONGISTIK - PREGUNTAS FRECUENTES  ***************************/

const [basico, profesional, aLaMedida] = planes;

const primeraPregunta = '¿Longistik reemplaza al RNDC?';

export const faq = {
  heading: 'Preguntas frecuentes',
  caption: `Lo que más nos preguntan las empresas de transporte antes de empezar con ${branding.brandName}.`,
  defaultExpanded: primeraPregunta,
  categories: ['RNDC', 'Producto', 'Integraciones', 'Implementación', 'Soporte'],
  getInTouch: {
    heading: '¿Te quedó otra duda?',
    caption: 'Escríbenos y te respondemos con un caso parecido al tuyo.',
    link: ctaVerde('Hablar con nosotros')
  },
  faqList: [
    {
      question: primeraPregunta,
      answer:
        'No. El RNDC sigue siendo el sistema oficial del Ministerio de Transporte y reportar allí es una obligación legal. Lo que hace Longistik es que tú trabajes en una interfaz moderna y que el reporte al RNDC salga solo, con la información que ya registraste. Tú dejas de entrar al RNDC; la obligación se sigue cumpliendo.',
      category: 'RNDC'
    },
    {
      question: '¿Longistik va a funcionar con el RNDC 360?',
      answer:
        'El Ministerio de Transporte anunció que el RNDC actual será reemplazado por el RNDC 360 desde el 1 de enero de 2027. Cuando el Ministerio publique las especificaciones técnicas, adaptamos la integración de Longistik: tú sigues trabajando en el mismo sistema, con tus mismos datos, sin migrar a otro software.',
      category: 'RNDC'
    },
    {
      question: '¿Qué pasa si el RNDC se cae o rechaza un documento?',
      answer: {
        content:
          'La operación no se detiene. El registro se guarda en Longistik y queda marcado como pendiente de reporte, con el mensaje que devolvió el Ministerio traducido a lenguaje claro.',
        type: 'list',
        data: [
          { primary: 'La guía o el manifiesto quedan creados, no se pierden.' },
          { primary: 'Ves exactamente qué documentos faltan por reportar.' },
          { primary: 'Los reenvías sin volver a digitar nada.' },
          { primary: 'Queda registro de cada intento para auditoría.' }
        ]
      },
      category: 'RNDC'
    },
    {
      question: '¿Longistik ya está al día con la Resolución 20263040016075 de 2026?',
      answer:
        'Longistik ya reporta al RNDC el flete en la factura electrónica, toma los tiempos logísticos del monitoreo GPS y traduce los errores del Ministerio. Estamos construyendo las validaciones nuevas: el flete contra el costo eficiente de SICE-TAC, el indicador de la regla del 20 % de cumplidos pendientes y el contador de anulaciones del mes. Mientras tanto, puedes hacer esas cuentas gratis en nuestro simulador.',
      category: 'RNDC'
    },
    {
      question: '¿El RNDC me puede impedir expedir manifiestos?',
      answer:
        'Sí. Si los cumplidos de manifiesto pendientes con más de 5 días hábiles desde la entrega superan el 20 % de los manifiestos que expediste en los últimos 30 días, el RNDC no deja generar manifiestos nuevos hasta que te pongas al día. Y rechaza cualquier manifiesto cuyo valor a pagar quede por debajo del costo eficiente de SICE-TAC.',
      category: 'RNDC'
    },
    {
      question: '¿Necesito mi propio usuario del RNDC?',
      answer:
        'Sí. Longistik se conecta con las credenciales del web service que el Ministerio le asigna a tu empresa, y usa el NIT de tu compañía en cada reporte. Durante la implementación te acompañamos a dejar esa configuración lista.',
      category: 'RNDC'
    },
    {
      question: '¿Necesito un software para el RNDC o puedo usar el portal del Ministerio?',
      answer:
        'Puedes registrar remesas, manifiestos y cumplidos directamente en la plataforma web del RNDC, pero ahí digitas cada documento a mano y la información queda solo en el sistema del Ministerio. Un software conectado al RNDC por web services, como Longistik, reporta solo lo que ya registraste en tu operación, guarda tu historial en tu propio sistema y lo conecta con la facturación, la contabilidad y tus clientes.',
      category: 'RNDC'
    },
    {
      question: '¿Qué es Longistik?',
      answer: `Longistik es un software colombiano para empresas de transporte de carga por carretera, desarrollado por ${branding.company.name} en ${branding.company.city}, ${branding.company.state}. Genera remesas (guías), manifiestos electrónicos de carga y cumplidos, los reporta automáticamente al RNDC del Ministerio de Transporte, se integra con la facturación electrónica de la DIAN y con Siigo, World Office y Alegra, e incluye un asistente de inteligencia artificial. Se cobra por manifiestos al día, con usuarios ilimitados, desde ${formatoCOP(basico.precio)} COP al mes.`,
      category: 'Producto'
    },
    {
      question: '¿Cómo usa Longistik la inteligencia artificial?',
      answer: {
        content: 'La IA está integrada en el sistema, no es una herramienta aparte. Así la aprovechas según tu plan:',
        type: 'list',
        data: [
          { primary: 'Todos los planes: asistente de IA dentro del software que resuelve tus dudas al instante, sin esperar a un asesor.' },
          { primary: 'Plan A la medida: además, manejo de la operación con IA.' }
        ]
      },
      category: 'Producto'
    },
    {
      question: '¿Qué tipo de carga maneja?',
      answer:
        'Cualquier carga que se reporte como remesa terrestre: carga general, carga pesada, vehículos y motocicletas, paquetería. Los productos, unidades de medida y naturalezas de carga se configuran según tu operación.',
      category: 'Producto'
    },
    {
      question: '¿Puedo cargar muchas guías de una vez?',
      answer:
        'Sí. Puedes subir un archivo plano con todas las remesas del día. Longistik primero valida fila por fila y te muestra qué está bien y qué no; solo cuando confirmas se crean las guías y se reportan al RNDC. Varias filas con la misma referencia se agrupan en una sola guía con varios ítems.',
      category: 'Producto'
    },
    {
      question: '¿Se integra con mi facturación electrónica y mi contabilidad?',
      answer:
        'Sí. Longistik se integra con la DIAN y con cualquier proveedor de facturación electrónica, y con Siigo, World Office y Alegra. La remesa cumplida pasa a facturación y a contabilidad sin que nadie la vuelva a digitar.',
      category: 'Integraciones'
    },
    {
      question: '¿Mis clientes pueden radicar sus propios despachos?',
      answer: {
        content:
          'Sí. Les damos acceso a una API con la que crean y siguen sus remesas desde su propio sistema. Cada cliente entra con su usuario y solo ve la información que tú le asignaste.',
        type: 'list',
        data: [
          { primary: 'Creación, consulta y anulación de remesas.' },
          { primary: 'Consulta de todas las remesas de un cliente.' },
          { primary: 'Rastreo de cada remesa.' },
          { primary: 'Seguimiento completo, desde que se crea hasta que se factura.' }
        ]
      },
      category: 'Integraciones'
    },
    {
      question: '¿Funciona con el ERP de mis clientes?',
      answer:
        'Sí. Tenemos integraciones con SAP, Odoo y Salesforce, y la API sirve para conectar cualquier otro sistema. En la demo revisamos qué usan tus clientes y cómo quedaría la conexión.',
      category: 'Integraciones'
    },
    {
      question: '¿Cuánto tarda la implementación?',
      answer:
        'Depende del volumen de maestros (clientes, remitentes, vehículos, terceros, rutas y tarifas). Nosotros hacemos la carga inicial y acompañamos las primeras semanas de operación real hasta que tu equipo esté cómodo.',
      category: 'Implementación'
    },
    {
      question: '¿Qué pasa con la información que ya tengo?',
      answer:
        'La migramos. Los maestros se cargan al sistema y los consecutivos de guías y manifiestos se configuran para que continúen desde el último número que tienes reportado en el RNDC, sin saltos ni duplicados.',
      category: 'Implementación'
    },
    {
      question: '¿Quién da el soporte?',
      answer: `El mismo equipo que desarrolla el producto: ${branding.company.name}, desde ${branding.company.city}, ${branding.company.state}. No hay intermediarios ni tiquetes que se pierden.`,
      category: 'Soporte'
    },
    {
      question: '¿Cuánto cuesta?',
      answer: {
        content:
          'Depende de cuántos manifiestos expides al día; remesas, cumplidos y anulaciones son ilimitados. No cobramos por usuario: todo tu equipo puede entrar. Implementación, migración y soporte con asistente de IA van incluidos, sin permanencia forzada.',
        type: 'list',
        data: [
          { primary: `${basico.nombre}: ${formatoCOP(basico.precio)} COP al mes, ${volumenPlan(basico).toLowerCase()}.` },
          {
            primary: `${profesional.nombre}: ${formatoCOP(profesional.precio)} COP al mes, ${volumenPlan(profesional).toLowerCase()}, con cargue masivo, multiparada, cumplido con GPS e integraciones incluidas.`
          },
          {
            primary: `${aLaMedida.nombre}: ${volumenPlan(aLaMedida).toLowerCase()}, servidor dedicado y manejo de la operación con IA, cotizados según tu volumen.`
          }
        ]
      },
      category: 'Soporte'
    },
    {
      question: '¿Qué pasa si un día expido más de lo que cubre mi plan?',
      answer:
        'Nada se detiene: nunca bloqueamos una remesa ni un manifiesto por el plan, porque eso deja un camión parado. Si pasa con frecuencia, revisamos tu volumen contigo y te proponemos el plan que corresponde.',
      category: 'Soporte'
    },
    {
      question: '¿Cuántos usuarios puedo tener?',
      answer:
        'Los que necesites, en cualquier plan. Cada usuario entra con su propio rol y permisos. Lo que define el plan es cuántos manifiestos expides al día, no cuántas personas usan el sistema.',
      category: 'Soporte'
    }
  ]
};
