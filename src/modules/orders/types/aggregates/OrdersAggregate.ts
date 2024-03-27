import type {
    OrderEntityCollection,
    OrderEntityDto,
    OrdersPresentationEntity,
    OrdersPresentationEntityDto,
} from '../entities';
import type { OrdersGateway, OrdersGatewayRuntimeSwitch, ServiceGateway } from '../gateways';
import type { AbstractOrdersCancelEffects } from '../AbstractOrdersCancelEffects';
import type { Entity } from 'src/@types';

export interface OrdersAggregateDto {
    orderEntityCollectionDto: OrderEntityDto[];
    ordersPresentationEntityDto: OrdersPresentationEntityDto;
}

export interface OrdersAggregate extends Entity<OrdersAggregateDto> {
    orderEntityCollection: OrderEntityCollection;
    ordersPresentationEntity: OrdersPresentationEntity;
    ordersGateway: OrdersGateway & OrdersGatewayRuntimeSwitch;
    serviceGateway: ServiceGateway;
    ordersCancelEffects: AbstractOrdersCancelEffects;
}
