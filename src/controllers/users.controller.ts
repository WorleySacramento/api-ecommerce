import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";




export class UsersController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    res.send(await new UserService().getAll());
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    let userId = req.params.id;
    res.send(await new UserService().getById(userId));
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    await new UserService().createUser(req.body);
    res.status(201).send({ message: "User created" });
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    let userId = req.params.id;
    let user = req.body as User;
    await new UserService().updateUser(userId, user);
    res.send({ message: "User updated" });
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    let userId = req.params.id;
    new UserService().deleteUser(userId);
    res.status(204).end();
  }
}