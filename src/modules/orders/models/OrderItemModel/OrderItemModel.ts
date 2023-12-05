import { action, computed, makeObservable, observable } from 'mobx';
import type { OrderItemEntity, OrderItemEntityDto } from '../../types';

const DEFAULTS: OrderItemEntityDto = {
    id: '0',
    productId: '0',
    quantity: 0,
};

export class OrderItemModel implements OrderItemEntity {
    static make(data: OrderItemEntityDto = DEFAULTS): OrderItemModel {
        return new OrderItemModel(data);
    }

    @observable
    id = '0';

    @observable
    productId = '0';

    @observable
    quantity = 0;

    constructor(data: OrderItemEntityDto) {
        makeObservable(this);
        this.setData(data);
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
    setData(data: OrderItemEntityDto): void {
        this.id = data.id;
        this.productId = data.productId;
        this.quantity = data.quantity;
    }

    @action
    patchData(data: Partial<OrderItemEntityDto>): void {
        this.id = data.hasOwnProperty('id') ? data.id : this.id;
        this.productId = data.hasOwnProperty('productId') ? data.productId : this.productId;
        this.quantity = data.hasOwnProperty('quantity') ? data.quantity : this.quantity;
    }
}
