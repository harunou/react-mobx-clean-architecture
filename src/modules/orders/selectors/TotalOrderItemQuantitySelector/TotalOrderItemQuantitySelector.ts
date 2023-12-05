import { computed } from 'mobx';
import type { Selector } from 'src/@types';
import type { AbstractOrdersStore, OrderEntityCollection } from '../../types';

export class TotalOrderItemQuantitySelector implements Selector<[], number> {
    static make(ordersStore: AbstractOrdersStore): Selector<[], number> {
        return new TotalOrderItemQuantitySelector(ordersStore.orderEntityCollection);
    }

    constructor(private readonly orderEntityCollection: OrderEntityCollection) {}

    @computed
    private get totalQuantity(): number {
        return this.orderEntityCollection.entities
            .flatMap((order) => order.items.entities)
            .reduce((total, item) => total + item.quantity, 0);
    }

    select(): number {
        return this.totalQuantity;
    }
}
