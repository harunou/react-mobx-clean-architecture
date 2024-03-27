import { factoryT, fields } from 'factory-t';
import { randomFrom1To100 } from 'src/utils/testing';
import type { OrderItemEntityDto } from '../../types';

export const orderItemModelDtoFactory = factoryT<OrderItemEntityDto>({
    id: (ctx) => `${ctx.index}`,
    productId: fields.sequence(
        randomFrom1To100.slice(randomFrom1To100.length / 2).map((v) => v.toString()),
    ),
    quantity: fields.sequence(randomFrom1To100),
});
