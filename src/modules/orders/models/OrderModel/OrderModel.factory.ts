import { factoryT, fields } from 'factory-t';
import { randomFrom1To100 } from 'src/utils/testing';
import type { OrderEntityDto } from '../../types';
import { orderItemEntityDtoFactory } from '../OrderItemModel/OrderItemModel.factory';

export const orderEntityDtoFactory = factoryT<OrderEntityDto>({
    id: (ctx) => `${ctx.index}`,
    userId: fields.sequence(randomFrom1To100.map((n) => n.toString())),
    items: () => orderItemEntityDtoFactory.list({ count: 5 }),
});
