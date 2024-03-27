import type { OrderDto } from 'src/modules/orders/api';
import type { OrderEntityDto } from 'src/modules/orders/types';

export type OrderDtoToOrderModelDtoMapper = (dto: OrderDto) => OrderEntityDto;
export type OrderModelDtoToOrderDtoMapper = (model: OrderEntityDto) => OrderDto;
