import type { EffectParams } from 'src/@types';
import type {
    OrderEntity,
    OrderEntityDto,
    OrdersGateway,
    OrdersGatewayRuntimeSwitch,
} from '../../types';
import { LocalOrdersGateway } from './LocalOrdersGateway';
import { RemoteOrdersGateway } from './RemoteOrdersGateway';

export class HybridOrdersGateway implements OrdersGateway, OrdersGatewayRuntimeSwitch {
    static make(): OrdersGateway & OrdersGatewayRuntimeSwitch {
        const remoteGateway = RemoteOrdersGateway.make();
        const localGateway = LocalOrdersGateway.make();
        return new HybridOrdersGateway(remoteGateway, localGateway);
    }

    private gateway: OrdersGateway;

    constructor(
        private remoteGateway: OrdersGateway,
        private localGateway: OrdersGateway,
    ) {
        this.gateway = this.localGateway;
    }

    useRemoteGateway(): void {
        this.gateway = this.remoteGateway;
    }

    useLocalGateway(): void {
        this.gateway = this.localGateway;
    }

    async fetchOrders(params?: EffectParams): Promise<OrderEntityDto[]> {
        return this.gateway.fetchOrders(params);
    }

    async updateOrder(order: OrderEntity): Promise<OrderEntityDto> {
        return this.gateway.updateOrder(order);
    }

    async deleteOrder(id: OrderEntity['id']): Promise<void> {
        return this.gateway.deleteOrder(id);
    }

    async deleteItem(orderId: OrderEntity['id'], itemId: OrderEntity['id']): Promise<void> {
        return this.gateway.deleteItem(orderId, itemId);
    }
}
