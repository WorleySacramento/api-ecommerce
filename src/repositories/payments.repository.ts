
import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { PaymentMethod } from '../models/payments.model';


export class PaymentMethodRepository {

  private collection: CollectionReference;

  constructor() {
    this.collection = getFirestore().collection('payment-methods');
  }

  async getAll(): Promise<PaymentMethod[]> {
    const snapShot = await this.collection.get();
    return snapShot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    }) as PaymentMethod[];
  }

  async getById(id: string): Promise<PaymentMethod | null> {
    const userDoc = await this.collection.doc(id).get();
    if (userDoc.exists) {
      return {
        id: userDoc.id,
        ...userDoc.data()
      } as PaymentMethod;
    } else {
      return null;
    }
  }

  async save(paymentMethod: PaymentMethod){
    await this.collection.add(paymentMethod);
  }

  async update( paymentMethod: PaymentMethod){
     let docRef = this.collection.doc(paymentMethod.id!);
     
      await docRef.set({
        descricao: paymentMethod.descricao,
        ativa: paymentMethod.ativa
      });
  }

  async delete(id: string){
    await this.collection.doc(id).delete();
  }

}