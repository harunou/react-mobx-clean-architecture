import { act, render, screen } from '@testing-library/react';
import assert from 'assert';
import { runInAction } from 'mobx';
import { OrdersStoreContext } from 'src/modules/orders/contexts';
import { orderModelDtoFactory } from 'src/modules/orders/models/OrderModel/OrderModel.factory';
import { OrdersStore } from 'src/modules/orders/stores';
import type { OrdersAggregate, OrderEntityDto } from 'src/modules/orders/types';
import { OrderItem as OrderItemWithSplitExtractedAdapter } from './OrderItemWithSplitExtractedAdapter';
import { OrderItem as OrderItemWithCombinedAdapter } from './OrderItemWithCombinedAdapter';
import { OrderItem as OrderItemWithCombinedPropsObservableState } from './OrderItemWithCombinedPropsObservableState';
import { OrderItem as OrderItemWithNullAdapter } from './OrderItemWithNullAdapter';
import { OrderItem as OrderItemWithSplitAdapter } from './OrderItemWithSplitAdapter';
import { OrderItem as OrderItemWithUseCase } from './OrderItemWithUseCase';
import { OrderItem as OrderItemWithSelector } from './OrderItemWithSelector';

describe.each([
    ['OrderItemWithSplitExtractedAdapter', OrderItemWithSplitExtractedAdapter],
    ['OrderItemWithCombinedAdapter', OrderItemWithCombinedAdapter],
    ['OrderItemWithCombinedPropsObservableState', OrderItemWithCombinedPropsObservableState],
    ['OrderItemWithNullAdapter', OrderItemWithNullAdapter],
    ['OrderItemWithSplitAdapter', OrderItemWithSplitAdapter],
    ['OrderItemWithUseCase', OrderItemWithUseCase],
    ['OrderItemWithSelector', OrderItemWithSelector],
])(`%s`, (_, OrderItem) => {
    let ordersStore: OrdersAggregate;
    let ordersEntitiesDto: OrderEntityDto[];
    const ordersAmount = 3;
    const orderItemsAmount = 5;
    beforeEach(() => {
        jest.restoreAllMocks();
        ordersEntitiesDto = orderModelDtoFactory.list(
            { count: ordersAmount },
            { itemsAmount: orderItemsAmount },
        );
        ordersStore = OrdersStore.make();
        ordersStore.ordersGateway.useLocalGateway();
        ordersStore.orderModelCollection.replaceAllFromDto(ordersEntitiesDto);
    });
    it('renders item data if supplied ids refer to a existing orderItem', () => {
        const order0 = ordersStore.orderModelCollection.entities[ordersAmount - 1];
        assert(order0);
        const item0 = order0.items.entities[orderItemsAmount - 1];
        assert(item0);

        render(
            <OrdersStoreContext.Provider value={ordersStore}>
                <OrderItem orderId={order0.id} itemId={item0.id} />
            </OrdersStoreContext.Provider>,
        );

        const idElement = screen.getByText(`id: ${item0.id}`);
        const productIdElement = screen.getByText(`productId: ${item0.productId}`);
        const quantityElement = screen.getByText(`quantity: ${item0.quantity}`);

        expect(idElement).toBeInTheDocument();
        expect(productIdElement).toBeInTheDocument();
        expect(quantityElement).toBeInTheDocument();
    });
    it('renders correct item data if props are changed', () => {
        const order0 = ordersStore.orderModelCollection.entities[ordersAmount - 1];
        assert(order0);
        const order1 = ordersStore.orderModelCollection.entities[ordersAmount - 2];
        assert(order1);
        const item00 = order0.items.entities[orderItemsAmount - 1];
        assert(item00);
        const item01 = order0.items.entities[orderItemsAmount - 2];
        assert(item01);

        const { rerender } = render(
            <OrdersStoreContext.Provider value={ordersStore}>
                <OrderItem orderId={order0.id} itemId={item00.id} />
            </OrdersStoreContext.Provider>,
        );

        rerender(
            <OrdersStoreContext.Provider value={ordersStore}>
                <OrderItem orderId={order0.id} itemId={item01.id} />
            </OrdersStoreContext.Provider>,
        );

        const idElement = screen.getByText(`id: ${item01.id}`);
        const productIdElement = screen.getByText(`productId: ${item01.productId}`);
        const quantityElement = screen.getByText(`quantity: ${item01.quantity}`);

        expect(idElement).toBeInTheDocument();
        expect(productIdElement).toBeInTheDocument();
        expect(quantityElement).toBeInTheDocument();
    });
    it('renders updated item data when item quantity is updated', () => {
        const order0 = ordersStore.orderModelCollection.entities[ordersAmount - 1];
        assert(order0);
        const item0 = order0.items.entities[orderItemsAmount - 1];
        assert(item0);

        render(
            <OrdersStoreContext.Provider value={ordersStore}>
                <OrderItem orderId={order0.id} itemId={item0.id} />
            </OrdersStoreContext.Provider>,
        );

        const quantityElement = screen.getByText(`quantity: ${item0.quantity}`);
        expect(quantityElement).toBeInTheDocument();

        act(() =>
            runInAction(() => {
                item0.quantity = 2002;
            }),
        );

        const updatedQuantityElement = screen.getByText(`quantity: ${item0.quantity}`);
        expect(updatedQuantityElement).toBeInTheDocument();
    });
});
