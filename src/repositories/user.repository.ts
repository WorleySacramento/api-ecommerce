import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";

export class UserRepository {

  private collection = {} as CollectionReference;

  constructor() {
    this.collection = getFirestore().collection('users');
  }

  async getAll(): Promise<User[]> {
    const snapShot = await this.collection.get();
    return snapShot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    }) as User[];
  }

  async getById(id: string): Promise<User | null> {
    const userDoc = await this.collection.doc(id).get();
    if (userDoc.exists) {
      return {
        id: userDoc.id,
        ...userDoc.data()
      } as User;
    } else {
      return null;
    }
  }

  async createUser(user: User): Promise<void> {
    await this.collection.add(user);
  }

  async updateUser( user: User): Promise<void> {
     let docRef = this.collection.doc(user.id);
      await docRef.set({
        name: user.name,
        idade: user.idade,
        email: user.email
      });
  }
  
  async deleteUser(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

}