import { Joi } from "celebrate";
import { phoneRegexPatern } from "../utils/regex-utils";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";


export class Company {
  id: string;
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

  constructor(data: Company | any) {
    this.id = data.id;
    this.razaoSocial = data.razaoSocial;
    this.nomeFantasia = data.nomeFantasia;
    this.logoMarca = data.logoMarca;
    this.cpfCnpj = data.cpfCnpj;
    this.telefone = data.telefone;
    this.horarioFuncionamento = data.horarioFuncionamento;
    this.endereco = data.endereco;
    this.localizacao = data.localizacao;
    this.taxaEntrega = data.taxaEntrega;
    this.ativa = data.ativa ?? true;
  }

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

export const companyConverter: FirestoreDataConverter<Company> = {
  toFirestore: (company: Company): DocumentData => {
    return{
      razaoSocial: company.razaoSocial,
      nomeFantasia: company.nomeFantasia,
      logoMarca: company.logoMarca,
      cpfCnpj: company.cpfCnpj,
      telefone: company.telefone,
      horarioFuncionamento: company.horarioFuncionamento,
      endereco: company.endereco,
      localizacao: company.localizacao,
      taxaEntrega: company.taxaEntrega,
      ativa: company.ativa
    }
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): Company => {
    return new Company({
      id: snapshot.id,
      ...snapshot.data()
    });
  }
}