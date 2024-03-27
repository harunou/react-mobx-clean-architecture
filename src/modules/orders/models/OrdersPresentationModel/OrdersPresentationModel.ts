import { action, makeObservable, observable } from 'mobx';
import type { OrdersPresentationEntity, OrdersPresentationEntityDto } from '../../types';

export const DEFAULTS: OrdersPresentationEntityDto = {
    isLoading: false,
};

export class OrdersPresentationModel implements OrdersPresentationEntity {
    static make(dto: OrdersPresentationEntityDto = DEFAULTS): OrdersPresentationEntity {
        return new OrdersPresentationModel(dto);
    }

    @observable
    isLoading = false;

    constructor(dto: OrdersPresentationEntityDto) {
        makeObservable(this);
        this.setData(dto);
    }

    get dto(): OrdersPresentationEntityDto {
        return {
            isLoading: this.isLoading,
        };
    }

    @action
    setData(dto: OrdersPresentationEntityDto): void {
        this.isLoading = dto.isLoading;
    }

    @action
    patchData(dto: Partial<OrdersPresentationEntityDto>): void {
        this.isLoading = dto.hasOwnProperty('isLoading') ? dto.isLoading : this.isLoading;
    }
}
