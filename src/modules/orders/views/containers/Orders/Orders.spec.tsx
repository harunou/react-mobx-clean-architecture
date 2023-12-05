import { act, render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { RootStoreContext } from 'src/contexts';
import { ordersApiUrl } from 'src/modules/orders/api/OrdersApi';
import { orderDtoFactory } from 'src/modules/orders/api/OrdersApi/OrdersApi.factory';
import { OrdersStore } from 'src/modules/orders/stores';
import { RootStore } from 'src/stores';
import { testHttpClient, tick } from 'src/utils/testing';
import { ordersTestId, orderTestId, totalItemQuantityTestId } from '../../testIds';
import { Orders } from './Orders';

describe(`${Orders.name}`, () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        jest.restoreAllMocks();
        testHttpClient.verify();
    });
    it('renders orders container with local gateway', async () => {
        const rootStore = RootStore.make();
        render(
            <StrictMode>
                <RootStoreContext.Provider value={rootStore}>
                    <Orders />
                </RootStoreContext.Provider>
            </StrictMode>,
        );

        jest.runAllTimers();
        await tick();

        const loadingElements = screen.queryAllByText(/loading/i);
        const ordersElement = screen.getByTestId(ordersTestId);

        expect(loadingElements).toHaveLength(0);
        expect(ordersElement).toBeInTheDocument();
    });
    it('renders orders container with remote gateway', async () => {
        const rootStore = RootStore.make();
        const ordersStoreFactory = OrdersStore.make;
        jest.spyOn(OrdersStore, 'make').mockImplementation(() => {
            const store = ordersStoreFactory();
            store.ordersGateway.useRemoteGateway();
            return store;
        });
        const amountOfOrders = 4;
        const ordersDto = orderDtoFactory.list({ count: amountOfOrders });

        render(
            <StrictMode>
                <RootStoreContext.Provider value={rootStore}>
                    <Orders />
                </RootStoreContext.Provider>
            </StrictMode>,
        );

        const [request0, request1] = testHttpClient.expect(
            new Request(ordersApiUrl, { method: 'GET' }),
        );

        await act(async () => request0?.resolve([]));
        await act(async () => request1?.resolve(ordersDto));

        const loadingElements = screen.queryAllByText(/loading/i);
        const ordersElement = screen.getByTestId(ordersTestId);
        const userElements = screen.getAllByTestId(orderTestId);

        expect(loadingElements).toHaveLength(0);
        expect(ordersElement).toBeInTheDocument();
        expect(userElements).toHaveLength(amountOfOrders);
    });
    it('renders total items quantity', async () => {
        const rootStore = RootStore.make();
        const ordersStoreFactory = OrdersStore.make;
        jest.spyOn(OrdersStore, 'make').mockImplementation(() => {
            const store = ordersStoreFactory();
            store.ordersGateway.useRemoteGateway();
            return store;
        });
        const amountOfOrders = 4;
        const ordersDto = orderDtoFactory.list({ count: amountOfOrders });
        const expectedTotalItemsQuantity = ordersDto
            .flatMap((order) => order.items)
            .reduce((total, item) => total + item.quantity, 0);

        render(
            <StrictMode>
                <RootStoreContext.Provider value={rootStore}>
                    <Orders />
                </RootStoreContext.Provider>
            </StrictMode>,
        );

        const [request0, request1] = testHttpClient.expect(
            new Request(ordersApiUrl, { method: 'GET' }),
        );

        await act(async () => request0?.resolve([]));
        await act(async () => request1?.resolve(ordersDto));

        const totalItemsQuantityElement = screen.getByTestId(totalItemQuantityTestId);

        expect(totalItemsQuantityElement).toHaveTextContent(`${expectedTotalItemsQuantity}`);
    });
});
