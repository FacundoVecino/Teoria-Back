import Joi from 'joi';

export const post_userSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(30).required().messages({
    'string.min': 'El campo debe tener al menos 3 caracteres',
    'string.max': 'El campo debe tener, como mucho, 30 caracteres',
    'any.required': 'El campo es requerido',
    '*': 'Revisa el campo anterior',
  }),
  laany: Joi.string().trim().min(3).max(30).required().messages({
    'string.min': 'El campo debe tener al menos 3 caracteres',
    'string.max': 'El campo debe tener, como mucho, 30 caracteres',
    'any.required': 'El campo es requerido',
    '*': 'Revisa el campo anterior',
  }),
  username: Joi.string().trim().min(3).max(30).required().messages({
    'string.min': 'El campo debe tener al menos 3 caracteres',
    'string.max': 'El campo debe tener, como mucho, 30 caracteres',
    'any.required': 'El campo es requerido',
    '*': 'Revisa el campo anterior',
  }),
  password: Joi.string().trim().min(3).max(30).required().messages({
    'string.min': 'El campo debe tener al menos 3 caracteres',
    'string.max': 'El campo debe tener, como mucho, 30 caracteres',
    'any.required': 'El campo es requerido',
    '*': 'Revisa el campo anterior',
  }),
});
