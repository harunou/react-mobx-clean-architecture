import { computed, makeObservable } from 'mobx';
import type { ObservableState } from 'src/@types';
import type {
    OrdersAggregate,
    OrderEntityCollection,
    OrderItemEntity,
} from 'src/modules/orders/types';

type OrderEntityCollectionDep = Pick<OrderEntityCollection, 'get'>;

export class OrderItemPresenter {
    static make(
        ordersStore: OrdersAggregate,
        orderIdStore: ObservableState<string>,
        itemIdStore: ObservableState<string>,
    ): OrderItemPresenter {
        return new OrderItemPresenter(orderIdStore, itemIdStore, ordersStore.orderModelCollection);
    }

    constructor(
        private readonly orderIdStore: ObservableState<string>,
        private readonly itemIdStore: ObservableState<string>,
        private readonly orderEntityCollection: OrderEntityCollectionDep,
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
        const order = this.orderEntityCollection.get(this.orderIdStore.value);
        return order?.items.get(this.itemIdStore.value);
    }
}
