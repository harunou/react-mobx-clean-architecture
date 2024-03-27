import { action, makeObservable } from 'mobx';
import type { ObservableState, Selector } from 'src/@types';
import { OrderByIdSelector } from 'src/modules/orders/selectors';
import type { OrdersAggregate, OrderEntity } from 'src/modules/orders/types';

export class OrderItemController {
    static make(
        ordersStore: OrdersAggregate,
        ordersPropsStore: ObservableState<{ orderId: string; itemId: string }>,
    ): OrderItemController {
        return new OrderItemController(ordersPropsStore, OrderByIdSelector.make(ordersStore));
    }

    constructor(
        private readonly ordersPropsStore: ObservableState<{ orderId: string; itemId: string }>,
        private readonly orderByIdSelector: Selector<[id: string], OrderEntity | undefined>,
    ) {
        makeObservable(this);
    }

    @action.bound
    deleteButtonClicked(): void {
        const order = this.orderByIdSelector.select(this.ordersPropsStore.value.orderId);
        order?.items.remove(this.ordersPropsStore.value.itemId);
    }
}
