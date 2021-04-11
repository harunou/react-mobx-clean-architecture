import { action, makeObservable } from 'mobx';
import { Domain } from '../../../stores/domain/domain.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/helpers/stores.types';
import { Persistence } from '../../../stores/persistenceStore/persistenceStore.types';
import { SaveCountSuccessFlow } from '../flows/feature.flows';

export class IncreaseValueAndSavePessimistic implements UseCase {
    static make(
        store: Domain,
        persistence: Persistence,
        params: number
    ): IncreaseValueAndSavePessimistic {
        const flow = SaveCountSuccessFlow.make(persistence);
        return new IncreaseValueAndSavePessimistic(store, flow, params);
    }

    constructor(
        private store: Domain,
        private flow: SaveCountSuccessFlow,
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
