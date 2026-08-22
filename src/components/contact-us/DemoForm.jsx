'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { useForm } from 'react-hook-form';

// @project
import branding from '@/branding.json';
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { EMAIL_URL } from '@/path';
import { companySchema, emailSchema, messageSchema, nameSchema, phoneSchema } from '@/utils/validationSchema';

/***************************  FORMULARIO - ETIQUETA  ***************************/

function FieldLabel({ name, optional }) {
  return (
    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
      {name}
      {optional && (
        <Typography component="span" variant="caption" sx={{ color: 'text.secondary', ml: 0.5 }}>
          (opcional)
        </Typography>
      )}
    </Typography>
  );
}

FieldLabel.propTypes = { name: PropTypes.string, optional: PropTypes.bool };

/***************************  FORMULARIO - ERROR  ***************************/

function ErrorMessage({ message }) {
  return (
    <Typography variant="caption" sx={{ color: 'error.main' }}>
      {message}
    </Typography>
  );
}

ErrorMessage.propTypes = { message: PropTypes.string };

/***************************  TAMAÑO DE FLOTA  ***************************/

const FLOTA = ['1 a 5 vehículos', '6 a 20 vehículos', '21 a 50 vehículos', 'Más de 50 vehículos', 'Aún no tengo flota propia'];

/***************************  FORMULARIO - SOLICITUD DE DEMO  ***************************/

export default function DemoForm() {
  // idle | sending | success | error
  const [status, setStatus] = useState('idle');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues: { fleet: FLOTA[0] } });

  const onSubmit = async (data) => {
    setStatus('sending');

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Respuesta no exitosa del servidor');

      setStatus('success');
      reset({ fleet: FLOTA[0] });
    } catch (error) {
      console.error('No se pudo enviar la solicitud de demo:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Stack sx={{ gap: 2, alignItems: 'center', textAlign: 'center', py: { xs: 3, md: 5 } }}>
        <Typography variant="h4">¡Gracias! Recibimos tu solicitud.</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 480 }}>
          Te contactamos en menos de un día hábil para coordinar la demo. Si es urgente, escríbenos a {branding.company.email}.
        </Typography>
        <Button variant="outlined" onClick={() => setStatus('idle')}>
          Enviar otra solicitud
        </Button>
      </Stack>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Grid container spacing={2.5} sx={{ justifyContent: 'space-between' }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Nombre y apellido" />
              <OutlinedInput
                {...register('name', nameSchema)}
                placeholder="Ej. Juan Ramírez"
                slotProps={{ input: { 'aria-label': 'Nombre y apellido' } }}
                fullWidth
                error={Boolean(errors.name)}
              />
              {errors.name?.message && <ErrorMessage message={errors.name.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Empresa" />
              <OutlinedInput
                {...register('company', companySchema)}
                placeholder="Razón social o nombre comercial"
                slotProps={{ input: { 'aria-label': 'Empresa' } }}
                fullWidth
                error={Boolean(errors.company)}
              />
              {errors.company?.message && <ErrorMessage message={errors.company.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Correo" />
              <OutlinedInput
                {...register('email', emailSchema)}
                placeholder="nombre@empresa.com"
                slotProps={{ input: { 'aria-label': 'Correo' } }}
                fullWidth
                error={Boolean(errors.email)}
              />
              {errors.email?.message && <ErrorMessage message={errors.email.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Teléfono / WhatsApp" />
              <OutlinedInput
                {...register('phone', phoneSchema)}
                placeholder="300 000 0000"
                slotProps={{ input: { 'aria-label': 'Teléfono' } }}
                fullWidth
                error={Boolean(errors.phone)}
                startAdornment={
                  <Typography variant="body1" sx={{ color: 'text.secondary', pr: 1.5 }}>
                    +57
                  </Typography>
                }
              />
              {errors.phone?.message && <ErrorMessage message={errors.phone.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Vehículos en operación" />
              <Select
                value={watch('fleet')}
                onChange={(event) => setValue('fleet', event.target.value)}
                inputProps={{ 'aria-label': 'Vehículos en operación' }}
                fullWidth
              >
                {FLOTA.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Cuéntanos cómo despachas hoy" optional />
              <OutlinedInput
                {...register('message', messageSchema)}
                multiline
                rows={4}
                placeholder="Ej. generamos unas 300 guías al mes, todo lo digitamos directamente en el RNDC…"
                fullWidth
                error={Boolean(errors.message)}
                slotProps={{ input: { 'aria-label': 'Mensaje' } }}
              />
              {errors.message?.message && <ErrorMessage message={errors.message.message} />}
            </Stack>
          </Grid>
        </Grid>

        {status === 'error' && (
          <Alert severity="error">
            No pudimos enviar tu solicitud. Escríbenos directamente a{' '}
            <Box component="a" href={EMAIL_URL} sx={{ color: 'inherit' }}>
              {branding.company.email}
            </Box>
            .
          </Alert>
        )}

        <Box sx={{ textAlign: 'center' }}>
          <ButtonAnimationWrapper>
            <Button type="submit" color="secondary" size="large" variant="contained" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : 'Solicitar demo'}
            </Button>
          </ButtonAnimationWrapper>
        </Box>
      </Stack>
    </form>
  );
}
