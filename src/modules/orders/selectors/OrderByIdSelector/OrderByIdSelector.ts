import type { Selector } from 'src/@types';
import type { OrdersAggregate, OrderEntity, OrderEntityCollection } from '../../types';

type OrderEntityCollectionDep = Pick<OrderEntityCollection, 'get'>;

export class OrderByIdSelector implements Selector<[id: string], OrderEntity | undefined> {
    static make(ordersStore: OrdersAggregate): Selector<[id: string], OrderEntity | undefined> {
        return new OrderByIdSelector(ordersStore.orderModelCollection);
    }

    constructor(private readonly orderModelCollection: OrderEntityCollectionDep) {}

    select(id: string): OrderEntity | undefined {
        return this.orderModelCollection.get(id);
    }
}
