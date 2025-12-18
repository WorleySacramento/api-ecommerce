import { NotFoundError } from "../errors/not-found.error";
import { PaymentMethod } from "../models/payments.model";
import { PaymentMethodRepository } from "../repositories/payments.repository";


export class PaymentService {

  private paymentMethodRepository: PaymentMethodRepository;



  constructor() {
    this.paymentMethodRepository = new PaymentMethodRepository();

  }

  async getAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.getAll();
  }

  async getById(id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.getById(id);
    if (!paymentMethod) {
      throw new NotFoundError("Payment method not found");
    }
    return paymentMethod;
  }

  async save(paymentMethod: PaymentMethod): Promise<void> {
    await this.paymentMethodRepository.save(paymentMethod);
  }

  async update(id: string, paymentMethod: PaymentMethod): Promise<void> {
    const _paymentMethod = await this.getById(id);

    _paymentMethod.descricao = paymentMethod.descricao;
    _paymentMethod.ativa = paymentMethod.ativa;
    await this.paymentMethodRepository.update(_paymentMethod);
  }

  async delete(id: string): Promise<void> {
    await this.paymentMethodRepository.delete(id);
  }


}