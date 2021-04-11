import { action, makeObservable } from 'mobx';
import { Domain } from '../../stores/domain/domain.types';
import { StoreExecuter } from '../../stores/root/root.types';
import { PersistenceModel } from '../../stores/persistence/persistence.types';
import { IncreaseValueUseCase } from './usecases/increase-value.usecase';
import { IncreaseValueAndSaveOptimisticUseCase } from './usecases/increase-value-and-save-optimistic.usecase';
import { IncreaseValueAndSavePessimisticUseCase } from './usecases/increase-value-and-save-pessimistic.usecases';

export class FeatureController {
    static make(
        store: StoreExecuter<Domain, PersistenceModel>
    ): FeatureController {
        return new FeatureController(store);
    }
    constructor(private store: StoreExecuter<Domain, PersistenceModel>) {
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
