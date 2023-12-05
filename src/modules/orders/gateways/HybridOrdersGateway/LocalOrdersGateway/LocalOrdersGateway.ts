import type { EffectParams } from 'src/@types';
import { orderDtoFactory } from 'src/modules/orders/models/OrderModel/OrderModel.factory';
import type { OrderEntity, OrderEntityDto, OrdersGateway } from 'src/modules/orders/types';
import { toCancellablePromise } from 'src/utils';
import { sleep } from 'src/utils/testing';

export class LocalOrdersGateway implements OrdersGateway {
    static make(): LocalOrdersGateway {
        const fakeOrders = orderDtoFactory.list({ count: 5 });
        return new LocalOrdersGateway(fakeOrders);
    }

    constructor(private orders: OrderEntityDto[] = []) {}

    async fetchOrders(params: EffectParams = {}): Promise<OrderEntityDto[]> {
        await sleep(1000);
        const cancellableRequest = toCancellablePromise(() => Promise.resolve(this.orders));
        return cancellableRequest(params);
    }

    async updateOrder(order: OrderEntity): Promise<OrderEntityDto> {
        await sleep(3000);
        const orderDto = order.dto;
        const currentOrder = this.orders.find(({ id }) => id === orderDto.userId);
        if (!currentOrder) {
            throw new Error('Orders: order was not found');
        }

        Object.assign(currentOrder, order);
        return Promise.resolve(currentOrder);
    }

    async deleteOrder(id: OrderEntity['id']): Promise<void> {
        await sleep(1700);
        const index = this.orders.findIndex((order) => order.id === id);

        if (index === -1) {
            throw new Error('Orders: order was not found');
        }
        this.orders.splice(index, 1);
        return Promise.resolve();
    }

    async deleteItem(orderId: OrderEntity['id'], itemId: OrderEntity['id']): Promise<void> {
        await sleep(1700);
        const order = this.orders.find((order) => order.id === orderId);

        if (!order) {
            throw new Error('Orders: order was not found');
        }

        const itemIndex = order.items.findIndex((item) => item.id === itemId);

        if (itemIndex === -1) {
            throw new Error('Orders: item was not found');
        }

        order.items.splice(itemIndex, 1);
        return Promise.resolve();
    }
}
