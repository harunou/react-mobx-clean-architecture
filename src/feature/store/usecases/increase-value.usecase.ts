import { action, makeObservable } from 'mobx';
import { Domain } from '../../../stores/domain/domain.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/helpers/stores.types';
import { PersistenceModel } from '../../../stores/persistence/persistence.types';

export class IncreaseValue implements UseCase {
    static make(
        store: Domain,
        _: PersistenceModel,
        params: number
    ): IncreaseValue {
        return new IncreaseValue(store, params);
    }

    constructor(private store: Domain, private params: number) {
        makeObservable(this, {
            execute: action.bound
        });
    }

    execute(): void {
        this.store.setCount(this.store.$count + this.params);
    }
}
export const IncreaseValueUseCase = UseCaseInteractionBuilder.make(
    IncreaseValue
);
