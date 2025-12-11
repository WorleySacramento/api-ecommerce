import { Joi } from "celebrate";


export type Address = {
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
}


export const orderAddressSchema = Joi.object().keys({
  cep: Joi.string().regex(/^\d{5}-?\d{3}$/).required(),
  rua: Joi.string().trim().min(3).required(),
  numero: Joi.string().trim().min(1).required(),
  complemento: Joi.string().trim().allow(null).default(null),
  cidade: Joi.string().trim().min(3).required(),
  estado: Joi.string().trim().min(2).required(),
});