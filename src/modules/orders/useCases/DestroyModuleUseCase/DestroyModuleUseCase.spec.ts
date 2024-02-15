import { DestroyModuleUseCase } from './DestroyModuleUseCase';

describe(`${DestroyModuleUseCase.name}`, () => {
    it('cancels fetch orders effect', async () => {
        const ordersCancelEffectsMock = {
            cancelFetchOrders: jest.fn(),
        };

        const destroyModuleUseCase = new DestroyModuleUseCase(ordersCancelEffectsMock);
        await destroyModuleUseCase.execute();

        expect(ordersCancelEffectsMock.cancelFetchOrders).toHaveBeenCalled();
    });
});
