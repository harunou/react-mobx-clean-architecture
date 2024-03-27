import {
    DeleteOrderUseCase,
    OrderEntityCollectionDep,
    OrdersGatewayDep,
    OrdersPresentationEntityDep,
    ServiceGatewayDep,
} from './DeleteOrderUseCaseWithInnerUnits';

describe(`${DeleteOrderUseCase.name}`, () => {
    let orderModelCollection: OrderEntityCollectionDep;
    let ordersPresentationModel: OrdersPresentationEntityDep;
    let serviceGateway: ServiceGatewayDep;
    let ordersGateway: OrdersGatewayDep;
    let deleteOrderUseCase: DeleteOrderUseCase;

    beforeEach(() => {
        orderModelCollection = {
            entities: [],
            remove: jest.fn(),
        };
        ordersPresentationModel = {
            patchData: jest.fn(),
        };
        serviceGateway = {
            logOrders: jest.fn(),
        };
        ordersGateway = {
            deleteOrder: jest.fn(),
        };
        deleteOrderUseCase = new DeleteOrderUseCase(
            orderModelCollection,
            ordersPresentationModel,
            serviceGateway,
            ordersGateway,
        );
    });

    it('deletes an order successfully', async () => {
        const id = '7';
        const ordersGatewayDeleteOrderSpy = jest
            .spyOn(ordersGateway, 'deleteOrder')
            .mockResolvedValueOnce();
        const ordersPresentationModelPatchDataSpy = jest.spyOn(
            ordersPresentationModel,
            'patchData',
        );
        const orderModelCollectionRemoveSpy = jest.spyOn(orderModelCollection, 'remove');

        await deleteOrderUseCase.execute(id);

        expect(ordersGatewayDeleteOrderSpy).toHaveBeenCalledWith(id);
        expect(ordersPresentationModelPatchDataSpy).toHaveBeenCalledWith({ isLoading: true });
        expect(ordersPresentationModelPatchDataSpy).toHaveBeenCalledWith({ isLoading: false });
        expect(orderModelCollectionRemoveSpy).toHaveBeenCalledWith(id);
    });

    it('handles failure to delete an order', async () => {
        const id = '123';
        const ordersGatewayDeleteOrderSpy = jest
            .spyOn(ordersGateway, 'deleteOrder')
            .mockRejectedValueOnce(new Error());
        const ordersPresentationModelPatchDataSpy = jest.spyOn(
            ordersPresentationModel,
            'patchData',
        );

        await deleteOrderUseCase.execute(id);

        expect(ordersGatewayDeleteOrderSpy).toHaveBeenCalledWith(id);
        expect(ordersPresentationModelPatchDataSpy).toHaveBeenCalledWith({ isLoading: true });
        expect(ordersPresentationModelPatchDataSpy).toHaveBeenCalledWith({ isLoading: false });
    });
});
