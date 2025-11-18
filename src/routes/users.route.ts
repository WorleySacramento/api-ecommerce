import express from "express";
import { UsersController } from "../controllers/users.controller";

export const usersRoute = express.Router();

usersRoute.get("/users", UsersController.getAllUsers);
usersRoute.get("/users/:id",UsersController.getUserById);
usersRoute.post("/users", UsersController.createUser);
usersRoute.put("/users/:id",UsersController.updateUser);
usersRoute.delete("/users/:id", UsersController.deleteUser);