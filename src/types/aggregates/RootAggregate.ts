import type { Entity } from 'src/@types';
import type { OrdersAggregate, OrdersAggregateDto } from 'src/modules/orders/types';

export interface RootAggregateDto {
    ordersStoreDto: OrdersAggregateDto | undefined;
}

export interface RootAggregate extends Entity<RootAggregateDto> {
    ordersStore: OrdersAggregate | undefined;
    setOrdersStore(orderStore: OrdersAggregate | undefined): void;
}
