import { action, makeObservable } from 'mobx';
import { CounterModel } from '../../../stores/counter/counter.types';
import { DomainModel } from '../../../stores/domain/domain.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/helpers/stores.types';
import { PersistenceModel } from '../../../stores/persistence/persistence.types';
import { SaveCountSuccessEffect } from '../effects/save-count-success.effect';

export class IncreaseValueAndSaveOptimistic implements UseCase {
    static make(
        store: DomainModel,
        persistence: PersistenceModel,
        params: number
    ): IncreaseValueAndSaveOptimistic {
        const effect = SaveCountSuccessEffect.make(persistence);
        return new IncreaseValueAndSaveOptimistic(
            store.counter,
            effect,
            params
        );
    }

    constructor(
        private store: CounterModel,
        private effect: SaveCountSuccessEffect,
        private params: number
    ) {
        makeObservable(this, {
            execute: action.bound,
            saveFailure: action.bound
        });
    }

    execute(): void {
        const count = this.store.$count + this.params;
        this.store.setCount(count);
        this.effect.save(count).catch(this.saveFailure);
    }

    saveFailure(): void {
        this.store.setCount(this.store.$count - this.params);
    }
}
export const IncreaseValueAndSaveOptimisticUseCase = UseCaseInteractionBuilder.make(
    IncreaseValueAndSaveOptimistic
);
