import { RootStoreExecutor } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import { increaseValueAndSavePessimisticUseCase } from './usecases/increase-value-and-save-pessimistic.usecase';
import incrementValueAndSaveOptimisticUseCase from './usecases/increment-value-and-save-optimistic/increment-value-and-save-optimistic.usecase';
import incrementValueUseCase from './usecases/increment-value/increment-value.usecase';

export class CounterController {
    static make(store: RootStoreExecutor): CounterController {
        return new CounterController(store);
    }
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
        this.store.execute(increaseValueAndSavePessimisticUseCase.withProps(1));
    }
}
