import { factoryT } from 'factory-t';
import { orderModelDtoFactory } from '../models/OrderModel/OrderModel.factory';
import { orderPresentationModelDtoFactory } from '../models/OrdersPresentationModel/OrdersPresentationModel.factory';
import type { OrdersAggregateDto } from '../types';

export const ordersAggregateDtoFactory = factoryT<OrdersAggregateDto>({
    orderEntityCollectionDto: orderModelDtoFactory.list({ count: 5 }),
    ordersPresentationEntityDto: orderPresentationModelDtoFactory.item(),
});
