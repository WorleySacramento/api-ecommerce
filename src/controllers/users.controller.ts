import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";


type User = {
  id: number;
  name: string;
  idade: number;
  email: string;
};


export class UsersController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const snapShot = await getFirestore().collection('users').get();
      const users = snapShot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      res.send(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.params.id;
      const userDoc = await getFirestore().collection('users').doc(userId).get();
      res.send({
        id: userDoc.id,
        ...userDoc.data()
      });
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      let user = req.body;
      await getFirestore().collection('users').add(user);
      res.status(201).send({ message: "User created" });
    } catch (error) {
      console.error("Error creating user:", error);
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.params.id;
      let user = req.body as User;
      await getFirestore().collection('users').doc(userId).set({
        name: user.name,
        idade: user.idade,
        email: user.email
      });
      res.send({ message: "User updated" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.params.id;
      await getFirestore().collection('users').doc(userId).delete();
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}