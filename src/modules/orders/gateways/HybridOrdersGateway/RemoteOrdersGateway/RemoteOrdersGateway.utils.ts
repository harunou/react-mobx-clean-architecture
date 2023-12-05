import type { OrderDto } from 'src/modules/orders/api';
import type { OrderEntityDto } from 'src/modules/orders/types';
import type {
    OrderDtoToOrderEntityDtoMapper,
    OrderEntityDtoToOrderDtoMapper,
} from './RemoteOrdersGateway.types';

export const makeOrderEntityDtoToOrderDtoMapper =
    (): OrderEntityDtoToOrderDtoMapper => (order: OrderEntityDto) => {
        return order as OrderDto;
    };

export const makeOrderDtoToOrderEntityDtoMapper =
    (): OrderDtoToOrderEntityDtoMapper =>
    (order: OrderDto): OrderEntityDto => {
        return order as OrderEntityDto;
    };
