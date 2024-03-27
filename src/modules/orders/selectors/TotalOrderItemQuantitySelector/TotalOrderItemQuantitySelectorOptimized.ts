import { computed, makeObservable } from 'mobx';
import type { Selector } from 'src/@types';
import type { OrdersAggregate, OrderEntityCollection } from '../../types';

export class TotalOrderItemQuantitySelectorOptimized implements Selector<[], number> {
    static make(ordersStore: OrdersAggregate): Selector<[], number> {
        return new TotalOrderItemQuantitySelectorOptimized(ordersStore.orderModelCollection);
    }

    calculations: { totalQuantity: number; select: number } = {
        select: 0,
        totalQuantity: 0,
    };

    constructor(private readonly orderModelCollection: OrderEntityCollection) {
        makeObservable(this);
    }

    @computed
    get totalQuantity(): number {
        this.calculations.totalQuantity += 1;
        return this.orderModelCollection.models
            .flatMap((order) => order.items.models)
            .reduce((total, item) => total + item.quantity, 0);
    }

    select(): number {
        this.calculations.select += 1;
        return this.totalQuantity;
    }
}
