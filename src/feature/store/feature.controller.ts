import { action, makeObservable } from 'mobx';
import { IncreaseValueUseCase } from './usecases/increase-value.usecase';
import { IncreaseValueAndSaveOptimisticUseCase } from './usecases/increase-value-and-save-optimistic.usecase';
import { IncreaseValueAndSavePessimisticUseCase } from './usecases/increase-value-and-save-pessimistic.usecase';
import { AppStoreExecutor } from '../../stores/app/app.types';

export class FeatureController {
    static make(store: AppStoreExecutor): FeatureController {
        return new FeatureController(store);
    }
    constructor(private store: AppStoreExecutor) {
        makeObservable(this, {
            add_1_ButtonPushed: action.bound,
            add_1_and_save_optimistic_ButtonPushed: action.bound,
            add_1_and_save_pessimistic_ButtonPushed: action.bound
        });
    }
    add_1_ButtonPushed(): void {
        this.store.execute(IncreaseValueUseCase.withProps(1));
    }
    add_1_and_save_optimistic_ButtonPushed(): void {
        this.store.execute(IncreaseValueAndSaveOptimisticUseCase.withProps(1));
    }
    add_1_and_save_pessimistic_ButtonPushed(): void {
        this.store.execute(IncreaseValueAndSavePessimisticUseCase.withProps(1));
    }
}
