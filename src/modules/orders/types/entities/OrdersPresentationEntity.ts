import type { Entity } from 'src/@types';

export interface OrdersPresentationEntityDto {
    isLoading: boolean;
}

export interface OrdersPresentationEntity extends Entity<OrdersPresentationEntityDto> {
    isLoading: boolean;
}
