import { action, makeObservable } from 'mobx';
import { DomainModel } from '../../../stores/domainStore/domainStore.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/helpers/stores.types';
import { PersistenceModel } from '../../../stores/persistenceStore/persistenceStore.types';
import { SaveCountSuccessFlow } from '../flows/feature.flows';

export class IncreaseValueAndSavePessimistic implements UseCase {
    static make(
        store: DomainModel,
        persistence: PersistenceModel,
        params: number
    ): IncreaseValueAndSavePessimistic {
        const flow = SaveCountSuccessFlow.make(persistence);
        return new IncreaseValueAndSavePessimistic(store, flow, params);
    }

    constructor(
        private store: DomainModel,
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
