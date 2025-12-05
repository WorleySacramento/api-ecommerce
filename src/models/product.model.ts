import { Joi } from "celebrate";

export type Product = {
  id?: string;
  companyId: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  ativo: boolean;
  estoque: number;
};

export const newProductSchema = Joi.object().keys({
  companyId: Joi.string().required(),
  nome: Joi.string().required(),
  descricao: Joi.string().required(),
  preco: Joi.number().positive().required(),
  imagem: Joi.string().allow(null),
  ativo: Joi.boolean().default(true).optional(),
  estoque: Joi.number().integer().min(0).default(0).optional(),
});

export const updateProductSchema = Joi.object().keys({
  nome: Joi.string().required(),
  descricao: Joi.string().required(),
  preco: Joi.number().positive().required(),
  imagem: Joi.string().allow(null),
  ativo: Joi.boolean().required(),
  estoque: Joi.number().integer().min(0).required(),
});
