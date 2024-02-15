import {
    DeleteOrderUseCase,
    OrderEntityCollectionDep,
    OrdersGatewayDep,
    OrdersPresentationEntityDep,
    ServiceGatewayDep,
} from './DeleteOrderUseCaseWithInnerUnits';

describe(`${DeleteOrderUseCase.name}`, () => {
    let orderEntityCollection: OrderEntityCollectionDep;
    let ordersPresentation: OrdersPresentationEntityDep;
    let serviceGateway: ServiceGatewayDep;
    let ordersGateway: OrdersGatewayDep;
    let deleteOrderUseCase: DeleteOrderUseCase;

    beforeEach(() => {
        orderEntityCollection = {
            entities: [],
            remove: jest.fn(),
        };
        ordersPresentation = {
            patchData: jest.fn(),
        };
        serviceGateway = {
            logOrders: jest.fn(),
        };
        ordersGateway = {
            deleteOrder: jest.fn(),
        };
        deleteOrderUseCase = new DeleteOrderUseCase(
            orderEntityCollection,
            ordersPresentation,
            serviceGateway,
            ordersGateway,
        );
    });

    it('deletes an order successfully', async () => {
        const id = '7';
        const ordersGatewayDeleteOrderSpy = jest
            .spyOn(ordersGateway, 'deleteOrder')
            .mockResolvedValueOnce();
        const ordersPresentationPatchDataSpy = jest.spyOn(ordersPresentation, 'patchData');
        const orderEntityCollectionRemoveSpy = jest.spyOn(orderEntityCollection, 'remove');

        await deleteOrderUseCase.execute(id);

        expect(ordersGatewayDeleteOrderSpy).toHaveBeenCalledWith(id);
        expect(ordersPresentationPatchDataSpy).toHaveBeenCalledWith({ isLoading: true });
        expect(ordersPresentationPatchDataSpy).toHaveBeenCalledWith({ isLoading: false });
        expect(orderEntityCollectionRemoveSpy).toHaveBeenCalledWith(id);
    });

    it('handles failure to delete an order', async () => {
        const id = '123';
        const ordersGatewayDeleteOrderSpy = jest
            .spyOn(ordersGateway, 'deleteOrder')
            .mockRejectedValueOnce(new Error());
        const ordersPresentationPatchDataSpy = jest.spyOn(ordersPresentation, 'patchData');

        await deleteOrderUseCase.execute(id);

        expect(ordersGatewayDeleteOrderSpy).toHaveBeenCalledWith(id);
        expect(ordersPresentationPatchDataSpy).toHaveBeenCalledWith({ isLoading: true });
        expect(ordersPresentationPatchDataSpy).toHaveBeenCalledWith({ isLoading: false });
    });
});
