import type { Effect } from 'src/@types';
import { DeleteOrderEffect, OrdersGatewayDep } from './DeleteOrderEffect';

describe('DeleteOrderEffect', () => {
    let ordersGatewayMock: OrdersGatewayDep;
    let deleteOrderEffect: Effect<[orderId: string]>;

    beforeEach(() => {
        ordersGatewayMock = {
            deleteOrder: jest.fn(),
        };
        deleteOrderEffect = new DeleteOrderEffect(ordersGatewayMock);
    });

    it('should call ordersGateway.deleteOrder with the provided id', async () => {
        const id = '123';
        await deleteOrderEffect.run(id);
        expect(ordersGatewayMock.deleteOrder).toHaveBeenCalledWith(id);
    });
});
