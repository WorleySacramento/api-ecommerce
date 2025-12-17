
import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { paymentConverter, PaymentMethod } from '../models/payments.model';


export class PaymentMethodRepository {

  private collection: CollectionReference<PaymentMethod>;

  constructor() {
    this.collection = getFirestore()
    .collection('payment-methods')
    .withConverter( paymentConverter);
  }

  async getAll(): Promise<PaymentMethod[]> {
    const snapShot = await this.collection.get();
    return snapShot.docs.map(doc => doc.data());
  }

  async getById(id: string): Promise<PaymentMethod | null> {
    const doc = await this.collection.doc(id).get();
    return doc.data() ?? null;
  }

  async save(paymentMethod: PaymentMethod){
    await this.collection.add(paymentMethod);
  }

  async update( paymentMethod: PaymentMethod){
     await this.collection.doc(paymentMethod.id!).set(paymentMethod);
  }

  async delete(id: string){
    await this.collection.doc(id).delete();
  }

}