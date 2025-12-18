
import { Category } from '../models/category.model';
import { CollectionReference, getFirestore } from "firebase-admin/firestore";


export class CategoryRepository {

  private collection: CollectionReference;

  constructor() {
    this.collection = getFirestore().collection('categories');
  }

  async getAll(): Promise<Category[]> {
    const snapShot = await this.collection.get();
    return snapShot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    }) as Category[];
  }

  async getById(id: string): Promise<Category | null> {
    const userDoc = await this.collection.doc(id).get();
    if (userDoc.exists) {
      return {
        id: userDoc.id,
        ...userDoc.data()
      } as Category;
    } else {
      return null;
    }
  }

  async save(category: Category){
    // delete user.password;
    await this.collection.add(category);
  }

  async update( category: Category){
     const docRef = this.collection.doc(category.id!);
     
      await docRef.set({
        descricao: category.descricao,
        ativa: category.ativa
      });
  }

  async delete(id: string){
    await this.collection.doc(id).delete();
  }

}