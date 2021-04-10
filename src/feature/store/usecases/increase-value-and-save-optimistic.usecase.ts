import { action, makeObservable } from 'mobx';
import { DomainModel } from '../../../stores/domainStore/domainStore.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/helpers/stores.types';
import { PersistenceModel } from '../../../stores/persistenceStore/persistenceStore.types';
import { SaveCountSuccessFlow } from '../flows/feature.flows';

export class IncreaseValueAndSaveOptimistic implements UseCase {
    static make(
        store: DomainModel,
        persistence: PersistenceModel,
        params: number
    ): IncreaseValueAndSaveOptimistic {
        const flow = SaveCountSuccessFlow.make(persistence);
        return new IncreaseValueAndSaveOptimistic(store, flow, params);
    }

    constructor(
        private store: DomainModel,
        private flow: SaveCountSuccessFlow,
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
