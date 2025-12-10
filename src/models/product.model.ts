import { Joi } from "celebrate";
import { Category } from "./category.model";

export type Product = {
  id?: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
  categoria:Category;
  ativa: boolean;
};

export const newProductSchema = Joi.object().keys({
  nome: Joi.string().min(3).required(),
  descricao: Joi.string().allow(null).default(null),
  preco: Joi.number().positive().required(),
  imagem: Joi.string().allow(null).default(null).optional(),
  categoria: Joi.object().keys({
    id: Joi.string().required()
  }).required(),
  ativa: Joi.boolean().only().allow(true).default(true)
});

export const updateProductSchema = Joi.object().keys({
  nome: Joi.string().min(3).required(),
  descricao: Joi.string().allow(null).default(null),
  preco: Joi.number().positive().required(),
  imagem: Joi.string().allow(null).default(null),
  categoria: Joi.object().keys({
    id: Joi.string().required(),
  }).required(),
  ativa: Joi.boolean().required(),
});
