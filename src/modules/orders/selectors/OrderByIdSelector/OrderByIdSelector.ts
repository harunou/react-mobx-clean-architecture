import type { Selector } from 'src/@types';
import type { OrdersAggregate, OrderEntity, OrderEntityCollection } from '../../types';

type OrderEntityCollectionDep = Pick<OrderEntityCollection, 'get'>;

export class OrderByIdSelector implements Selector<[id: string], OrderEntity | undefined> {
    static make(ordersStore: OrdersAggregate): Selector<[id: string], OrderEntity | undefined> {
        return new OrderByIdSelector(ordersStore.orderEntityCollection);
    }

    constructor(private readonly orderEntityCollection: OrderEntityCollectionDep) {}

    select(id: string): OrderEntity | undefined {
        return this.orderEntityCollection.get(id);
    }
}
