import type { Selector } from 'src/@types';
import { OrderModelCollection } from '../../models';
import { orderModelDtoFactory } from '../../models/OrderModel/OrderModel.factory';
import type { OrderEntityCollection, OrderEntityDto } from '../../types';
import { TotalOrderItemQuantitySelectorOptimized } from './TotalOrderItemQuantitySelectorOptimized';
import { TotalOrderItemQuantitySelectorNotOptimized } from './TotalOrderItemQuantitySelectorNotOptimized';
import { TotalOrderItemQuantitySelectorSingleton } from './TotalOrderItemQuantitySelectorSingleton';

type TotalOrderItemQuantitySelector = Selector<[], number>;

describe.each([
    [TotalOrderItemQuantitySelectorOptimized.name, TotalOrderItemQuantitySelectorOptimized],
    [TotalOrderItemQuantitySelectorNotOptimized.name, TotalOrderItemQuantitySelectorNotOptimized],
    [TotalOrderItemQuantitySelectorSingleton.name, TotalOrderItemQuantitySelectorSingleton],
])(`%s`, (_, TotalOrderItemQuantitySelector) => {
    let orderEntityCollectionDto: OrderEntityDto[];
    let orderEntityCollection: OrderEntityCollection;
    let sut: TotalOrderItemQuantitySelector;

    beforeEach(() => {
        orderModelDtoFactory.resetCount();
        orderEntityCollectionDto = orderModelDtoFactory.list({ count: 3 });
        orderEntityCollection = OrderModelCollection.make();
        sut = new TotalOrderItemQuantitySelector(orderEntityCollection);
    });

    it('returns the total quantity of order items', () => {
        orderEntityCollection.replaceAllFromDto(orderEntityCollectionDto);

        const expected = orderEntityCollectionDto.reduce((totalInOrders, order) => {
            return (
                totalInOrders +
                order.items.reduce((totalInOrder, item) => totalInOrder + item.quantity, 0)
            );
        }, 0);

        const result = sut.select();

        expect(result).toEqual(expected);
    });

    it('returns 0 when there are no order items', () => {
        orderEntityCollection.replaceAllFromDto([]);

        const expected = 0;

        const result = sut.select();

        expect(result).toEqual(expected);
    });
});
