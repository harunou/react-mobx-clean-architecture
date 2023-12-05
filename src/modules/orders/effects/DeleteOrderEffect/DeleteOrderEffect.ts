import type { Effect, EffectParams } from 'src/@types';
import type { OrdersGateway, AbstractOrdersStore } from '../../types';

type OrdersGatewayDep = Pick<OrdersGateway, 'deleteOrder'>;

export class DeleteOrderEffect implements Effect<[string, EffectParams]> {
    static make(ordersStore: AbstractOrdersStore): DeleteOrderEffect {
        return new DeleteOrderEffect(ordersStore.ordersGateway);
    }

    constructor(private readonly ordersGateway: OrdersGatewayDep) {}

    async run(id: string): Promise<void> {
        await this.ordersGateway.deleteOrder(id);
    }
}
