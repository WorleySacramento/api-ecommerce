import express from "express";
import asyncHandler from "express-async-handler";
import { UsersController } from "../controllers/users.controller";
import { celebrate, Segments } from "celebrate";
import { userSchema } from "../models/user.model";

export const usersRoute = express.Router();

usersRoute.get("/users", asyncHandler(UsersController.getAllUsers));
usersRoute.get("/users/:id",asyncHandler(UsersController.getUserById));
usersRoute.post("/users", celebrate({[Segments.BODY]: userSchema}), asyncHandler(UsersController.createUser));
usersRoute.put("/users/:id",celebrate({[Segments.BODY]: userSchema}) ,asyncHandler(UsersController.updateUser));
usersRoute.delete("/users/:id", asyncHandler(UsersController.deleteUser));