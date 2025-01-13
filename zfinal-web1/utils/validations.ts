import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  address: yup.string().required('La dirección es obligatoria'),
  postal: yup.string().required('El código postal es obligatorio'),
  idNumber: yup.string().required('El CIF/NIF/DNI es obligatorio'),
  phone: yup.string().required('El teléfono es obligatorio'),
  email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe tener al menos una letra mayúscula')
    .matches(/[0-9]/, 'Debe tener al menos un número')
    .required('La contraseña es obligatoria'),
});