import type { OrderItemEntity, OrderItemEntityCollection, OrderItemEntityDto } from '../../types';
import { AbstractCollection } from 'src/utils/AbstractCollection';
import { OrderItemModel } from './OrderItemModel';

export class OrderItemModelCollection
    extends AbstractCollection<OrderItemEntityDto, OrderItemEntity>
    implements OrderItemEntityCollection
{
    static make(): OrderItemEntityCollection {
        return new OrderItemModelCollection(OrderItemModel.make);
    }
}
