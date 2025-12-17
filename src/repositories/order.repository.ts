import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order, orderConverter, QueryParamsOrder } from "../models/order.model.js";
import { OrderItem, orderItemConverter } from "../models/order-item.model.js";
import dayjs from "dayjs";

export class OrderRepository {

    private collection: CollectionReference<Order>;

    constructor() {
        this.collection = getFirestore()
            .collection('orders')
            .withConverter(orderConverter);
    }

    async save(order: Order) {

        const batch = getFirestore().batch();

        //Cabeçalho do pedido
        const orderRef = this.collection.doc();
        batch.create(orderRef, order);

        //Itens do pedido
        const itensRef = orderRef
            .collection('itens')
            .withConverter(orderItemConverter);
        for (let item of order.itens) {
            batch.create(itensRef.doc(), item);
        }


        await batch.commit();

        //    const orderRef = await this.collection.add(order);
        //     for(let item of order.itens){
        //       await  orderRef
        //       .collection('itens')
        //       .withConverter( orderItemConverter )
        //       .add(item);
        //     }
    }

    async search(queryParams: QueryParamsOrder): Promise<Order[]> {
        let query: FirebaseFirestore.Query<Order> = this.collection;

        if (queryParams.empresaId) {
            query = query.where("empresa.id", "==", queryParams.empresaId);
        }

        if (queryParams.dataInicio) {
            queryParams.dataInicio = dayjs(queryParams.dataInicio).add(1, "day").startOf("day").toDate();
            query = query.where("data", ">=", queryParams.dataInicio);
        }

        if (queryParams.dataFim) {
            queryParams.dataFim = dayjs(queryParams.dataFim).add(1, "day").endOf("day").toDate();
            query = query.where("data", "<=", queryParams.dataFim);
        }

        if (queryParams.status) {
            query = query.where("status", "==", queryParams.status);
        }

        const snapshot = await query.get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getItems(pedidoId: string): Promise<OrderItem[]> {
        const pedidoRef = this.collection.doc(pedidoId);
        const snapshot = await pedidoRef
            .collection('itens')
            .withConverter(orderItemConverter)
            .get();
        return snapshot.docs.map(doc => doc.data());

    }



}