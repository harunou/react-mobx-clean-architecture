import { OrdersSnapshotDto, ServiceApi } from '../../api';
import type { OrderEntity, ServiceGateway } from '../../types';
import { RemoteServiceGatewayStub } from './RemoteServiceGatewayStub';

type ServiceApiDep = Pick<ServiceApi, 'logOrdersSnapshot'>;
type OrderModelsToOrdersSnapshotDtoMapper = (orders: OrderEntity[]) => OrdersSnapshotDto;

export class RemoteServiceGateway implements ServiceGateway {
    static make(): ServiceGateway {
        if (process.env.NODE_ENV !== 'production') {
            return RemoteServiceGatewayStub.make();
        }
        const serviceApi = ServiceApi.make();
        return new RemoteServiceGateway(serviceApi, mapOrdersDtoToOrdersSnapshotDto);
    }

    constructor(
        private serviceApi: ServiceApiDep,
        private mapOrdersDtoToOrdersSnapshotDto: OrderModelsToOrdersSnapshotDtoMapper,
    ) {}

    async logOrders(orders: OrderEntity[]): Promise<void> {
        const payload = this.mapOrdersDtoToOrdersSnapshotDto(orders);
        try {
            await this.serviceApi.logOrdersSnapshot(payload);
        } catch (e) {
            // noop
        }
    }
}

export const mapOrdersDtoToOrdersSnapshotDto: OrderModelsToOrdersSnapshotDtoMapper = (
    orders: OrderEntity[],
): OrdersSnapshotDto => {
    return {
        timestamp: Date.now(),
        orders: orders.map((order) => {
            const orderDto = order.dto;
            return {
                id: orderDto.id,
                userId: orderDto.userId,
                entries: orderDto.items.map((orderItemDto) => ({
                    id: orderItemDto.id,
                    productId: orderItemDto.productId,
                    number: orderItemDto.quantity,
                })),
            };
        }),
    };
};
