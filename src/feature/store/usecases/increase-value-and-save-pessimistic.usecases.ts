import { action, makeObservable } from 'mobx';
import { Domain } from '../../../stores/domain/domain.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/helpers/stores.types';
import { PersistenceModel } from '../../../stores/persistence/persistence.types';
import { SaveCountSuccessEffect } from '../effects/save-count-success.effect';

export class IncreaseValueAndSavePessimistic implements UseCase {
    static make(
        store: Domain,
        persistence: PersistenceModel,
        params: number
    ): IncreaseValueAndSavePessimistic {
        const flow = SaveCountSuccessEffect.make(persistence);
        return new IncreaseValueAndSavePessimistic(store, flow, params);
    }

    constructor(
        private store: Domain,
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
