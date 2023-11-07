import Joi from 'joi';

export const post_userSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(30)
    .required()
    .messages({
      'string.min': 'El campo firstname debe tener al menos 3 caracteres',
      'string.max': 'El campo firstname debe tener, como mucho, 30 caracteres',
      'any.required': 'El campo firstname es requerido',
      '*': 'Revisa el campo firstname',
    }),
  lastname: Joi.string().trim().min(3).max(30)
    .required()
    .messages({
      'string.min': 'El campo lastname debe tener al menos 3 caracteres',
      'string.max': 'El campo lastname debe tener, como mucho, 30 caracteres',
      'any.required': 'El campo lastname es requerido',
      '*': 'Revisa el campo lastname',
    }),
  username: Joi.string().trim().min(3).max(30)
    .required()
    .messages({
      'string.min': 'El campo username debe tener al menos 3 caracteres',
      'string.max': 'El campo username debe tener, como mucho, 30 caracteres',
      'any.required': 'El campo username es requerido',
      '*': 'Revisa el campo username',
    }),
  password: Joi.string().trim().min(3).max(30)
    .required()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    )
    .messages({
      'string.min': 'El campo password debe tener al menos 3 caracteres',
      'string.max': 'El campo password debe tener, como mucho, 30 caracteres',
      'any.required': 'El campo password es requerido',
      'string.pattern.base':
        'El campo password debe tener al menos un numero, una letra mayuscula, una letra minuscula y un caracter especial',
      '*': 'Revisa el campo password',
    }),
});

export const put_userSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(30)
    .messages({
      'string.min': 'El campo firstname debe tener al menos 3 caracteres',
      'string.max': 'El campo firstname debe tener, como mucho, 30 caracteres',
      'any.required': 'El campo firstname es requerido',
      '*': 'Revisa el campo firstname',
    }),
  lastname: Joi.string().trim().min(3).max(30)
    .messages({
      'string.min': 'El campo lastname debe tener al menos 3 caracteres',
      'string.max': 'El campo lastname debe tener, como mucho, 30 caracteres',
      'any.required': 'El campo lastname es requerido',
      '*': 'Revisa el campo lastname',
    }),
  username: Joi.string().trim().min(3).max(30)
    .messages({
      'string.min': 'El campo username debe tener al menos 3 caracteres',
      'string.max': 'El campo username debe tener, como mucho, 30 caracteres',
      'any.required': 'El campo username es requerido',
      '*': 'Revisa el campo username',
    }),
  password: Joi.string().trim().min(3).max(30)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    )
    .messages({
      'string.min': 'El campo password debe tener al menos 3 caracteres',
      'string.max': 'El campo password debe tener, como mucho, 30 caracteres',
      'any.required': 'El campo password es requerido',
      'string.pattern.base':
        'El campo password debe tener al menos un numero, una letra mayuscula, una letra minuscula y un caracter especial',
      '*': 'Revisa el campo password',
    }),
}).custom((value, helper) => {
  const { firstname, username, lastname, password } = value;

  if (!firstname && !username && !lastname && !password) {
    return helper.message('Al menos un campo debe estar presente en el body');
  }
  return true;
});
