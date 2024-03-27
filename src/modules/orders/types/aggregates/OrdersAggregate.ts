import type {
    OrderEntityCollection,
    OrderEntityDto,
    OrdersPresentationEntity,
    OrdersPresentationEntityDto,
} from '../entities';
import type { OrdersGateway, OrdersGatewayRuntimeSwitch, ServiceGateway } from '../gateways';
import type { OrdersCancelEffectCollection } from '../OrdersCancelEffectCollection';
import type { Entity } from 'src/@types';

export interface OrdersAggregateDto {
    orderModelCollectionDto: OrderEntityDto[];
    ordersPresentationModelDto: OrdersPresentationEntityDto;
}

export interface OrdersAggregate extends Entity<OrdersAggregateDto> {
    orderModelCollection: OrderEntityCollection;
    ordersPresentationModel: OrdersPresentationEntity;
    ordersGateway: OrdersGateway & OrdersGatewayRuntimeSwitch;
    serviceGateway: ServiceGateway;
    ordersCancelEffects: OrdersCancelEffectCollection;
}
