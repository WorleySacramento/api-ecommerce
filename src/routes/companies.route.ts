import express from "express";
import asyncHandler from "express-async-handler";
import { CompaniesController } from "../controllers/companies.controller";
import { celebrate, Segments } from "celebrate";
import { companySchema } from "../models/company.model";

export const companyRoute = express.Router();

companyRoute.get("/companies", asyncHandler(CompaniesController.getAll));
companyRoute.get("/companies/:id",asyncHandler(CompaniesController.getById));
companyRoute.post("/companies", celebrate({[Segments.BODY]: companySchema}), asyncHandler(CompaniesController.createCompany));
companyRoute.put("/companies/:id",celebrate({[Segments.BODY]: companySchema}) ,asyncHandler(CompaniesController.updateCompany));