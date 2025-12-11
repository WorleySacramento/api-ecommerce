import Joi from "joi";
import { Product } from "./product.model";


export type OrderItem = {
  produto: Product;
  quantidade: number;
  observacao: string;
}


export const orderItemSchema = Joi.object().keys({
    produto: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    quantidade: Joi.number().integer().positive().required(),
    observacao: Joi.string().trim().allow(null).default(null)
});