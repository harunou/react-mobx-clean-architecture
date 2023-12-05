import type { OrderDto } from 'src/modules/orders/api';
import type { OrderEntityDto } from 'src/modules/orders/types';

export type OrderDtoToOrderEntityDtoMapper = (entity: OrderDto) => OrderEntityDto;
export type OrderEntityDtoToOrderDtoMapper = (model: OrderEntityDto) => OrderDto;
