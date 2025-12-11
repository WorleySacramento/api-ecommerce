import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { newOrderSchema } from "../models/order.model";
import { OrdersController } from "../controllers/orders.controller";


export const ordersRoute = Router();

ordersRoute.post(
  "/orders",
  celebrate({ [Segments.BODY]: newOrderSchema }),
  expressAsyncHandler(OrdersController.save)
);