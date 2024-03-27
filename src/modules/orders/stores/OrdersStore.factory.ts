import { factoryT } from 'factory-t';
import { orderEntityDtoFactory } from '../models/OrderModel/OrderModel.factory';
import { orderPresentationEntityDtoFactory } from '../models/OrdersPresentationModel/OrdersPresentationModel.factory';
import type { OrdersAggregateDto } from '../types';

export const ordersAggregateDtoFactory = factoryT<OrdersAggregateDto>({
    orderEntityCollectionDto: orderEntityDtoFactory.list({ count: 5 }),
    ordersPresentationEntityDto: orderPresentationEntityDtoFactory.item(),
});
