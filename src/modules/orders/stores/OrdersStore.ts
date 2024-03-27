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
        public orderModelCollection: OrderEntityCollection,
        public ordersPresentationModel: OrdersPresentationEntity,
        public ordersGateway: OrdersGateway & OrdersGatewayRuntimeSwitch,
        public serviceGateway: ServiceGateway,
        public ordersCancelEffects: OrdersCancelEffects,
    ) {}

    get dto(): OrdersAggregateDto {
        return {
            orderModelCollectionDto: this.orderModelCollection.entities.map((entity) => entity.dto),
            ordersPresentationModelDto: this.ordersPresentationModel.dto,
        };
    }

    setData(dto: OrdersAggregateDto): void {
        this.orderModelCollection.replaceAllFromDto(dto.orderModelCollectionDto);
        this.ordersPresentationModel.setData(dto.ordersPresentationModelDto);
    }

    patchData(dto: Partial<OrdersAggregateDto>): void {
        if (dto.hasOwnProperty('orderModelCollectionDto')) {
            this.orderModelCollection.replaceAllFromDto(dto.orderModelCollectionDto);
        }
        if (dto.hasOwnProperty('ordersPresentationModelDto')) {
            this.ordersPresentationModel.patchData(dto.ordersPresentationModelDto);
        }
    }
}
