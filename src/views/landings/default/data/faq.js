// @project
import branding from '@/branding.json';
import { ctaVerde } from './botones';

/***************************  LONGISTIK - PREGUNTAS FRECUENTES  ***************************/

const primeraPregunta = '¿Longistik reemplaza al RNDC?';

export const faq = {
  heading: 'Preguntas frecuentes',
  caption: `Lo que más nos preguntan las empresas de transporte antes de empezar con ${branding.brandName}.`,
  defaultExpanded: primeraPregunta,
  categories: ['RNDC', 'Producto', 'Implementación', 'Soporte'],
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
      question: '¿Necesito mi propio usuario del RNDC?',
      answer:
        'Sí. Longistik se conecta con las credenciales del web service que el Ministerio le asigna a tu empresa, y usa el NIT de tu compañía en cada reporte. Durante la implementación te acompañamos a dejar esa configuración lista.',
      category: 'RNDC'
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
      question: '¿Mis clientes pueden radicar sus propios despachos?',
      answer:
        'Sí. Existe una API en la que cada cliente tuyo entra con su usuario y solo ve y crea información de las empresas que tú le asignaste. Si retiras la asignación o desactivas el usuario, el acceso se corta.',
      category: 'Producto'
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
      answer:
        'El valor depende del tamaño de tu operación y de si necesitas cargue masivo o API para tus clientes. Agenda una demo y te enviamos una propuesta concreta después de conocer cómo despachas hoy.',
      category: 'Soporte'
    }
  ]
};
