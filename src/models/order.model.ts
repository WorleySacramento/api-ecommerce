import { Joi } from "celebrate";
import { PaymentMethod } from "./payments.model";
import { Company } from "./company.model";
import { Customer, customerSchema } from "./customer.model";
import { Address, orderAddressSchema } from "./address.model";
import { OrderItem, orderItemSchema } from "./order-item.model";
import { DocumentData, FieldValue, FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";


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
  observacoes: string;
  subTotal: number;
  total: number;



  constructor(data: any) {
    this.id = data.id;
    this.empresa = new Company(data.empresa);
    this.cliente = data.cliente;
    this.endereco = data.endereco;
    this.cpfCnpjCupom = data.cpfCnpjCupom;
    this.data = data.data instanceof Timestamp ? data.data.toDate() : data.data;
    this.isEntrega = data.isEntrega;
    this.formaPagamento = new PaymentMethod(data.formaPagamento);
    this.taxaEntrega = data.taxaEntrega;
    this.itens = data.itens?.map((item: any) => new OrderItem(item));
    this.status = data.status ?? OrderStatus.PENDENTE;
    this.observacoes = data.observacoes;
    this.subTotal = data.subTotal
    this.total = data.total;

  }
  getSubTotal(): number {
    return this.itens.map(item => item.getTotal())
    .reduce((total,next)=> total + next,0) ?? 0;
  }
  getTotal(): number {
    return this.getSubTotal() + this.taxaEntrega;
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
  status: Joi.string().only().allow(OrderStatus.PENDENTE).default(OrderStatus.PENDENTE),
  observacoes: Joi.string().trim().allow(null).default(null)

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

export const orderConverter: FirestoreDataConverter<Order> = {
  toFirestore: (order: Order): DocumentData => {
    return {
      empresa: {
        id: order.empresa.id,
        nomeFantasia: order.empresa.nomeFantasia,
        razaoSocial: order.empresa.razaoSocial,
        cpfCnpj: order.empresa.cpfCnpj,
        logoMarca: order.empresa.logoMarca,
        endereco: order.empresa.endereco,
        localizacao: order.empresa.localizacao,
        telefone: order.empresa.telefone
      },
      cliente: {
        nome: order.cliente.nome,
        telefone: order.cliente.telefone
      },
      endereco: {
        rua: order.endereco.rua,
        numero: order.endereco.numero,
        complemento: order.endereco.complemento,
        cep: order.endereco.cep,
        cidade: order.endereco.cidade,
        estado: order.endereco.estado
      },
      cpfCnpjCupom: order.cpfCnpjCupom,
      data: FieldValue.serverTimestamp(),
      isEntrega: order.isEntrega,
      formaPagamento: {
        id: order.formaPagamento.id,
        descricao: order.formaPagamento.descricao
      },
      taxaEntrega: order.taxaEntrega,
      status: order.status,
      observacoes: order.observacoes,
      subTotal: order.getSubTotal(),
      total: order.getTotal()
    };
  },


  fromFirestore: (snapshot: QueryDocumentSnapshot): Order => {
    return new Order({
      id: snapshot.id,
      ...snapshot.data()
    });
  }
};
