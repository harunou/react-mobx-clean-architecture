import { factoryT } from 'factory-t';
import { orderEntityDtoFactory } from '../models/OrderModel/OrderModel.factory';
import { orderPresentationEntityDtoFactory } from '../models/OrdersPresentationModel/OrdersPresentationModel.factory';
import type { AbstractOrdersStoreDto } from '../types';

export const ordersStoreDtoFactory = factoryT<AbstractOrdersStoreDto>({
    orderEntityCollectionDto: orderEntityDtoFactory.list({ count: 5 }),
    ordersPresentationEntityDto: orderPresentationEntityDtoFactory.item(),
});
