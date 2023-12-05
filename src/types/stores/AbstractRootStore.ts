import type { Entity } from 'src/@types';
import type { AbstractOrdersStore, AbstractOrdersStoreDto } from 'src/modules/orders/types';

export interface AbstractRootStoreDto {
    ordersStoreDto: AbstractOrdersStoreDto | undefined;
}

export interface AbstractRootStore extends Entity<AbstractRootStoreDto> {
    ordersStore: AbstractOrdersStore | undefined;
    setOrdersStore(OrderStore: AbstractOrdersStore | undefined): void;
}
