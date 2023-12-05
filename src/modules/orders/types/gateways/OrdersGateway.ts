import type { EffectParams } from 'src/@types';
import type { OrderEntity, OrderEntityDto, OrderItemEntity } from '../entities';

export interface OrdersGateway {
    fetchOrders(params?: EffectParams): Promise<OrderEntityDto[]>;
    updateOrder(order: OrderEntity): Promise<OrderEntityDto>;
    deleteOrder(id: OrderEntity['id']): Promise<void>;
    deleteItem(orderId: OrderEntity['id'], itemId: OrderItemEntity['id']): Promise<void>;
}

export interface OrdersGatewayRuntimeSwitch {
    useRemoteGateway(): void;
    useLocalGateway(): void;
}
