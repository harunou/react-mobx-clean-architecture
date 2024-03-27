import type { Selector } from 'src/@types';
import type { OrdersAggregate, OrderEntityCollection } from '../../types';

export class TotalOrderItemQuantitySelectorNotOptimized implements Selector<[], number> {
    static make(ordersStore: OrdersAggregate): Selector<[], number> {
        return new TotalOrderItemQuantitySelectorNotOptimized(ordersStore.orderModelCollection);
    }

    calculations: { select: number } = {
        select: 0,
    };

    constructor(private readonly orderEntityCollection: OrderEntityCollection) {}

    select(): number {
        this.calculations.select += 1;
        return this.orderEntityCollection.entities
            .flatMap((order) => order.items.entities)
            .reduce((total, item) => total + item.quantity, 0);
    }
}
