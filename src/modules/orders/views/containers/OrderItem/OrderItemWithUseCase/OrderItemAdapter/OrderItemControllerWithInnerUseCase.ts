import { action, makeObservable } from 'mobx';
import type { ObservableState, Selector } from 'src/@types';
import { OrderByIdSelector } from 'src/modules/orders/selectors';
import type { AbstractOrdersStore, OrderEntity, OrdersGateway } from 'src/modules/orders/types';

type OrdersGatewayDep = Pick<OrdersGateway, 'deleteItem'>;

export class OrderItemController {
    static make(
        ordersStore: AbstractOrdersStore,
        orderIdStore: ObservableState<string>,
        itemIdStore: ObservableState<string>,
    ): OrderItemController {
        return new OrderItemController(
            orderIdStore,
            itemIdStore,
            OrderByIdSelector.make(ordersStore),
            ordersStore.ordersGateway,
        );
    }

    constructor(
        private readonly orderIdStore: ObservableState<string>,
        private readonly itemIdStore: ObservableState<string>,
        private readonly orderByIdSelector: Selector<[id: string], OrderEntity | undefined>,
        private readonly ordersGateway: OrdersGatewayDep,
    ) {
        makeObservable(this);
    }

    @action.bound
    deleteButtonClicked(): void {
        void this.deleteItemByIdUseCase(this.orderIdStore.value, this.itemIdStore.value);
    }

    private async deleteItemByIdUseCase(orderId: string, itemId: string): Promise<void> {
        const order = this.orderByIdSelector.select(orderId);
        const item = order?.items.get(itemId);
        if (!order || !item) {
            return;
        }
        try {
            await this.ordersGateway.deleteItem(orderId, itemId);
            order.items.remove(itemId);
        } catch (error: unknown) {
            void error;
        }
    }
}
