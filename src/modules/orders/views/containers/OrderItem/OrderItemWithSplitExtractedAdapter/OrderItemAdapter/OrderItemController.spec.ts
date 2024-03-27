import assert from 'assert';
import type { Selector } from 'src/@types';
import { OrderModel, OrderModelCollection } from 'src/modules/orders/models';
import { orderModelDtoFactory } from 'src/modules/orders/models/OrderModel/OrderModel.factory';
import { OrderByIdSelector } from 'src/modules/orders/selectors';
import type { OrderEntity, OrderEntityCollection, OrderEntityDto } from 'src/modules/orders/types';
import {
    ItemIdStoreDep,
    OrderByIdSelectorDep,
    OrderIdStoreDep,
    OrderItemController,
} from './OrderItemController';

describe(`${OrderItemController.name}`, () => {
    describe('deleteButtonClicked with mocks', () => {
        let orderIdStore: OrderIdStoreDep;
        let itemIdStore: ItemIdStoreDep;
        let items: { remove(id: string): void };
        let orderByIdSelector: OrderByIdSelectorDep;
        let controller: OrderItemController;
        beforeEach(() => {
            items = {
                remove: jest.fn(),
            };
            orderByIdSelector = {
                select: jest.fn().mockImplementationOnce((orderId: string) => {
                    if (orderId === '3') {
                        return {
                            items,
                        };
                    }
                    return undefined;
                }),
            };
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('remove an item from an existing order', () => {
            orderIdStore = { value: '3' };
            itemIdStore = { value: '5' };
            controller = new OrderItemController(orderIdStore, itemIdStore, orderByIdSelector);
            controller.deleteButtonClicked();

            expect(orderByIdSelector.select).toHaveBeenCalledWith('3');
            expect(items.remove).toHaveBeenCalledWith('5');
        });
        it('does not remove an item from a non-existing order', () => {
            orderIdStore = { value: '7' };
            itemIdStore = { value: '5' };
            controller = new OrderItemController(orderIdStore, itemIdStore, orderByIdSelector);
            controller.deleteButtonClicked();

            expect(orderByIdSelector.select).toHaveBeenCalledWith('7');
            expect(items.remove).not.toHaveBeenCalled();
        });
    });
    describe('deleteButtonClicked with stores', () => {
        let orderIdStore: OrderIdStoreDep;
        let itemIdStore: ItemIdStoreDep;
        let orderEntitiesDto: OrderEntityDto[];
        let orderByIdSelector: Selector<[id: string], OrderEntity | undefined>;
        let controller: OrderItemController;
        let orderEntityCollection: OrderEntityCollection;
        beforeEach(() => {
            orderEntitiesDto = orderModelDtoFactory.list({ count: 5 });
            const orderEntities = orderEntitiesDto.map((dto) => OrderModel.make(dto));
            orderEntityCollection = OrderModelCollection.make(orderEntities);
            orderByIdSelector = new OrderByIdSelector(orderEntityCollection);
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('remove an item from an existing order', () => {
            const orderEntity = orderEntityCollection.entities.at(3);
            assert(orderEntity);
            const itemEntity = orderEntity.items.entities.at(2);
            assert(itemEntity);

            orderIdStore = { value: orderEntity.id };
            itemIdStore = { value: itemEntity.id };
            controller = new OrderItemController(orderIdStore, itemIdStore, orderByIdSelector);

            const expectedOrdersAmount = orderEntity.items.entities.length - 1;

            controller.deleteButtonClicked();

            const resultOrdersAmount = orderEntity.items.entities.length;
            const resultEntity = orderEntity.items.entities.find(
                (entity) => entity.id === itemEntity.id,
            );

            expect(resultOrdersAmount).toBe(expectedOrdersAmount);
            expect(resultEntity).toBeUndefined();
        });
        it('does not remove an item from a non-existing order', () => {
            const orderEntity = orderEntityCollection.entities.at(3);
            assert(orderEntity);

            orderIdStore = { value: orderEntity.id };
            itemIdStore = { value: '9000' };

            controller = new OrderItemController(orderIdStore, itemIdStore, orderByIdSelector);

            const expectedOrdersAmount = orderEntity.items.entities.length;

            controller.deleteButtonClicked();

            const resultOrdersAmount = orderEntity.items.entities.length;

            expect(resultOrdersAmount).toBe(expectedOrdersAmount);
        });
    });
});
