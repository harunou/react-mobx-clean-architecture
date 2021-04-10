import { DomainModel } from '../../stores/domainStore/domainStore.types';
import { InteractionBuilder } from '../../stores/helpers/stores.helpers';
import { UseCase } from '../../stores/helpers/stores.types';

export class IncreaseValue implements UseCase {
    static make(store: DomainModel, params: number): IncreaseValue {
        return new IncreaseValue(store, params);
    }

    constructor(private store: DomainModel, private params: number) {}

    execute(): void {
        this.store.setCount(this.store.$count + this.params);
    }
}

export const IncreaseValueUseCase = InteractionBuilder.make(IncreaseValue);
