// @project
import { ANCHOR } from '@/path';
import { ctaDemo } from './botones';

/***************************  LONGISTIK - MÓDULOS  ***************************/

export const other = {
  heading: 'Los módulos que usa tu operación todos los días',
  description: 'Maestros, despachos y administración en un solo sistema, sin hojas de cálculo paralelas.',
  primaryBtn: { ...ctaDemo },
  sections: [
    {
      animationDelay: 0.2,
      title: 'Guías',
      subTitle: 'Remesas terrestres de carga',
      icon: 'tabler-file-text',
      link: ANCHOR.funcionalidades
    },
    {
      animationDelay: 0.3,
      title: 'Manifiestos',
      subTitle: 'Viajes, rutas y liquidación',
      icon: 'tabler-receipt',
      link: ANCHOR.funcionalidades
    },
    {
      animationDelay: 0.4,
      title: 'Cumplidos',
      subTitle: 'Cierre de cada remesa',
      icon: 'tabler-clipboard-check',
      link: ANCHOR.funcionalidades
    },
    {
      animationDelay: 0.2,
      title: 'Vehículos y terceros',
      subTitle: 'Placas, conductores y propietarios',
      icon: 'tabler-truck',
      link: ANCHOR.funcionalidades
    },
    {
      animationDelay: 0.3,
      title: 'Rutas y tarifas',
      subTitle: 'Fletes, guías y productos',
      icon: 'tabler-route',
      link: ANCHOR.funcionalidades
    },
    {
      animationDelay: 0.4,
      title: 'Informes',
      subTitle: 'Ventas, fletes y utilidad',
      icon: 'tabler-chart-bar',
      link: ANCHOR.funcionalidades
    }
  ]
};
