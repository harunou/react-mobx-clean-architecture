import { act, render, screen } from '@testing-library/react';
import assert from 'assert';
import { runInAction } from 'mobx';
import { OrdersStoreContext } from 'src/modules/orders/contexts';
import { orderEntityDtoFactory } from 'src/modules/orders/models/OrderModel/OrderModel.factory';
import { OrdersStore } from 'src/modules/orders/stores';
import type { AbstractOrdersStore, OrderEntityDto } from 'src/modules/orders/types';
import { OrderItem } from './OrderItem';
import { ordersApiUrl } from 'src/modules/orders/api/OrdersApi';
import { RequestMatcher, testHttpClient } from 'src/utils/testing';
import { StrictMode } from 'react';

describe(`${OrderItem.name}`, () => {
    let ordersStore: AbstractOrdersStore;
    let ordersEntitiesDto: OrderEntityDto[];
    const ordersAmount = 3;
    const orderItemsAmount = 5;
    beforeEach(() => {
        jest.restoreAllMocks();
        ordersEntitiesDto = orderEntityDtoFactory.list(
            { count: ordersAmount },
            { itemsAmount: orderItemsAmount },
        );
        ordersStore = OrdersStore.make();
        ordersStore.ordersGateway.useLocalGateway();
        ordersStore.orderEntityCollection.replaceAllFromDto(ordersEntitiesDto);
    });
    afterEach(() => {
        testHttpClient.verify();
    });
    it('allows to delete item', async () => {
        ordersStore.ordersGateway.useRemoteGateway();
        const order0 = ordersStore.orderEntityCollection.entities[ordersAmount - 1];
        assert(order0);
        const item0 = order0.items.entities[orderItemsAmount - 1];
        assert(item0);
        const deleteUrl = `${ordersApiUrl}/${order0.id}/items/${item0.id}`;
        const deleteUrlMatcher: RequestMatcher = (req: Request): boolean =>
            req.url === deleteUrl && req.method === 'DELETE';

        render(
            <StrictMode>
                <OrdersStoreContext.Provider value={ordersStore}>
                    <OrderItem orderId={order0.id} itemId={item0.id} />
                </OrdersStoreContext.Provider>
            </StrictMode>,
        );

        const deleteButton = screen.getByRole('button');

        act(() => {
            deleteButton.click();
        });

        const request = testHttpClient.expectOne(deleteUrlMatcher);

        await act(async () => request.resolve(undefined));

        expect(order0.items.get(item0.id)).toBeUndefined();
    });
    it('has expected amount of renders in OrderItem', () => {
        const order0 = ordersStore.orderEntityCollection.entities[ordersAmount - 1];
        assert(order0);
        const order1 = ordersStore.orderEntityCollection.entities[ordersAmount - 2];
        assert(order1);
        const item00 = order0.items.entities[orderItemsAmount - 1];
        assert(item00);
        const item01 = order0.items.entities[orderItemsAmount - 2];
        assert(item01);
        const item11 = order1.items.entities[orderItemsAmount - 1];
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
