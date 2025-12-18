
import { Company, companyConverter } from '../models/company.model';
import { CollectionReference, getFirestore } from "firebase-admin/firestore";


export class CompanyRepository {

  private collection = {} as CollectionReference<Company>;

  constructor() {
    this.collection = getFirestore()
      .collection('companies')
      .withConverter(companyConverter);
  }

  async getAll(): Promise<Company[]> {
    const snapShot = await this.collection.get();
    return snapShot.docs.map(doc => doc.data());
  }

  async getById(id: string): Promise<Company | null> {
    const userDoc = await this.collection.doc(id).get();  
      return userDoc.data() ?? null;

  }

  async save(company: Company): Promise<void> {
    await this.collection.add(company);
  }

  async update(company: Company) {
    await this.collection.doc(company.id).set(company);
  }

}