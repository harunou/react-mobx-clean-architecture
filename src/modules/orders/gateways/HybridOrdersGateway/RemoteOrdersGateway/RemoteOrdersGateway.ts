import type { EffectParams } from 'src/@types';
import { OrdersApi } from 'src/modules/orders/api';
import type { OrderEntityDto, OrdersGateway } from 'src/modules/orders/types';
import { toCancellablePromise } from 'src/utils';
import type {
    OrderDtoToOrderModelDtoMapper,
    OrderModelDtoToOrderDtoMapper,
} from './RemoteOrdersGateway.types';
import {
    makeOrderDtoToOrderModelDtoMapper,
    makeOrderModelDtoToOrderDtoMapper,
} from './RemoteOrdersGateway.utils';

export class RemoteOrdersGateway implements OrdersGateway {
    static make(): RemoteOrdersGateway {
        const ordersApi = OrdersApi.make();
        return new RemoteOrdersGateway(
            ordersApi,
            makeOrderDtoToOrderModelDtoMapper(),
            makeOrderModelDtoToOrderDtoMapper(),
        );
    }

    constructor(
        private orderApi: OrdersApi,
        private mapOrderDtoToOrderModelDto: OrderDtoToOrderModelDtoMapper,
        private mapOrderModelDtoToOrderDto: OrderModelDtoToOrderDtoMapper,
    ) {}

    async fetchOrders(params: EffectParams = {}): Promise<OrderEntityDto[]> {
        const ordersDto = await toCancellablePromise(() => this.orderApi.fetchOrders())(params);
        return ordersDto.map((dto) => this.mapOrderDtoToOrderModelDto(dto));
    }

    async updateOrder(orderDto: OrderEntityDto): Promise<OrderEntityDto> {
        const dto = await this.orderApi.updateOrder(this.mapOrderModelDtoToOrderDto(orderDto));
        return this.mapOrderDtoToOrderModelDto(dto);
    }

    async deleteOrder(id: OrderEntityDto['id']): Promise<void> {
        return this.orderApi.deleteOrder(id);
    }

    async deleteItem(orderId: OrderEntityDto['id'], itemId: OrderEntityDto['id']): Promise<void> {
        return this.orderApi.deleteItem(orderId, itemId);
    }
}
