import { factoryT, fields } from 'factory-t';
import { randomFrom1To100 } from 'src/utils/testing';
import type { OrderEntityDto } from '../../types';
import { orderItemModelDtoFactory } from '../OrderItemModel/OrderItemModel.factory';

export const orderModelDtoFactory = factoryT<OrderEntityDto>({
    id: (ctx) => `${ctx.index}`,
    userId: fields.sequence(randomFrom1To100.map((n) => n.toString())),
    items: () => orderItemModelDtoFactory.list({ count: 5 }),
});
