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
    let orderModelCollectionDto: OrderEntityDto[];
    let orderModelCollection: OrderEntityCollection;
    let sut: TotalOrderItemQuantitySelector;

    beforeEach(() => {
        orderModelDtoFactory.resetCount();
        orderModelCollectionDto = orderModelDtoFactory.list({ count: 3 });
        orderModelCollection = OrderModelCollection.make();
        sut = new TotalOrderItemQuantitySelector(orderModelCollection);
    });

    it('returns the total quantity of order items', () => {
        orderModelCollection.replaceAllFromDto(orderModelCollectionDto);

        const expected = orderModelCollectionDto.reduce((totalInOrders, order) => {
            return (
                totalInOrders +
                order.items.reduce((totalInOrder, item) => totalInOrder + item.quantity, 0)
            );
        }, 0);

        const result = sut.select();

        expect(result).toEqual(expected);
    });

    it('returns 0 when there are no order items', () => {
        orderModelCollection.replaceAllFromDto([]);

        const expected = 0;

        const result = sut.select();

        expect(result).toEqual(expected);
    });
});
