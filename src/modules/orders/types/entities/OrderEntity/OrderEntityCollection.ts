import type { EntityCollection } from 'src/@types';
import type { OrderEntity, OrderEntityDto } from './OrderEntity';

export type OrderEntityCollection = EntityCollection<OrderEntityDto, OrderEntity>;
