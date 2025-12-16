import { Joi } from "celebrate";
import { PaymentMethod } from "./payments.model";
import { Company } from "./company.model";
import { Customer, customerSchema } from "./customer.model";
import { Address, orderAddressSchema } from "./address.model";
import { OrderItem, orderItemSchema } from "./order-item.model";
import { FieldValue, Timestamp } from "firebase-admin/firestore";


export class Order {
  id: string;
  empresa: Company;
  cliente: Customer;
  formaPagamento: PaymentMethod;
  endereco: Address;
  cpfCnpjCupom: string;
  data: Date | FieldValue;
  taxaEntrega: number;
  itens: OrderItem[];
  isEntrega: boolean;
  status: OrderStatus;


  constructor(data: any) {
    this.id = data.id;
    this.empresa = data.empresa;
    this.cliente = data.cliente;
    this.endereco = data.endereco;
    this.cpfCnpjCupom = data.cpfCnpjCupom;    
    this.data = data.data instanceof Timestamp ? data.data.toDate() : data.data;
    this.isEntrega = data.isEntrega;
    this.formaPagamento = data.formaPagamento;
    this.taxaEntrega = data.taxaEntrega;
    this.itens = data.itens;
    this.status = data.status;
  }
};


export enum OrderStatus {
  PENDENTE = "pendente",
  APROVADO = "aprovado",
  EM_PREPARACAO = "em_preparacao",
  EM_ENTREGA = "em_entrega",
  ENTREGUE = "entregue",
  CANCELADO = "cancelado"
}


export const newOrderSchema = Joi.object().keys({
  empresa: Joi.object().keys({
    id: Joi.string().trim().required()
  }).required(),
  cliente: customerSchema.required(),
  endereco: Joi.alternatives().conditional(
    'isEntrega', {
      is: true,
      then: orderAddressSchema.required(),
      otherwise: Joi.object().only().allow(null).default(null)
    }
  ),
  cpfCnpjCupom: Joi.alternatives().try(
    Joi.string().length(11).required(),
    Joi.string().length(14).required(),
  ).allow(null),
  formaPagamento: Joi.object().keys({
    id: Joi.string().trim().required(),
  }).required(),
  taxaEntrega: Joi.number().min(0).required(),
  isEntrega: Joi.boolean().required(),
  itens: Joi.array().items(orderItemSchema).min(1).required(),
  status: Joi.string().only().allow(OrderStatus.PENDENTE).default(OrderStatus.PENDENTE)
});

export const updateOrderSchema = Joi.object().keys({});

export type QueryParamsOrder = {
  empresaId?: string;
  dataInicio?: Date;
  dataFim?: Date;
  status?: OrderStatus;
}

export const searchOrderQuerySchema = Joi.object().keys({
  empresaId: Joi.string().trim(),
  dataInicio: Joi.date(),
  dataFim: Joi.date(),
  status: Joi.string().only().allow(...Object.values(OrderStatus))
});
