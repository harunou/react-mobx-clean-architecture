import assert from 'assert';
import type { UseCase } from 'src/@types';
import { RequestMatcher, testHttpClient, tick } from 'src/utils/testing';
import { ordersApiUrl } from '../../api/OrdersApi';
import { OrdersStore } from '../../stores';
import type { OrdersAggregate, OrdersAggregateDto } from '../../types';
import { DeleteOrderUseCase as DeleteOrderUseCaseWithInnerUnits } from './DeleteOrderUseCaseWithInnerUnits';
import { DeleteOrderUseCase as DeleteOrderUseCaseWithExtractedUnits } from './DeleteOrderUseCaseWithExtractedUnits';
import { ordersStoreDtoFactory } from '../../stores/OrdersStore.factory';

describe.each([
    ['DeleteOrderUseCaseWithExtractedUnits', DeleteOrderUseCaseWithExtractedUnits],
    ['DeleteOrderUseCaseWithInnerUnits', DeleteOrderUseCaseWithInnerUnits],
])('%s', (_, sut) => {
    let deleteOrderUseCase: UseCase<[string]>;
    let ordersStoreDto: OrdersAggregateDto;
    let store: OrdersAggregate;
    const getDeleteOrderApiRequestMatcher: (id: string) => RequestMatcher = (id) => (req) =>
        req.url === `${ordersApiUrl}/${id}` && req.method === 'DELETE';

    beforeEach(() => {
        ordersStoreDto = ordersStoreDtoFactory.item();
        store = OrdersStore.make();
        store.ordersGateway.useRemoteGateway();
        store.setData(ordersStoreDto);
        deleteOrderUseCase = sut.make(store);
    });

    it('deletes an order successfully', async () => {
        const amountOfOrders = ordersStoreDto.orderModelCollectionDto.length;

        const orderIndex = 1;
        const order = ordersStoreDto.orderModelCollectionDto.at(orderIndex);
        assert(order);

        void deleteOrderUseCase.execute(order.id);

        const request = testHttpClient.expectOne(getDeleteOrderApiRequestMatcher(order.id));
        request.resolve(undefined);

        await tick();

        const resultOrderIds = store.orderModelCollection.models.map((order) => order.id);
        expect(resultOrderIds).not.toContain(order.id);
        expect(resultOrderIds.length).toBe(amountOfOrders - 1);
    });

    it('handles failure to delete an order', async () => {
        const amountOfOrders = ordersStoreDto.orderModelCollectionDto.length;

        const orderIndex = 1;
        const order = ordersStoreDto.orderModelCollectionDto.at(orderIndex);
        assert(order);

        void deleteOrderUseCase.execute(order.id);

        const request = testHttpClient.expectOne(getDeleteOrderApiRequestMatcher(order.id));
        request.reject(new Error('Failed to delete order'));

        await tick();

        const resultOrderIds = store.orderModelCollection.models.map((order) => order.id);
        expect(resultOrderIds).toContain(order.id);
        expect(resultOrderIds.length).toBe(amountOfOrders);
    });
});
