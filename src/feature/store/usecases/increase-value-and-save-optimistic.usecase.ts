import { action, makeObservable } from 'mobx';
import { Domain } from '../../../stores/domain/domain.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/helpers/stores.types';
import { PersistenceModel } from '../../../stores/persistence/persistence.types';
import { SaveCountSuccessEffect } from '../effects/save-count-success.effect';

export class IncreaseValueAndSaveOptimistic implements UseCase {
    static make(
        store: Domain,
        persistence: PersistenceModel,
        params: number
    ): IncreaseValueAndSaveOptimistic {
        const flow = SaveCountSuccessEffect.make(persistence);
        return new IncreaseValueAndSaveOptimistic(store, flow, params);
    }

    constructor(
        private store: Domain,
        private flow: SaveCountSuccessEffect,
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
        this.flow.save(count).catch(this.saveFailure);
    }

    saveFailure(): void {
        this.store.setCount(this.store.$count - this.params);
    }
}
export const IncreaseValueAndSaveOptimisticUseCase = UseCaseInteractionBuilder.make(
    IncreaseValueAndSaveOptimistic
);
