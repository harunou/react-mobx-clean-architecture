import type { EffectParams } from 'src/@types';
import { OrdersApi } from 'src/modules/orders/api';
import type { OrderEntity, OrderEntityDto, OrdersGateway } from 'src/modules/orders/types';
import { toCancellablePromise } from 'src/utils';
import type {
    OrderDtoToOrderEntityDtoMapper,
    OrderEntityDtoToOrderDtoMapper,
} from './RemoteOrdersGateway.types';
import {
    makeOrderDtoToOrderEntityDtoMapper,
    makeOrderEntityDtoToOrderDtoMapper,
} from './RemoteOrdersGateway.utils';

export class RemoteOrdersGateway implements OrdersGateway {
    static make(): RemoteOrdersGateway {
        const ordersApi = OrdersApi.make();
        return new RemoteOrdersGateway(
            ordersApi,
            makeOrderDtoToOrderEntityDtoMapper(),
            makeOrderEntityDtoToOrderDtoMapper(),
        );
    }

    constructor(
        private orderApi: OrdersApi,
        private mapOrderDtoToOrderEntityDto: OrderDtoToOrderEntityDtoMapper,
        private mapOrderEntityDtoToOrderDto: OrderEntityDtoToOrderDtoMapper,
    ) {}

    async fetchOrders(params: EffectParams = {}): Promise<OrderEntityDto[]> {
        const ordersDto = await toCancellablePromise(() => this.orderApi.fetchOrders())(params);
        return ordersDto.map((dto) => this.mapOrderDtoToOrderEntityDto(dto));
    }

    async updateOrder(order: OrderEntity): Promise<OrderEntityDto> {
        const entity = await this.orderApi.updateOrder(this.mapOrderEntityDtoToOrderDto(order.dto));
        return this.mapOrderDtoToOrderEntityDto(entity);
    }

    async deleteOrder(id: OrderEntityDto['id']): Promise<void> {
        return this.orderApi.deleteOrder(id);
    }

    async deleteItem(orderId: OrderEntityDto['id'], itemId: OrderEntityDto['id']): Promise<void> {
        return this.orderApi.deleteItem(orderId, itemId);
    }
}
