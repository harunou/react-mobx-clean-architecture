import { factoryT, fields } from 'factory-t';
import { randomFrom1To100 } from 'src/utils/testing';
import type { OrderDto, OrderItemDto } from './OrdersApi.types';

export const orderDtoFactory = factoryT<OrderDto>({
    id: (ctx) => `${ctx.index}`,
    userId: fields.sequence(randomFrom1To100.map((n) => n.toString())),
    items: () => orderItemDtoFactory.list({ count: 5 }),
});

export const orderItemDtoFactory = factoryT<OrderItemDto>({
    id: (ctx) => `${ctx.index}`,
    productId: fields.sequence(
        randomFrom1To100.slice(randomFrom1To100.length / 2).map((v) => v.toString()),
    ),
    quantity: fields.sequence(randomFrom1To100),
});
