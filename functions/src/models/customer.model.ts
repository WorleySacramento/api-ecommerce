import { Joi } from "celebrate";
import { phoneRegexPatern } from "../utils/regex-utils";


export type Customer = {
  nome: string;
  telefone: string;
}

export const customerSchema = Joi.object().keys({
  nome: Joi.string().trim().min(3).required(),
  telefone: Joi.string().regex(phoneRegexPatern).required(),
});