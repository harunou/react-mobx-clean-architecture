import type { Selector, UseCase } from 'src/@types';
import { OrderByIdSelector } from '../../selectors';
import type { OrdersAggregate, OrderEntity, OrdersGateway } from '../../types';

export type OrdersGatewayDep = Pick<OrdersGateway, 'deleteItem'>;
export type OrderByIdSelectorDep = Selector<[id: string], OrderEntity | undefined>;

export class DeleteItemByIdUseCase implements UseCase<[orderId: string, itemId: string]> {
    static make(ordersStore: OrdersAggregate): UseCase<[orderId: string, itemId: string]> {
        return new DeleteItemByIdUseCase(
            OrderByIdSelector.make(ordersStore),
            ordersStore.ordersGateway,
        );
    }

    constructor(
        private readonly orderByIdSelector: OrderByIdSelectorDep,
        private readonly ordersGateway: OrdersGatewayDep,
    ) {}

    async execute(orderId: string, itemId: string): Promise<void> {
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
