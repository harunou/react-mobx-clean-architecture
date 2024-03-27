import { computed, makeObservable } from 'mobx';
import type { ObservableState } from 'src/@types';
import type { OrdersAggregate, OrderEntity, OrderEntityCollection } from 'src/modules/orders/types';

export class OrderPresenter {
    static make(
        ordersStore: OrdersAggregate,
        orderIdStore: ObservableState<string>,
    ): OrderPresenter {
        return new OrderPresenter(ordersStore.orderModelCollection, orderIdStore);
    }

    constructor(
        private readonly ordersEntityCollection: OrderEntityCollection,
        private readonly orderIdStore: ObservableState<string>,
    ) {
        makeObservable(this);
    }

    @computed
    get orderId(): string {
        return this.order?.id ?? '';
    }

    @computed
    get itemIds(): string[] {
        return this.order?.items.entities.map((item) => item.id) ?? [];
    }

    @computed
    get userId(): string {
        return this.order?.userId ?? '';
    }

    @computed
    private get order(): OrderEntity | undefined {
        return this.ordersEntityCollection.get(this.orderIdStore.value);
    }
}
