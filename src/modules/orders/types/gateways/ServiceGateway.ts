import type { OrderEntity } from '../entities';

export interface ServiceGateway {
    logOrders(orders: OrderEntity[]): Promise<void>;
}
