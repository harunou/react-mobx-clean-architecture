import type { EffectParams } from 'src/@types';
import { orderEntityDtoFactory } from 'src/modules/orders/models/OrderModel/OrderModel.factory';
import type { OrderEntityDto, OrdersGateway } from 'src/modules/orders/types';
import { toCancellablePromise } from 'src/utils';
import { sleepTimeout } from 'src/utils/testing';

export class LocalOrdersGateway implements OrdersGateway {
    static make(): LocalOrdersGateway {
        const fakeOrders = orderEntityDtoFactory.list({ count: 5 });
        return new LocalOrdersGateway(fakeOrders);
    }

    constructor(private orders: OrderEntityDto[] = []) {}

    async fetchOrders(params: EffectParams = {}): Promise<OrderEntityDto[]> {
        await sleepTimeout(1000);
        const cancellableRequest = toCancellablePromise(() => Promise.resolve(this.orders));
        return cancellableRequest(params);
    }

    async updateOrder(order: OrderEntityDto): Promise<OrderEntityDto> {
        await sleepTimeout(3000);
        const orderDto = order;
        const currentOrder = this.orders.find(({ id }) => id === orderDto.id);
        if (!currentOrder) {
            throw new Error('Orders: order was not found');
        }

        Object.assign(currentOrder, order);
        return Promise.resolve(currentOrder);
    }

    async deleteOrder(id: OrderEntityDto['id']): Promise<void> {
        await sleepTimeout(1700);
        const index = this.orders.findIndex((order) => order.id === id);

        if (index === -1) {
            throw new Error('Orders: order was not found');
        }
        this.orders.splice(index, 1);
        return Promise.resolve();
    }

    async deleteItem(orderId: OrderEntityDto['id'], itemId: OrderEntityDto['id']): Promise<void> {
        await sleepTimeout(1700);
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
