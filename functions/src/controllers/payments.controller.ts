import { PaymentService } from '../services/payment.service';
import { Request, Response } from "express";
import { PaymentMethod } from '../models/payments.model';



export class PaymentsController {
  static async getAll(req: Request, res: Response) {
    res.send(await new PaymentService().getAll());
  }

  static async getById(req: Request, res: Response) {
    const paymentMethodId = req.params.id;
    res.send(await new PaymentService().getById(paymentMethodId));
  }

  static async save(req: Request, res: Response) {
    await new PaymentService().save(req.body);
    res.status(201).send({ 
      message: "Payment method created"
     });
  }

  static async update(req: Request, res: Response) {
    const paymentMethodId = req.params.id;
    const paymentMethod = req.body as PaymentMethod;
    await new PaymentService().update(paymentMethodId, paymentMethod);
    res.send({ message: "Payment method updated" });
  }

  static async delete(req: Request, res: Response) {
    const paymentMethodId = req.params.id;
    await new PaymentService().delete(paymentMethodId);
    res.send({ message: "Payment method deleted" });
  }

}