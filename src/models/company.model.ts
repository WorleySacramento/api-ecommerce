import { Joi } from "celebrate";
import { phoneRegexPatern } from "../utils/regex-utils";


export type Company = {
  id?: string;
  razaoSocial: string;
  nomeFantasia: string;
 logoMarca: string;
  cpfCnpj: string;
  telefone: string;
  horarioFuncionamento: string;
  endereco: string;
  localizacao: string;
  taxaEntrega: number;
  ativa: boolean;

};


export const newCompanySchema = Joi.object().keys({
  razaoSocial: Joi.string().required(),
  nomeFantasia: Joi.string().required(),
  logoMarca: Joi.string().allow(null),
  cpfCnpj: Joi.alternatives().try(
    Joi.string().length(11).required(),
    Joi.string().length(14).required()
  ).required(),
  telefone: Joi.string().regex(phoneRegexPatern).required(),
  horarioFuncionamento: Joi.string().required(),
  endereco: Joi.string().required(),
  localizacao: Joi.string().required(),
  taxaEntrega: Joi.number().required(),
  ativa: Joi.boolean().only().allow(true).default(true).optional(),
})

export const updateCompanySchema = Joi.object().keys({
  razaoSocial: Joi.string().required(),
  nomeFantasia: Joi.string().required(),
  logoMarca: Joi.string().allow(null),
  cpfCnpj: Joi.alternatives().try(
    Joi.string().length(11).required(),
    Joi.string().length(14).required()
  ).required(),
  telefone: Joi.string().regex(phoneRegexPatern).required(),
  horarioFuncionamento: Joi.string().required(),
  endereco: Joi.string().required(),
  localizacao: Joi.string().required(),
  taxaEntrega: Joi.number().required(),
  ativa: Joi.boolean().required(),
})



export const authLoginCompanySchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

export const authRecoveryCompanySchema = Joi.object().keys({
  email: Joi.string().email().required(),
})