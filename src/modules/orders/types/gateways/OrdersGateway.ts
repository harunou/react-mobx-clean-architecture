import type { EffectParams } from 'src/@types';
import type { OrderEntityDto, OrderItemEntityDto } from '../entities';

export interface OrdersGateway {
    fetchOrders(params?: EffectParams): Promise<OrderEntityDto[]>;
    updateOrder(order: OrderEntityDto): Promise<OrderEntityDto>;
    deleteOrder(id: OrderEntityDto['id']): Promise<void>;
    deleteItem(orderId: OrderEntityDto['id'], itemId: OrderItemEntityDto['id']): Promise<void>;
}

export interface OrdersGatewayRuntimeSwitch {
    useRemoteGateway(): void;
    useLocalGateway(): void;
}
