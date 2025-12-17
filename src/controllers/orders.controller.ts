import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { Order, QueryParamsOrder } from "../models/order.model.js";

export class OrdersController {
    static async save(req: Request, res: Response) {
        const order = new Order(req.body);
        await new OrderService().save(order);
        res.status(201).send({
            message: "Pedido criado com sucesso!"
        });
    }

    static async search(req: Request, res: Response) {
        const orders = await new OrderService().search(req.query as QueryParamsOrder);
        res.send(orders);

    }

   static async getItems(req: Request, res: Response) {
        const itens = await new OrderService().getItems(req.params.id);
        res.send(itens);
    }

    static async getById(req: Request, res: Response) {
        const orderById = await new OrderService().getById(req.params.id);
        res.send(orderById);
    }


}