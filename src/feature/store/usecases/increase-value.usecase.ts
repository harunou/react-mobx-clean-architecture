import { action, makeObservable } from 'mobx';
import { CounterModel } from '../../../stores/counter/counter.types';
import { DomainModel } from '../../../stores/domain/domain.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/helpers/stores.types';
import { PersistenceModel } from '../../../stores/persistence/persistence.types';

export class IncreaseValue implements UseCase {
    static make(
        store: DomainModel,
        _: PersistenceModel,
        params: number
    ): IncreaseValue {
        return new IncreaseValue(store.counter, params);
    }

    constructor(private store: CounterModel, private params: number) {
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
