import { action, makeObservable, observable } from 'mobx';
import type { OrdersPresentationEntity, OrdersPresentationEntityDto } from '../../types';

const DEFAULTS: OrdersPresentationEntityDto = {
    isLoading: false,
};

export class OrdersPresentationModel implements OrdersPresentationEntity {
    static make(data: OrdersPresentationEntityDto = DEFAULTS): OrdersPresentationEntity {
        return new OrdersPresentationModel(data);
    }

    @observable
    isLoading = false;

    constructor(data: OrdersPresentationEntityDto) {
        makeObservable(this);
        this.setData(data);
    }

    get dto(): OrdersPresentationEntityDto {
        return {
            isLoading: this.isLoading,
        };
    }

    @action
    setData(data: OrdersPresentationEntityDto): void {
        this.isLoading = data.isLoading;
    }

    @action
    patchData(data: Partial<OrdersPresentationEntityDto>): void {
        this.isLoading = data.hasOwnProperty('isLoading') ? data.isLoading : this.isLoading;
    }
}
