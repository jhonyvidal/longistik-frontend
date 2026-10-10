'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'motion/react';

// @project
import { Cta5 } from '@/blocks/cta';
import { SmallHero3 } from '@/blocks/small-hero';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import { articuloPath, SICETAC_URL } from '@/path';
import { SECTION_COMMON_PY } from '@/utils/constant';
import {
  evaluarAnulaciones,
  evaluarCumplidos,
  formatoNumero,
  formatoPesos,
  formatoPorcentaje,
  MUESTRA_MINIMA,
  validarFlete
} from '@/utils/normaRndc';

// @data
import { cta5, smallHeroSimulador } from './data';

const SEVERIDAD = { verde: 'success', amarillo: 'warning', rojo: 'error' };
const externo = { target: '_blank', rel: 'noopener noreferrer' };

/***************************  CAMPO NUMÉRICO  ***************************/

/**
 * Campo de texto que solo acepta dígitos y los muestra con separador de miles colombiano.
 * El estado guarda el número (o null si está vacío).
 */
function CampoNumero({ id, label, ayuda, valor, onChange, pesos }) {
  return (
    <Stack sx={{ gap: 0.75 }}>
      <Typography component="label" htmlFor={id} variant="subtitle1" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
      <OutlinedInput
        id={id}
        value={valor === null ? '' : formatoNumero(valor)}
        onChange={(e) => {
          const digitos = e.target.value.replace(/\D/g, '').slice(0, 12);
          onChange(digitos ? Number(digitos) : null);
        }}
        inputMode="numeric"
        placeholder="0"
        fullWidth
        sx={{ bgcolor: 'background.default' }}
        {...(pesos && { startAdornment: <InputAdornment position="start">$</InputAdornment> })}
      />
      {ayuda && (
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {ayuda}
        </Typography>
      )}
    </Stack>
  );
}

CampoNumero.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  ayuda: PropTypes.any,
  valor: PropTypes.number,
  onChange: PropTypes.func,
  pesos: PropTypes.bool
};

/***************************  RESULTADO  ***************************/

function Resultado({ severidad = 'info', titulo, children }) {
  return (
    <Alert severity={severidad} variant="outlined" sx={{ borderRadius: 4, bgcolor: 'background.default' }} role="status">
      {titulo && <AlertTitle sx={{ fontWeight: 600 }}>{titulo}</AlertTitle>}
      {children}
    </Alert>
  );
}

Resultado.propTypes = { severidad: PropTypes.string, titulo: PropTypes.string, children: PropTypes.any };

const Vacio = ({ children }) => <Resultado titulo="Escribe los datos para ver el resultado">{children}</Resultado>;

Vacio.propTypes = { children: PropTypes.any };

/***************************  CALCULADORA - FLETE VS SICE-TAC  ***************************/

function CalculadoraFlete() {
  const [costo, setCosto] = useState(null);
  const [valor, setValor] = useState(null);

  let resultado = <Vacio>Compara el valor a pagar del manifiesto con el costo eficiente que te da SICE-TAC para ese viaje.</Vacio>;

  if (costo && valor !== null) {
    const { pasa, diferencia } = validarFlete(costo, valor);
    resultado = pasa ? (
      <Resultado severidad="success" titulo="El manifiesto pasa el control de SICE-TAC">
        {diferencia === 0
          ? 'El valor a pagar es igual al costo eficiente. La norma admite «igual o superior», así que el RNDC lo acepta.'
          : `El valor a pagar queda ${formatoPesos(diferencia)} por encima del costo eficiente.`}
      </Resultado>
    ) : (
      <Resultado severidad="error" titulo="El RNDC rechazará este manifiesto">
        El valor a pagar está {formatoPesos(diferencia)} por debajo del costo eficiente. Para expedirlo debe ser de al menos{' '}
        {formatoPesos(costo)}.
      </Resultado>
    );
  }

  return (
    <Calculadora
      campos={
        <>
          <CampoNumero
            id="costo-eficiente"
            label="Costo eficiente según SICE-TAC"
            valor={costo}
            onChange={setCosto}
            pesos
            ayuda={
              <>
                Consúltalo gratis y sin usuario en el{' '}
                <Link href={SICETAC_URL} {...externo} underline="always">
                  Portal Logístico de Colombia
                </Link>{' '}
                con la configuración del vehículo, la carga y la ruta del viaje.
              </>
            }
          />
          <CampoNumero
            id="valor-a-pagar"
            label="Valor a pagar del manifiesto"
            valor={valor}
            onChange={setValor}
            pesos
            ayuda="Lo que le pagas al propietario, poseedor o tenedor del vehículo por el viaje."
          />
        </>
      }
      resultado={resultado}
      articulo="sice-tac-flete-minimo-manifiesto"
    />
  );
}

/***************************  CALCULADORA - REGLA DEL 20 %  ***************************/

function CalculadoraCumplidos() {
  const [manifiestos, setManifiestos] = useState(null);
  const [pendientes, setPendientes] = useState(null);

  let resultado = <Vacio>Calcula qué tan cerca estás del 20 % que te impide expedir manifiestos nuevos.</Vacio>;

  if (manifiestos && pendientes !== null) {
    if (pendientes > manifiestos) {
      resultado = (
        <Resultado severidad="info" titulo="Revisa los datos">
          Los cumplidos pendientes no pueden ser más que los manifiestos expedidos.
        </Resultado>
      );
    } else {
      const { porcentaje, nivel, margen, muestraPequena } = evaluarCumplidos(manifiestos, pendientes);
      const titulos = {
        verde: `${formatoPorcentaje(porcentaje)}: vas bien`,
        amarillo: `${formatoPorcentaje(porcentaje)}: cerca del límite`,
        rojo: `${formatoPorcentaje(porcentaje)}: el RNDC no te deja expedir manifiestos`
      };
      resultado = (
        <Resultado severidad={SEVERIDAD[nivel]} titulo={titulos[nivel]}>
          {nivel === 'rojo'
            ? `Superas el 20 %. Debes cumplir al menos ${formatoNumero(-margen)} ${-margen === 1 ? 'manifiesto' : 'manifiestos'} para volver a despachar.`
            : margen === 0
              ? 'Estás justo en el 20 %. Un cumplido atrasado más y el RNDC bloquea los manifiestos nuevos.'
              : `Te ${margen === 1 ? 'queda' : 'quedan'} ${formatoNumero(margen)} ${margen === 1 ? 'cumplido' : 'cumplidos'} atrasados de margen antes de pasar del 20 %.`}
          {muestraPequena && (
            <Box component="span" sx={{ display: 'block', mt: 1 }}>
              Con menos de {MUESTRA_MINIMA} manifiestos, un solo cumplido atrasado mueve mucho el porcentaje.
            </Box>
          )}
        </Resultado>
      );
    }
  }

  return (
    <Calculadora
      campos={
        <>
          <CampoNumero
            id="manifiestos-30-dias"
            label="Manifiestos expedidos en los últimos 30 días"
            valor={manifiestos}
            onChange={setManifiestos}
            ayuda="Días calendario, contando hacia atrás desde hoy."
          />
          <CampoNumero
            id="cumplidos-pendientes"
            label="Cumplidos de manifiesto atrasados"
            valor={pendientes}
            onChange={setPendientes}
            ayuda="Los que llevan más de 5 días hábiles desde la entrega de la mercancía sin registrar el cumplido."
          />
        </>
      }
      resultado={resultado}
      articulo="regla-del-20-por-ciento-rndc"
    />
  );
}

/***************************  CALCULADORA - ANULACIONES  ***************************/

function CalculadoraAnulaciones() {
  const [manifiestos, setManifiestos] = useState(null);
  const [anulados, setAnulados] = useState(null);

  let resultado = <Vacio>El límite depende de cuántos manifiestos expides en el mes: 30 %, 20 % o 10 %.</Vacio>;

  if (manifiestos && anulados !== null) {
    const { porcentaje, maximo, restantes, nivel } = evaluarAnulaciones(manifiestos, anulados);
    const cupo = `Con ${formatoNumero(manifiestos)} manifiestos en el mes, tu límite es el ${porcentaje} %: ${formatoNumero(maximo)} ${maximo === 1 ? 'anulación' : 'anulaciones'}.`;

    resultado =
      nivel === 'rojo' ? (
        <Resultado severidad="error" titulo="Ya pasaste el límite de este mes">
          {cupo} Cada anulación adicional exige explicar el motivo y aceptar en el RNDC que puede ser investigada; el RNDC se lo reporta a
          la Superintendencia de Transporte.
        </Resultado>
      ) : (
        <Resultado
          severidad={SEVERIDAD[nivel]}
          titulo={
            restantes === 0
              ? 'No te quedan anulaciones este mes'
              : `Te ${restantes === 1 ? 'queda' : 'quedan'} ${formatoNumero(restantes)} ${restantes === 1 ? 'anulación' : 'anulaciones'} este mes`
          }
        >
          {cupo}
        </Resultado>
      );
  }

  return (
    <Calculadora
      campos={
        <>
          <CampoNumero
            id="manifiestos-mes"
            label="Manifiestos expedidos este mes"
            valor={manifiestos}
            onChange={setManifiestos}
            ayuda="Mes calendario del manifiesto que quieres anular."
          />
          <CampoNumero
            id="manifiestos-anulados"
            label="Manifiestos ya anulados este mes"
            valor={anulados}
            onChange={setAnulados}
            ayuda="Sin contar los reemplazos por cambio de remesa, tarifa, destino, conductor o vehículo: esos no cuentan para el límite."
          />
        </>
      }
      resultado={resultado}
      articulo="limite-anulaciones-manifiestos-rndc"
    />
  );
}

/***************************  CALCULADORA - CONTENEDOR  ***************************/

function Calculadora({ campos, resultado, articulo }) {
  return (
    // `animate` y no `whileInView`: el panel se remonta al cambiar de pestaña (ver CLAUDE.md)
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Grid container spacing={{ xs: 3, md: 5 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack sx={{ gap: 3 }}>{campos}</Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack sx={{ gap: 2 }}>
            {resultado}
            <Link
              component={NextLink}
              href={articuloPath(articulo)}
              variant="subtitle2"
              underline="hover"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
            >
              Cómo funciona esta regla
              <SvgIcon name="tabler-arrow-right" size={16} />
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </motion.div>
  );
}

Calculadora.propTypes = { campos: PropTypes.any, resultado: PropTypes.any, articulo: PropTypes.string };

/***************************  PÁGINA - SIMULADOR  ***************************/

const pestanas = [
  { label: 'Flete vs. SICE-TAC', icon: 'tabler-scale', Componente: CalculadoraFlete },
  { label: 'Regla del 20 %', icon: 'tabler-percentage', Componente: CalculadoraCumplidos },
  { label: 'Anulaciones', icon: 'tabler-file-x', Componente: CalculadoraAnulaciones }
];

export default function Simulador() {
  const [pestana, setPestana] = useState(0);
  const { Componente } = pestanas[pestana];

  return (
    <>
      <SmallHero3 {...smallHeroSimulador} />

      <ContainerWrapper sx={{ pb: SECTION_COMMON_PY }}>
        <Box sx={{ bgcolor: 'grey.100', borderRadius: { xs: 6, sm: 8, md: 10 }, p: { xs: 2, sm: 4, md: 6 } }}>
          <Stack sx={{ gap: { xs: 3, md: 5 } }}>
            <Tabs
              value={pestana}
              onChange={(_, valor) => setPestana(valor)}
              variant="scrollable"
              aria-label="Calculadoras de la norma del RNDC"
              slotProps={{ indicator: { sx: { display: 'none' } } }}
              sx={{ minHeight: 'unset' }}
            >
              {pestanas.map((item, index) => (
                <Tab
                  key={item.label}
                  value={index}
                  label={item.label}
                  icon={<SvgIcon name={item.icon} size={16} stroke={2} color="text.secondary" />}
                  iconPosition="start"
                  sx={{
                    minHeight: 44,
                    borderRadius: 10,
                    border: '1px solid transparent',
                    '& svg': { mr: 1 },
                    '&.Mui-selected': { bgcolor: 'grey.200', borderColor: 'grey.400', color: 'text.primary' },
                    '&:hover': { bgcolor: 'grey.200' }
                  }}
                />
              ))}
            </Tabs>

            <Componente key={pestana} />
          </Stack>
        </Box>

        <Typography variant="caption" component="p" sx={{ color: 'text.secondary', mt: 2, maxWidth: 760 }}>
          Simulador informativo basado en la Resolución 20263040016075 de 2026 del Ministerio de Transporte. No consulta el RNDC ni
          SICE-TAC: los cálculos se hacen en tu navegador con los datos que escribes y no se guardan. Ante cualquier diferencia, prima lo
          que diga el RNDC.
        </Typography>
      </ContainerWrapper>

      <Cta5 {...cta5} />
    </>
  );
}
