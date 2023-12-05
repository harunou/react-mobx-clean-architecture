import type {
    OrderEntityCollection,
    OrderEntityDto,
    OrdersPresentationEntity,
    OrdersPresentationEntityDto,
} from '../entities';
import type { OrdersGateway, OrdersGatewayRuntimeSwitch, ServiceGateway } from '../gateways';
import type { AbstractOrdersCancelEffects } from '../AbstractOrdersCancelEffects';
import type { Entity } from 'src/@types';

export interface AbstractOrdersStoreDto {
    orderEntityCollectionDto: OrderEntityDto[];
    ordersPresentationEntityDto: OrdersPresentationEntityDto;
}

export interface AbstractOrdersStore extends Entity<AbstractOrdersStoreDto> {
    orderEntityCollection: OrderEntityCollection;
    ordersPresentationEntity: OrdersPresentationEntity;
    ordersGateway: OrdersGateway & OrdersGatewayRuntimeSwitch;
    serviceGateway: ServiceGateway;
    ordersCancelEffects: AbstractOrdersCancelEffects;
}
