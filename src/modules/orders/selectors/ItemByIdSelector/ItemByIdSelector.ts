import type { Selector } from 'src/@types';
import type { OrdersAggregate, OrderEntity, OrderItemEntity } from '../../types';
import { OrderByIdSelector } from '../OrderByIdSelector';

export class ItemByIdSelector
    implements Selector<[orderId: string, itemId: string], OrderItemEntity | undefined>
{
    static make(
        ordersStore: OrdersAggregate,
    ): Selector<[orderId: string, itemId: string], OrderItemEntity | undefined> {
        return new ItemByIdSelector(OrderByIdSelector.make(ordersStore));
    }

    constructor(
        private readonly orderByIdSelector: Selector<[orderId: string], OrderEntity | undefined>,
    ) {}

    select(orderId: string, itemId: string): OrderItemEntity | undefined {
        return this.orderByIdSelector.select(orderId)?.items.get(itemId);
    }
}
