import { action, makeObservable } from 'mobx';
import type { ObservableState, Selector } from 'src/@types';
import { OrderByIdSelector } from 'src/modules/orders/selectors';
import type { OrdersAggregate, OrderEntity } from 'src/modules/orders/types';

export type OrderIdStoreDep = Pick<ObservableState<string>, 'value'>;
export type ItemIdStoreDep = Pick<ObservableState<string>, 'value'>;
export type OrderByIdSelectorDep = Selector<[id: string], OrderEntity | undefined>;

export class OrderItemController {
    static make(
        ordersStore: OrdersAggregate,
        orderIdStore: ObservableState<string>,
        itemIdStore: ObservableState<string>,
    ): OrderItemController {
        return new OrderItemController(
            orderIdStore,
            itemIdStore,
            OrderByIdSelector.make(ordersStore),
        );
    }

    constructor(
        private readonly orderIdStore: OrderIdStoreDep,
        private readonly itemIdStore: ItemIdStoreDep,
        private readonly orderByIdSelector: OrderByIdSelectorDep,
    ) {
        makeObservable(this);
    }

    @action.bound
    deleteButtonClicked(): void {
        const order = this.orderByIdSelector.select(this.orderIdStore.value);
        order?.items.remove(this.itemIdStore.value);
    }
}
