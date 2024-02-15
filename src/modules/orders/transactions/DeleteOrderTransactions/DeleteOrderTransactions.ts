import { action } from 'mobx';
import type { Transaction } from 'src/@types';
import type { OrderItemEntityCollection, AbstractOrdersStore } from '../../types';

export type OrderEntityCollectionDep = Pick<OrderItemEntityCollection, 'remove'>;

export class DeleteOrderTransaction implements Transaction<[string]> {
    static make(ordersStore: AbstractOrdersStore): DeleteOrderTransaction {
        return new DeleteOrderTransaction(ordersStore.orderEntityCollection);
    }
    constructor(private orderEntityCollection: OrderEntityCollectionDep) {}

    @action
    commit(id: string): void {
        this.orderEntityCollection.remove(id);
    }
}
