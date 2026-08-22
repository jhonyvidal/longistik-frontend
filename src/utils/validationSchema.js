/***************************  REGLAS DE VALIDACIÓN (react-hook-form)  ***************************/

export const nameSchema = {
  required: 'El nombre es obligatorio',
  minLength: { value: 3, message: 'Escribe el nombre completo' }
};

export const companySchema = {
  required: 'El nombre de la empresa es obligatorio'
};

export const emailSchema = {
  required: 'El correo es obligatorio',
  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Correo no válido' }
};

export const phoneSchema = {
  required: 'El teléfono es obligatorio',
  pattern: { value: /^[0-9()\-.\s]{7,15}$/, message: 'Teléfono no válido' }
};

export const messageSchema = {
  maxLength: { value: 1000, message: 'El mensaje es demasiado largo' }
};
