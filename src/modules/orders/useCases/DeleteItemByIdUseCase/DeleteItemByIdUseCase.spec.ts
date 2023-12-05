import {
    DeleteItemByIdUseCase as DeleteItemByIdUseCasePlain,
    OrderByIdSelectorDep,
    OrdersGatewayDep,
} from './DeleteItemByIdUseCasePlain';
import { DeleteItemByIdUseCase as DeleteItemByIdUseCaseFactored } from './DeleteItemByIdUseCaseFactored';

[DeleteItemByIdUseCasePlain, DeleteItemByIdUseCaseFactored].forEach((DeleteItemByIdUseCase) => {
    describe(`${DeleteItemByIdUseCase.name}`, () => {
        it('deletes item by correct orderId and itemId', async () => {
            const orderId = '3';
            const itemId = '5';
            const items = {
                remove: jest.fn(),
                get: jest.fn().mockReturnValue({}),
            };
            const order = {
                items,
            };
            const orderByIdSelector: OrderByIdSelectorDep = {
                select: jest.fn().mockReturnValue(order),
            };
            const ordersGateway: OrdersGatewayDep = {
                deleteItem: jest.fn(),
            };
            const useCase = new DeleteItemByIdUseCase(orderByIdSelector, ordersGateway);

            await useCase.execute(orderId, itemId);

            expect(orderByIdSelector.select).toBeCalledWith(orderId);
            expect(ordersGateway.deleteItem).toBeCalledWith(orderId, itemId);
            expect(items.remove).toBeCalledWith(itemId);
        });

        it('does nothing if order is not found', async () => {
            const orderId = '3';
            const itemId = '5';
            const items = {
                remove: jest.fn(),
                get: jest.fn().mockReturnValue(undefined),
            };
            const order = {
                items,
            };
            const orderByIdSelector: OrderByIdSelectorDep = {
                select: jest.fn().mockReturnValue(undefined),
            };
            const ordersGateway: OrdersGatewayDep = {
                deleteItem: jest.fn(),
            };
            const useCase = new DeleteItemByIdUseCase(orderByIdSelector, ordersGateway);

            await useCase.execute(orderId, itemId);

            expect(orderByIdSelector.select).toBeCalledWith(orderId);
            expect(ordersGateway.deleteItem).not.toBeCalled();
            expect(order.items.remove).not.toBeCalled();
        });

        it('does nothing if item is not found', async () => {
            const orderId = '3';
            const itemId = '5';
            const items = {
                remove: jest.fn(),
                get: jest.fn().mockReturnValue(undefined),
            };
            const order = {
                items,
            };
            const orderByIdSelector: OrderByIdSelectorDep = {
                select: jest.fn().mockReturnValue(order),
            };
            const ordersGateway: OrdersGatewayDep = {
                deleteItem: jest.fn(),
            };
            const useCase = new DeleteItemByIdUseCase(orderByIdSelector, ordersGateway);

            await useCase.execute(orderId, itemId);

            expect(orderByIdSelector.select).toBeCalledWith(orderId);
            expect(ordersGateway.deleteItem).not.toBeCalled();
            expect(order.items.remove).not.toBeCalled();
        });
    });
});
