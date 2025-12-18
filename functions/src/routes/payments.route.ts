import express from "express";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { newPaymentSchema, updatePaymentSchema } from "../models/payments.model";
import { PaymentsController } from "../controllers/payments.controller";

export const paymentRoute = express.Router();

paymentRoute.get("/payment-methods", asyncHandler(PaymentsController.getAll));
paymentRoute.get("/payment-methods/:id",asyncHandler(PaymentsController.getById));
paymentRoute.post("/payment-methods", celebrate({[Segments.BODY]: newPaymentSchema}), asyncHandler(PaymentsController.save));
paymentRoute.put("/payment-methods/:id",celebrate({[Segments.BODY]: updatePaymentSchema}) ,asyncHandler(PaymentsController.update));
paymentRoute.delete("/payment-methods/:id", asyncHandler(PaymentsController.delete));