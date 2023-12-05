import type { EntityCollection } from 'src/@types';
import type { OrderItemEntity, OrderItemEntityDto } from './OrderItemEntity';

export type OrderItemEntityCollection = EntityCollection<OrderItemEntityDto, OrderItemEntity>;
