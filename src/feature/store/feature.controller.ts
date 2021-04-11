import { action, makeObservable } from 'mobx';
import { PersistenceModel } from '../../stores/persistence/persistence.types';
import { IncreaseValueUseCase } from './usecases/increase-value.usecase';
import { IncreaseValueAndSaveOptimisticUseCase } from './usecases/increase-value-and-save-optimistic.usecase';
import { IncreaseValueAndSavePessimisticUseCase } from './usecases/increase-value-and-save-pessimistic.usecases';
import { DomainModel } from '../../stores/domain/domain.types';
import { StoreExecuter } from '../../stores/helpers/stores.types';

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
