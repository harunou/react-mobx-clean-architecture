import type { CollectableEntity, UniqueEntityDto } from 'src/@types';

export interface OrderItemEntityDto extends UniqueEntityDto<string> {
    productId: string;
    quantity: number;
}

export interface OrderItemEntity extends CollectableEntity<OrderItemEntityDto> {
    productId: string;
    quantity: number;
}
