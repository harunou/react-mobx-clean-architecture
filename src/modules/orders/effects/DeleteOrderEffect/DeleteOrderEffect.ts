import type { Effect } from 'src/@types';
import type { OrdersGateway, OrdersAggregate } from '../../types';

export type OrdersGatewayDep = Pick<OrdersGateway, 'deleteOrder'>;

export class DeleteOrderEffect implements Effect<[orderId: string]> {
    static make(ordersStore: OrdersAggregate): Effect<[orderId: string]> {
        return new DeleteOrderEffect(ordersStore.ordersGateway);
    }

    constructor(private readonly ordersGateway: OrdersGatewayDep) {}

    async run(id: string): Promise<void> {
        await this.ordersGateway.deleteOrder(id);
    }
}
