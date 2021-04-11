import { action, makeObservable } from 'mobx';
import { CounterModel } from '../../../stores/counter/counter.types';
import { DomainModel } from '../../../stores/domain/domain.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/helpers/stores.types';
import { PersistenceModel } from '../../../stores/persistence/persistence.types';
import { SaveCountSuccessEffect } from '../effects/save-count-success.effect';

export class IncreaseValueAndSavePessimistic implements UseCase {
    static make(
        store: DomainModel,
        persistence: PersistenceModel,
        params: number
    ): IncreaseValueAndSavePessimistic {
        const effect = SaveCountSuccessEffect.make(persistence);
        return new IncreaseValueAndSavePessimistic(
            store.counter,
            effect,
            params
        );
    }

    constructor(
        private store: CounterModel,
        private flow: SaveCountSuccessEffect,
        private params: number
    ) {
        makeObservable(this, {
            saveSuccess: action.bound
        });
    }

    execute(): void {
        this.flow.save(this.store.$count + this.params).then(this.saveSuccess);
    }

    saveSuccess(count: number): void {
        this.store.setCount(count);
    }
}
export const IncreaseValueAndSavePessimisticUseCase = UseCaseInteractionBuilder.make(
    IncreaseValueAndSavePessimistic
);
