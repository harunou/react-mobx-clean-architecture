import type { Selector, UseCase } from 'src/@types';
import { OrderByIdSelector } from '../../selectors';
import type { OrdersAggregate, OrderEntity, OrdersGateway } from '../../types';

type OrdersGatewayDep = Pick<OrdersGateway, 'deleteItem'>;

export class DeleteItemByIdUseCase implements UseCase<[orderId: string, itemId: string]> {
    static make(ordersStore: OrdersAggregate): UseCase<[orderId: string, itemId: string]> {
        return new DeleteItemByIdUseCase(
            OrderByIdSelector.make(ordersStore),
            ordersStore.ordersGateway,
        );
    }

    constructor(
        private readonly orderByIdSelector: Selector<[id: string], OrderEntity | undefined>,
        private readonly ordersGateway: OrdersGatewayDep,
    ) {}

    async execute(orderId: string, itemId: string): Promise<void> {
        const order = this.orderByIdSelector.select(orderId);
        const item = order?.items.get(itemId);
        if (!order || !item) {
            return;
        }
        try {
            await this.deleteItemByIdEffect(orderId, itemId);
            this.successTransaction(orderId, itemId);
        } catch (error: unknown) {
            void error;
        }
    }

    private async deleteItemByIdEffect(orderId: string, itemId: string): Promise<void> {
        await this.ordersGateway.deleteItem(orderId, itemId);
    }

    private successTransaction(orderId: string, itemId: string): void {
        const order = this.orderByIdSelector.select(orderId);
        order?.items.remove(itemId);
    }
}
