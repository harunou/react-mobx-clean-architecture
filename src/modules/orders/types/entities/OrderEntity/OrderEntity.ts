import type { CollectableEntity, UniqueEntityDto } from 'src/@types';
import type { OrderItemEntityCollection, OrderItemEntityDto } from '../OrderItemEntity';

export interface OrderEntityDto extends UniqueEntityDto<string> {
    userId: string;
    items: OrderItemEntityDto[];
}

export interface OrderEntity extends CollectableEntity<OrderEntityDto> {
    userId: string;
    items: OrderItemEntityCollection;
}
