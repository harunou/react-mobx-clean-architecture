import { computed, makeObservable } from 'mobx';
import type { ObservableState, Selector } from 'src/@types';
import { OrderByIdSelector } from 'src/modules/orders/selectors';
import type { OrdersAggregate, OrderEntity, OrderItemEntity } from 'src/modules/orders/types';

export class OrderItemPresenter {
    static make(
        ordersStore: OrdersAggregate,
        orderIdStore: ObservableState<string>,
        itemIdStore: ObservableState<string>,
    ): OrderItemPresenter {
        return new OrderItemPresenter(
            orderIdStore,
            itemIdStore,
            OrderByIdSelector.make(ordersStore),
        );
    }

    constructor(
        private readonly orderIdStore: ObservableState<string>,
        private readonly itemIdStore: ObservableState<string>,
        private readonly orderByIdSelector: Selector<[id: string], OrderEntity | undefined>,
    ) {
        makeObservable(this);
    }

    @computed
    get itemId(): string {
        return this.item?.id ?? '';
    }

    @computed
    get productId(): string {
        return this.item?.productId ?? '';
    }

    @computed
    get productQuantity(): number {
        return this.item?.quantity ?? 0;
    }

    @computed
    get item(): OrderItemEntity | undefined {
        const order = this.orderByIdSelector.select(this.orderIdStore.value);
        return order?.items.get(this.itemIdStore.value);
    }
}
