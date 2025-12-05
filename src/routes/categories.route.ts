import express from "express";
import asyncHandler from "express-async-handler";
import { CategoriesController } from "../controllers/categories.controller";
import { celebrate, Segments } from "celebrate";
import { newCategorySchema, updateCategorySchema } from "../models/category.model";

export const categoryRoute = express.Router();

categoryRoute.get("/categories", asyncHandler(CategoriesController.getAll));
categoryRoute.get("/categories/:id",asyncHandler(CategoriesController.getById));
categoryRoute.post("/categories", celebrate({[Segments.BODY]: newCategorySchema}), asyncHandler(CategoriesController.save));
categoryRoute.put("/categories/:id",celebrate({[Segments.BODY]: updateCategorySchema}) ,asyncHandler(CategoriesController.update));
categoryRoute.delete("/categories/:id", asyncHandler(CategoriesController.delete));