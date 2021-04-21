import { RootStoreExecutor } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import { incrementValueAndSaveOptimisticUseCase } from './usecases/increment-value-and-save-optimistic/increment-value-and-save-optimistic.usecase';
import { incrementValueAndSavePessimisticUseCase } from './usecases/increment-value-and-save-pessimistic/increment-value-and-save-pessimistic.usecase';
import { incrementValueUseCase } from './usecases/increment-value/increment-value.usecase';

export class CounterController {
    constructor(private readonly store: RootStoreExecutor) {
        makeObservable(this, {
            add_1_ButtonPushed: action.bound,
            add_1_andSaveOptimisticButtonPushed: action.bound,
            add_1_andSavePessimisticButtonPushed: action.bound
        });
    }
    add_1_ButtonPushed(): void {
        this.store.execute(incrementValueUseCase.withProps(1));
    }
    add_1_andSaveOptimisticButtonPushed(): void {
        this.store.execute(incrementValueAndSaveOptimisticUseCase.withProps(1));
    }
    add_1_andSavePessimisticButtonPushed(): void {
        this.store.execute(
            incrementValueAndSavePessimisticUseCase.withProps(1)
        );
    }
}
