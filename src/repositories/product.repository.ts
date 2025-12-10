import { Product } from './../models/product.model';

import { CollectionReference, getFirestore } from "firebase-admin/firestore";


export class ProductRepository {
  private collection = {} as CollectionReference;

  constructor() {
    this.collection = getFirestore().collection('products');
  }

  async getAll(): Promise<Product[]> {
    const snapShot = await this.collection.get();
    return snapShot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    }) as Product[];
  }

  async getById(id: string): Promise<Product | null> {
    const userDoc = await this.collection.doc(id).get();
    if (userDoc.exists) {
      return {
        id: userDoc.id,
        ...userDoc.data()
      } as Product;
    } else {
      return null;
    }
  }

  async save(product: Product): Promise<void> {
    // delete user.password;
    await this.collection.add(product);
  }

  async update( product: Product): Promise<void> {
     let docRef = this.collection.doc(product.id!);
     delete product.id;
      await docRef.set({
        descricao: product.descricao,
        ativa: product.ativa,
        nome: product.nome,
        preco: product.preco,
        imagem: product.imagem,
        categoria: product.categoria.id
      });
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

}