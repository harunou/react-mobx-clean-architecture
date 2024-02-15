import assert from 'assert';
import { orderEntityDtoFactory } from 'src/modules/orders/models/OrderModel/OrderModel.factory';
import type { OrderEntityDto } from 'src/modules/orders/types';
import { LocalOrdersGateway } from './LocalOrdersGateway';

describe(`${LocalOrdersGateway.name}`, () => {
    let localOrdersGateway: LocalOrdersGateway;
    let orders: OrderEntityDto[];

    beforeEach(() => {
        jest.useFakeTimers();
        orderEntityDtoFactory.resetCount();
        orders = orderEntityDtoFactory.list({ count: 3 });
        localOrdersGateway = new LocalOrdersGateway(orders);
    });
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    describe('fetchOrders', () => {
        it('returns the list of orders', async () => {
            const result = localOrdersGateway.fetchOrders();

            jest.runAllTimers();

            await expect(result).resolves.toEqual(orders);
        });

        it('returns an empty array if no orders are available', async () => {
            localOrdersGateway = new LocalOrdersGateway([]);

            const fetchOrdersPromise = localOrdersGateway.fetchOrders();
            jest.runAllTimers();

            await expect(fetchOrdersPromise).resolves.toEqual([]);
        });
    });

    describe('updateOrder', () => {
        it('updates the order and returns the updated order', async () => {
            const order0 = orders.at(0);
            assert(order0);

            const orderUpdate: OrderEntityDto = { ...order0, userId: '9999' };

            const updateOrderPromise = localOrdersGateway.updateOrder(orderUpdate);
            jest.runAllTimers();

            await expect(updateOrderPromise).resolves.toEqual(orderUpdate);
        });

        it('throws an error if the order does not exist', async () => {
            const nonExistingOrder: OrderEntityDto = {
                id: '9999',
                userId: '9999',
                items: [],
            };
            const updateOrderPromise = localOrdersGateway.updateOrder(nonExistingOrder);
            jest.runAllTimers();

            await expect(updateOrderPromise).rejects.toThrowError('Orders: order was not found');
        });
    });

    describe('deleteOrder', () => {
        it('deletes the order', async () => {
            const order0 = orders.at(0);
            assert(order0);

            const deleteOrderPromise = localOrdersGateway.deleteOrder(order0.id);
            jest.runAllTimers();
            await deleteOrderPromise;

            const fetchOrderPromise = localOrdersGateway.fetchOrders();
            jest.runAllTimers();
            const fetchedOrders = await fetchOrderPromise;

            const result = fetchedOrders.find((order) => order.id === order0.id);

            expect(result).toBeUndefined();
        });

        it('throws an error if the order does not exist', async () => {
            const nonExistingOrderId = '9999';
            const result = localOrdersGateway.deleteOrder(nonExistingOrderId);
            jest.runAllTimers();

            await expect(result).rejects.toThrowError('Orders: order was not found');
        });
    });

    describe('deleteItem', () => {
        it('deletes the item from the order', async () => {
            const order0 = orders.at(0);
            assert(order0);

            const item0 = order0.items.at(0);
            assert(item0);

            const deleteItemPromise = localOrdersGateway.deleteItem(order0.id, item0.id);
            jest.runAllTimers();
            await deleteItemPromise;

            const fetchOrdersPromise = localOrdersGateway.fetchOrders();
            jest.runAllTimers();
            const fetchedOrders = await fetchOrdersPromise;

            const deletedOrder = fetchedOrders.find((order) => order.id === order0.id);
            const result = deletedOrder?.items.find((item) => item.id === item0.id);

            expect(result).toBeUndefined();
        });

        it('throws an error if the order does not exist', async () => {
            const nonExistingOrderId = '9999';
            const itemId = '1';

            const deleteItemPromise = localOrdersGateway.deleteItem(nonExistingOrderId, itemId);
            jest.runAllTimers();

            await expect(deleteItemPromise).rejects.toThrowError('Orders: order was not found');
        });

        it('throws an error if the item does not exist in the order', async () => {
            const order0 = orders.at(0);
            assert(order0);

            const nonExistingItemId = '9999';

            const deleteItemPromise = localOrdersGateway.deleteItem(order0.id, nonExistingItemId);
            jest.runAllTimers();

            await expect(deleteItemPromise).rejects.toThrowError('Orders: item was not found');
        });
    });
});
