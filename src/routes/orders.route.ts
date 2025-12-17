import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { newOrderSchema, searchOrderQuerySchema } from "../models/order.model";
import { OrdersController } from "../controllers/orders.controller";


export const ordersRoute = Router();

ordersRoute.post(
  "/orders",
  celebrate({ [Segments.BODY]: newOrderSchema }),
  expressAsyncHandler(OrdersController.save)
);

ordersRoute.get("/orders", 
  celebrate({[Segments.QUERY]:searchOrderQuerySchema}),
  expressAsyncHandler(OrdersController.search)
);

ordersRoute.get("/orders/:id/items", 
  expressAsyncHandler(OrdersController.getItems)
);

ordersRoute.get("/orders/:id", 
  expressAsyncHandler(OrdersController.getById)
);