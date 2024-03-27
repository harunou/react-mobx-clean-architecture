import { action, computed, makeObservable, observable } from 'mobx';
import type { OrderItemEntity, OrderItemEntityDto } from '../../types';

const DEFAULTS: OrderItemEntityDto = {
    id: '0',
    productId: '0',
    quantity: 0,
};

export class OrderItemModel implements OrderItemEntity {
    static make(dto: OrderItemEntityDto = DEFAULTS): OrderItemModel {
        return new OrderItemModel(dto);
    }

    @observable
    id = '0';

    @observable
    productId = '0';

    @observable
    quantity = 0;

    constructor(dto: OrderItemEntityDto) {
        makeObservable(this);
        this.setData(dto);
    }

    @computed
    get dto(): OrderItemEntityDto {
        return {
            id: this.id,
            productId: this.productId,
            quantity: this.quantity,
        };
    }

    @action
    setData(dto: OrderItemEntityDto): void {
        this.id = dto.id;
        this.productId = dto.productId;
        this.quantity = dto.quantity;
    }

    @action
    patchData(dto: Partial<OrderItemEntityDto>): void {
        this.id = dto.hasOwnProperty('id') ? dto.id : this.id;
        this.productId = dto.hasOwnProperty('productId') ? dto.productId : this.productId;
        this.quantity = dto.hasOwnProperty('quantity') ? dto.quantity : this.quantity;
    }
}
