import { AbstractCollection } from 'src/utils/AbstractCollection';
import type { OrderEntity, OrderEntityCollection, OrderEntityDto } from '../../types';
import { OrderModel } from './OrderModel';

export class OrderModelCollection
    extends AbstractCollection<OrderEntityDto, OrderEntity>
    implements OrderEntityCollection
{
    static make(orders: OrderEntity[] = []): OrderEntityCollection {
        return new OrderModelCollection(OrderModel.make, orders);
    }
}
