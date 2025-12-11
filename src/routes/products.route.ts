import { ProductsController } from '../controllers/products.controller';
import express from "express";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { newProductSchema, searchQuerySchema, updateProductSchema } from '../models/product.model';

export const productRoute = express.Router();

productRoute.get("/products", asyncHandler(ProductsController.getAll));
productRoute.get("/products/search", celebrate({[Segments.QUERY]: searchQuerySchema}) ,asyncHandler(ProductsController.search));

productRoute.get("/products/:id",asyncHandler(ProductsController.getById));

productRoute.post("/products", celebrate({[Segments.BODY]: newProductSchema}), asyncHandler(ProductsController.save));
productRoute.put("/products/:id",celebrate({[Segments.BODY]: updateProductSchema}) ,asyncHandler(ProductsController.update));
productRoute.delete("/products/:id", asyncHandler(ProductsController.delete));