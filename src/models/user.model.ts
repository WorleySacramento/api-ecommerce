import { Joi } from "celebrate";


export type User = {
  id: string;
  name: string;
  idade: number;
  email: string;
};


export const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    idade: Joi.number().integer().required(),
    email: Joi.string().email().required()
  })