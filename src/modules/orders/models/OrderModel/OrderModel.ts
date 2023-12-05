import { action, computed, makeObservable, observable } from 'mobx';
import type { OrderEntity, OrderEntityDto } from '../../types';
import { OrderItemModelCollection } from '../OrderItemModel';

const DEFAULTS: OrderEntityDto = {
    id: '0',
    userId: '0',
    items: [],
};

export class OrderModel implements OrderEntity {
    static make(data: OrderEntityDto = DEFAULTS): OrderEntity {
        return new OrderModel(data);
    }

    @observable
    id = '0';

    @observable
    userId = '0';

    items = OrderItemModelCollection.make();

    constructor(data: OrderEntityDto) {
        makeObservable(this);
        this.setData(data);
    }

    @computed
    get dto(): OrderEntityDto {
        return {
            id: this.id,
            userId: this.userId,
            items: this.items.entities.map((item) => item.dto),
        };
    }

    @action
    patchData(data: Partial<OrderEntityDto>): void {
        this.id = data.hasOwnProperty('id') ? data.id : this.id;
        this.userId = data.hasOwnProperty('userId') ? data.userId : this.userId;
        if (data.hasOwnProperty('items')) {
            this.items.replaceAllFromDto(data.items);
        }
    }

    @action
    setData(data: OrderEntityDto): void {
        this.id = data.id;
        this.userId = data.userId;
        this.items.replaceAllFromDto(data.items);
    }
}
