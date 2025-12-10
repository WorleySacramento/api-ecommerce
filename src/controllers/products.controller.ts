import { Product } from './../models/product.model';
import { Request, Response } from "express";
import { ProductService } from '../services/product.service';


export class ProductsController {
  static async getAll(req: Request, res: Response) {
    res.send(await new ProductService().getAll());
  }

  static async getById(req: Request, res: Response) {
    let productId = req.params.id;
    res.send(await new ProductService().getById(productId));
  }

  static async save(req: Request, res: Response) {
    await new ProductService().save(req.body);
    res.status(201).send({ message: "Product created" });
  }

  static async update(req: Request, res: Response) {
    let productId = req.params.id;
    let product = req.body as Product;
    await new ProductService().update(productId, product);
    res.send({ message: "Product updated" });
  }

  static async delete(req: Request, res: Response) {
    let productId = req.params.id;
    await new ProductService().delete(productId);
    res.send({ message: "Product deleted" });
  }

}