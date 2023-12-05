import { HybridOrdersGateway, RemoteServiceGateway } from '../gateways';
import { OrderModelCollection, OrdersCancelEffects, OrdersPresentationModel } from '../models';
import type {
    AbstractOrdersStore,
    AbstractOrdersStoreDto,
    OrderEntityCollection,
    OrdersGateway,
    OrdersGatewayRuntimeSwitch,
    OrdersPresentationEntity,
    ServiceGateway,
} from '../types';

export class OrdersStore implements AbstractOrdersStore {
    static make(): AbstractOrdersStore {
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

    get dto(): AbstractOrdersStoreDto {
        return {
            orderEntityCollectionDto: this.orderEntityCollection.entities.map(
                (entity) => entity.dto,
            ),
            ordersPresentationEntityDto: this.ordersPresentationEntity.dto,
        };
    }

    setData(data: AbstractOrdersStoreDto): void {
        this.orderEntityCollection.replaceAllFromDto(data.orderEntityCollectionDto);
        this.ordersPresentationEntity.setData(data.ordersPresentationEntityDto);
    }

    patchData(data: Partial<AbstractOrdersStoreDto>): void {
        if (data.hasOwnProperty('orderEntityCollectionDto')) {
            this.orderEntityCollection.replaceAllFromDto(data.orderEntityCollectionDto);
        }
        if (data.hasOwnProperty('ordersPresentationEntityDto')) {
            this.ordersPresentationEntity.patchData(data.ordersPresentationEntityDto);
        }
    }
}
