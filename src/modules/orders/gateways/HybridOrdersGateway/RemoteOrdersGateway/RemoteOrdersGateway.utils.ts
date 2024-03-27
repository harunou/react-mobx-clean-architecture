import type { OrderDto } from 'src/modules/orders/api';
import type { OrderEntityDto } from 'src/modules/orders/types';
import type {
    OrderDtoToOrderModelDtoMapper,
    OrderModelDtoToOrderDtoMapper,
} from './RemoteOrdersGateway.types';

export const makeOrderModelDtoToOrderDtoMapper =
    (): OrderModelDtoToOrderDtoMapper => (order: OrderEntityDto) => {
        return order as OrderDto;
    };

export const makeOrderDtoToOrderModelDtoMapper =
    (): OrderDtoToOrderModelDtoMapper =>
    (order: OrderDto): OrderEntityDto => {
        return order as OrderEntityDto;
    };
