import { HybridOrdersGateway, RemoteServiceGateway } from '../gateways';
import { OrderModelCollection, OrdersCancelEffects, OrdersPresentationModel } from '../models';
import type {
    OrdersAggregate,
    OrdersAggregateDto,
    OrderEntityCollection,
    OrdersGateway,
    OrdersGatewayRuntimeSwitch,
    OrdersPresentationEntity,
    ServiceGateway,
} from '../types';

export class OrdersStore implements OrdersAggregate {
    static make(): OrdersAggregate {
        return new OrdersStore(
            OrderModelCollection.make(),
            OrdersPresentationModel.make(),
            HybridOrdersGateway.make(),
            RemoteServiceGateway.make(),
            OrdersCancelEffects.make(),
        );
    }
    constructor(
        public orderEntityCollection: OrderEntityCollection,
        public ordersPresentationEntity: OrdersPresentationEntity,
        public ordersGateway: OrdersGateway & OrdersGatewayRuntimeSwitch,
        public serviceGateway: ServiceGateway,
        public ordersCancelEffects: OrdersCancelEffects,
    ) {}

    get dto(): OrdersAggregateDto {
        return {
            orderEntityCollectionDto: this.orderEntityCollection.entities.map(
                (entity) => entity.dto,
            ),
            ordersPresentationEntityDto: this.ordersPresentationEntity.dto,
        };
    }

    setData(data: OrdersAggregateDto): void {
        this.orderEntityCollection.replaceAllFromDto(data.orderEntityCollectionDto);
        this.ordersPresentationEntity.setData(data.ordersPresentationEntityDto);
    }

    patchData(data: Partial<OrdersAggregateDto>): void {
        if (data.hasOwnProperty('orderEntityCollectionDto')) {
            this.orderEntityCollection.replaceAllFromDto(data.orderEntityCollectionDto);
        }
        if (data.hasOwnProperty('ordersPresentationEntityDto')) {
            this.ordersPresentationEntity.patchData(data.ordersPresentationEntityDto);
        }
    }
}
