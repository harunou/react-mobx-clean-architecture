import { action, computed, makeObservable, observable } from 'mobx';
import type { OrderEntity, OrderEntityDto } from '../../types';
import { OrderItemModelCollection } from '../OrderItemModel';

const DEFAULTS: OrderEntityDto = {
    id: '0',
    userId: '0',
    items: [],
};

export class OrderModel implements OrderEntity {
    static make(dto: OrderEntityDto = DEFAULTS): OrderEntity {
        return new OrderModel(dto);
    }

    @observable
    id = '0';

    @observable
    userId = '0';

    items = OrderItemModelCollection.make();

    constructor(dto: OrderEntityDto) {
        makeObservable(this);
        this.setData(dto);
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
    patchData(dto: Partial<OrderEntityDto>): void {
        this.id = dto.hasOwnProperty('id') ? dto.id : this.id;
        this.userId = dto.hasOwnProperty('userId') ? dto.userId : this.userId;
        if (dto.hasOwnProperty('items')) {
            this.items.replaceAllFromDto(dto.items);
        }
    }

    @action
    setData(dto: OrderEntityDto): void {
        this.id = dto.id;
        this.userId = dto.userId;
        this.items.replaceAllFromDto(dto.items);
    }
}
