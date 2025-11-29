import express from "express";
import asyncHandler from "express-async-handler";
import { AuthController } from "../controllers/auth.controller";


export const authRoutes = express.Router();

authRoutes.post("/auth/login", asyncHandler(AuthController.login));