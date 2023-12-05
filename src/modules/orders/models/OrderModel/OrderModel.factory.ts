import { factoryT, fields } from 'factory-t';
import { randomFrom1To100 } from 'src/utils/testing';
import type { OrderEntityDto } from '../../types';
import { orderItemDtoFactory } from '../OrderItemModel/OrderItemModel.factory';

export const orderDtoFactory = factoryT<OrderEntityDto>({
    id: (ctx) => `${ctx.index}`,
    userId: fields.sequence(randomFrom1To100.map((n) => n.toString())),
    items: () => orderItemDtoFactory.list({ count: 5 }),
});
