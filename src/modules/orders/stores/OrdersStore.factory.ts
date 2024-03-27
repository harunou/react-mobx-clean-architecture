import { factoryT } from 'factory-t';
import { orderModelDtoFactory } from '../models/OrderModel/OrderModel.factory';
import { orderPresentationModelDtoFactory } from '../models/OrdersPresentationModel/OrdersPresentationModel.factory';
import type { OrdersAggregateDto } from '../types';

export const ordersStoreDtoFactory = factoryT<OrdersAggregateDto>({
    orderModelCollectionDto: orderModelDtoFactory.list({ count: 5 }),
    ordersPresentationModelDto: orderPresentationModelDtoFactory.item(),
});
