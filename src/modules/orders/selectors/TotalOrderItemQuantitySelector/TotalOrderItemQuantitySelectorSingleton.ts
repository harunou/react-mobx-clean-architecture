import { computed, makeObservable } from 'mobx';
import type { Selector } from 'src/@types';
import type { AbstractOrdersStore, OrderEntityCollection } from '../../types';

export class TotalOrderItemQuantitySelectorSingleton implements Selector<[], number> {
    private static instance: TotalOrderItemQuantitySelectorSingleton | undefined;
    static make(ordersStore: AbstractOrdersStore): Selector<[], number> {
        if (!TotalOrderItemQuantitySelectorSingleton.instance) {
            TotalOrderItemQuantitySelectorSingleton.instance =
                new TotalOrderItemQuantitySelectorSingleton(ordersStore.orderEntityCollection);
        }
        return TotalOrderItemQuantitySelectorSingleton.instance;
    }

    constructor(private readonly orderEntityCollection: OrderEntityCollection) {
        makeObservable(this);
    }

    @computed
    get totalQuantity(): number {
        return this.orderEntityCollection.entities
            .flatMap((order) => order.items.entities)
            .reduce((total, item) => total + item.quantity, 0);
    }

    select(): number {
        return this.totalQuantity;
    }
}
