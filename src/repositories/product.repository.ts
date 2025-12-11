import { Product } from './../models/product.model';

import { CollectionReference, getFirestore, QuerySnapshot } from "firebase-admin/firestore";


export class ProductRepository {
  private collection = {} as CollectionReference;

  constructor() {
    this.collection = getFirestore().collection('products');
  }

  async getAll(): Promise<Product[]> {
    const snapShot = await this.collection.get();
    return this.snapShotToArray(snapShot);
  }

  async search(categoriaId: string): Promise<Product[]> {
   const snapShot = await this.collection.where('categoria.id', '==', categoriaId).get();
    return this.snapShotToArray(snapShot);
  }

  private snapShotToArray(snapShot: QuerySnapshot): Product[] {
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
   const docRef = this.collection.doc(product.id!);
   await docRef.set({
     nome: product.nome,
     descricao: product.descricao,
      preco: product.preco,
      imagem: product.imagem,
      categoria: product.categoria,
      ativa: product.ativa
    })

  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

  async getCountByCategory(categoriaId: string): Promise<number> {

   const countSnapShot = await this.collection.where('categoria.id', '==', categoriaId).count().get()
   return countSnapShot.data().count;
  }

}