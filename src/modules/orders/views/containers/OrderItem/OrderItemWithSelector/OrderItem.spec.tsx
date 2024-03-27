import { act, render } from '@testing-library/react';
import assert from 'assert';
import { runInAction } from 'mobx';
import { OrdersStoreContext } from 'src/modules/orders/contexts';
import { orderModelDtoFactory } from 'src/modules/orders/models/OrderModel/OrderModel.factory';
import { OrdersStore } from 'src/modules/orders/stores';
import type { OrdersAggregate, OrderEntityDto } from 'src/modules/orders/types';
import { OrderItem } from './OrderItem';

describe(`${OrderItem.name}`, () => {
    let ordersStore: OrdersAggregate;
    let orderModelCollectionDto: OrderEntityDto[];
    const ordersAmount = 3;
    const orderItemsAmount = 5;
    beforeEach(() => {
        jest.restoreAllMocks();
        orderModelCollectionDto = orderModelDtoFactory.list(
            { count: ordersAmount },
            { itemsAmount: orderItemsAmount },
        );
        ordersStore = OrdersStore.make();
        ordersStore.ordersGateway.useLocalGateway();
        ordersStore.orderModelCollection.replaceAllFromDto(orderModelCollectionDto);
    });
    it('has expected amount of renders in OrderItem', () => {
        const order0 = ordersStore.orderModelCollection.models[ordersAmount - 1];
        assert(order0);
        const order1 = ordersStore.orderModelCollection.models[ordersAmount - 2];
        assert(order1);
        const item00 = order0.items.models[orderItemsAmount - 1];
        assert(item00);
        const item01 = order0.items.models[orderItemsAmount - 2];
        assert(item01);
        const item11 = order1.items.models[orderItemsAmount - 1];
        assert(item11);
        const rendersCounter = jest.fn();

        const { rerender } = render(
            <OrdersStoreContext.Provider value={ordersStore}>
                <OrderItem orderId={order0.id} itemId={item00.id} rendersCounter={rendersCounter} />
            </OrdersStoreContext.Provider>,
        );
        expect(rendersCounter).toHaveBeenCalledTimes(1);

        rerender(
            <OrdersStoreContext.Provider value={ordersStore}>
                <OrderItem orderId={order0.id} itemId={item01.id} rendersCounter={rendersCounter} />
            </OrdersStoreContext.Provider>,
        );
        expect(rendersCounter).toHaveBeenCalledTimes(3);

        act(() =>
            runInAction(() => {
                item01.quantity = 2002;
            }),
        );

        rerender(
            <OrdersStoreContext.Provider value={ordersStore}>
                <OrderItem orderId={order0.id} itemId={item01.id} rendersCounter={rendersCounter} />
            </OrdersStoreContext.Provider>,
        );
        expect(rendersCounter).toHaveBeenCalledTimes(4);

        rerender(
            <OrdersStoreContext.Provider value={ordersStore}>
                <OrderItem orderId={order1.id} itemId={item11.id} rendersCounter={rendersCounter} />
            </OrdersStoreContext.Provider>,
        );
        expect(rendersCounter).toHaveBeenCalledTimes(6);
    });
});
