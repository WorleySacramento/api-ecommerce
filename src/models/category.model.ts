import { Joi } from "celebrate";


export type Category = {
  id?: string;
  descricao: string;
  ativa: boolean;

};


export const newCategorySchema = Joi.object().keys({
  descricao: Joi.string().required(),
  ativa: Joi.boolean().only().allow(true).default(true).optional(),
})

export const updateCategorySchema = Joi.object().keys({
  descricao: Joi.string().required(),
  ativa: Joi.boolean().required(),
})



export const authLoginCompanySchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

export const authRecoveryCompanySchema = Joi.object().keys({
  email: Joi.string().email().required(),
})