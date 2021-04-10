import { action, makeObservable } from 'mobx';
import { DomainModel } from '../../stores/domainStore/domainStore.types';
import { StoreExecuter } from '../../stores/appStore/appStore.types';
import { PersistenceModel } from '../../stores/persistenceStore/persistenceStore.types';
import { IncreaseValueUseCase } from './usecases/increase-value.usecase';
import { IncreaseValueAndSaveOptimisticUseCase } from './usecases/increase-value-and-save-optimistic.usecase';
import { IncreaseValueAndSavePessimisticUseCase } from './usecases/increase-value-and-save-pessimistic.usecases';

export class FeatureController {
    static make(
        store: StoreExecuter<DomainModel, PersistenceModel>
    ): FeatureController {
        return new FeatureController(store);
    }
    constructor(private store: StoreExecuter<DomainModel, PersistenceModel>) {
        makeObservable(this, {
            add_1_ButtonPushed: action.bound,
            add_1_and_save_optimistic_ButtonPushed: action.bound,
            add_1_and_save_pessimistic_ButtonPushed: action.bound
        });
    }
    add_1_ButtonPushed(): void {
        this.store.execute(IncreaseValueUseCase.withParams(1));
    }
    add_1_and_save_optimistic_ButtonPushed(): void {
        this.store.execute(IncreaseValueAndSaveOptimisticUseCase.withParams(1));
    }
    add_1_and_save_pessimistic_ButtonPushed(): void {
        this.store.execute(
            IncreaseValueAndSavePessimisticUseCase.withParams(1)
        );
    }
}
