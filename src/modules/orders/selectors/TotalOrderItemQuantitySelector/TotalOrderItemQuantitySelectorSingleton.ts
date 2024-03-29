import { computed, makeObservable } from 'mobx';
import type { Selector } from 'src/@types';
import type { OrdersAggregate, OrderEntityCollection } from '../../types';

export class TotalOrderItemQuantitySelectorSingleton implements Selector<[], number> {
    private static instance: TotalOrderItemQuantitySelectorSingleton | undefined;
    static make(ordersStore: OrdersAggregate): Selector<[], number> {
        if (!TotalOrderItemQuantitySelectorSingleton.instance) {
            TotalOrderItemQuantitySelectorSingleton.instance =
                new TotalOrderItemQuantitySelectorSingleton(ordersStore.orderModelCollection);
        }
        return TotalOrderItemQuantitySelectorSingleton.instance;
    }

    constructor(private readonly orderModelCollection: OrderEntityCollection) {
        makeObservable(this);
    }

    @computed
    get totalQuantity(): number {
        return this.orderModelCollection.models
            .flatMap((order) => order.items.models)
            .reduce((total, item) => total + item.quantity, 0);
    }

    select(): number {
        return this.totalQuantity;
    }
}
