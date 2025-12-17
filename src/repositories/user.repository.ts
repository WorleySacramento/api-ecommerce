import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User, userConverter } from "../models/user.model";

export class UserRepository {

  private collection = {} as CollectionReference<User>;

  constructor() {
    this.collection = getFirestore()
    .collection('users')
    .withConverter( userConverter );
  }

  async getAll(): Promise<User[]> {
    const snapShot = await this.collection.get();
    return snapShot.docs.map(doc => doc.data());
  }

  async getById(id: string): Promise<User | null> {
    const userDoc = await this.collection.doc(id).get();
      return userDoc.data() ?? null;
  }

  async createUser(user: User): Promise<void> {
    await this.collection.add(user);
  }

  async updateUser( user: User): Promise<void> {
     await this.collection.doc(user.id).set(user);
  }
  
  async deleteUser(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

}