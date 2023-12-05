import { computed, makeObservable } from 'mobx';
import type { ObservableState, Selector } from 'src/@types';
import { OrderByIdSelector } from 'src/modules/orders/selectors';
import type { AbstractOrdersStore, OrderEntity, OrderItemEntity } from 'src/modules/orders/types';

export class OrderItemPresenter {
    static make(
        ordersStore: AbstractOrdersStore,
        ordersPropsStore: ObservableState<{ orderId: string; itemId: string }>,
    ): OrderItemPresenter {
        return new OrderItemPresenter(ordersPropsStore, OrderByIdSelector.make(ordersStore));
    }

    constructor(
        private readonly ordersPropsStore: ObservableState<{ orderId: string; itemId: string }>,
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
        const order = this.orderByIdSelector.select(this.ordersPropsStore.value.orderId);
        return order?.items.get(this.ordersPropsStore.value.itemId);
    }
}
