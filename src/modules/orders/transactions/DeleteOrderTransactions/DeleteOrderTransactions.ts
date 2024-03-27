import { action } from 'mobx';
import type { Transaction } from 'src/@types';
import type { OrderItemEntityCollection, OrdersAggregate } from '../../types';

export type OrderEntityCollectionDep = Pick<OrderItemEntityCollection, 'remove'>;

export class DeleteOrderTransaction implements Transaction<[string]> {
    static make(ordersStore: OrdersAggregate): DeleteOrderTransaction {
        return new DeleteOrderTransaction(ordersStore.orderModelCollection);
    }
    constructor(private orderModelCollection: OrderEntityCollectionDep) {}

    @action
    commit(id: string): void {
        this.orderModelCollection.remove(id);
    }
}
