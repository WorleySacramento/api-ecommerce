import express from "express";
import asyncHandler from "express-async-handler";
import { CompaniesController } from "../controllers/companies.controller";
import { celebrate, Segments } from "celebrate";
import { newCompanySchema, updateCompanySchema } from "../models/company.model";

export const companyRoute = express.Router();

companyRoute.get("/companies", asyncHandler(CompaniesController.getAll));
companyRoute.get("/companies/:id",asyncHandler(CompaniesController.getById));
companyRoute.post("/companies", celebrate({[Segments.BODY]: newCompanySchema}), asyncHandler(CompaniesController.createCompany));
companyRoute.put("/companies/:id",celebrate({[Segments.BODY]: updateCompanySchema}) ,asyncHandler(CompaniesController.updateCompany));