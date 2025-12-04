
import { Company } from './../models/company.model';
import { CollectionReference, getFirestore } from "firebase-admin/firestore";


export class CompanyRepository {

  private collection = {} as CollectionReference;

  constructor() {
    this.collection = getFirestore().collection('companies');
  }

  async getAll(): Promise<Company[]> {
    const snapShot = await this.collection.get();
    return snapShot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    }) as Company[];
  }

  async getById(id: string): Promise<Company | null> {
    const userDoc = await this.collection.doc(id).get();
    if (userDoc.exists) {
      return {
        id: userDoc.id,
        ...userDoc.data()
      } as Company;
    } else {
      return null;
    }
  }

  async save(company: Company): Promise<void> {
    // delete user.password;
    await this.collection.add(company);
  }

  async update( company: Company): Promise<void> {
     let docRef = this.collection.doc(company.id!);
     delete company.id;
      await docRef.set(company);
  }

}