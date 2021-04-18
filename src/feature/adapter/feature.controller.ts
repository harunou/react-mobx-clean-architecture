import { RootStoreExecutor } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import { increaseValueAndSaveOptimisticUseCase } from './usecases/increase-value-and-save-optimistic.usecase';
import { increaseValueAndSavePessimisticUseCase } from './usecases/increase-value-and-save-pessimistic.usecase';
import { increaseValueUseCase } from './usecases/increase-value.usecase';

// Consider to use builder for controllers
export class FeatureController {
    static make(store: RootStoreExecutor): FeatureController {
        return new FeatureController(store);
    }
    constructor(private readonly store: RootStoreExecutor) {
        makeObservable(this, {
            add_1_ButtonPushed: action.bound,
            add_1_andSaveOptimisticButtonPushed: action.bound,
            add_1_andSavePessimisticButtonPushed: action.bound,
            runMultipleUseCasesAsyncButtonPushed: action.bound
        });
    }
    add_1_ButtonPushed(): void {
        this.store.execute(increaseValueUseCase.withProps(1));
    }
    add_1_andSaveOptimisticButtonPushed(): void {
        this.store.execute(increaseValueAndSaveOptimisticUseCase.withProps(1));
    }
    add_1_andSavePessimisticButtonPushed(): void {
        this.store.execute(increaseValueAndSavePessimisticUseCase.withProps(1));
    }

    async runMultipleUseCasesAsyncButtonPushed(): Promise<void> {
        await this.store.execute(
            increaseValueAndSaveOptimisticUseCase.withProps(3)
        );
        await this.store.execute(
            increaseValueAndSaveOptimisticUseCase.withProps(8)
        );
    }
}
