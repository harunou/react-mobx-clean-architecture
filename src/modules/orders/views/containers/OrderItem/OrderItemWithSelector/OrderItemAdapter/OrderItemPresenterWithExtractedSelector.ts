import { computed, makeObservable } from 'mobx';
import type { ObservableState, Selector } from 'src/@types';
import { ItemByIdSelector } from 'src/modules/orders/selectors';
import type { AbstractOrdersStore, OrderItemEntity } from 'src/modules/orders/types';

export class OrderItemPresenter {
    static make(
        ordersStore: AbstractOrdersStore,
        orderIdStore: ObservableState<string>,
        itemIdStore: ObservableState<string>,
    ): OrderItemPresenter {
        return new OrderItemPresenter(
            orderIdStore,
            itemIdStore,
            ItemByIdSelector.make(ordersStore),
        );
    }

    constructor(
        private readonly orderIdStore: ObservableState<string>,
        private readonly itemIdStore: ObservableState<string>,
        private readonly itemByIdSelector: Selector<
            [orderId: string, itemId: string],
            OrderItemEntity | undefined
        >,
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
        return this.itemByIdSelector.select(this.orderIdStore.value, this.itemIdStore.value);
    }
}
