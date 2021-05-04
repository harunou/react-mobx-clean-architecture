import {
    UnmountedHook,
    MountedHook
} from '@stores/helpers/context/context.types';
import { RootStoreExecutor } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import { destroyCounterUseCase } from './usecases/destroy-counter/destroy-counter.usecase';
import { incrementCounterAndSaveOptimisticUseCase } from './usecases/increment-counter-and-save-optimistic/increment-counter-and-save-optimistic.usecase';
import { incrementCounterAndSavePessimisticUseCase } from './usecases/increment-counter-and-save-pessimistic/increment-counter-and-save-pessimistic.usecase';
import { incrementCounterUseCase } from './usecases/increment-counter/increment-counter.usecase';
import { initCounterUseCase } from './usecases/init-counter/init-counter.usecase';

export class CounterController implements MountedHook, UnmountedHook {
    constructor(private readonly store: RootStoreExecutor) {
        makeObservable(this, {
            mounted: action.bound,
            unmounted: action.bound,
            add_1_ButtonPushed: action.bound,
            add_1_andSaveOptimisticButtonPushed: action.bound,
            add_1_andSavePessimisticButtonPushed: action.bound
        });
    }
    mounted(): void {
        this.store.execute(initCounterUseCase);
    }
    unmounted(): void {
        this.store.execute(destroyCounterUseCase);
    }
    add_1_ButtonPushed(): void {
        this.store.execute(incrementCounterUseCase.withProps(1));
    }
    add_1_andSaveOptimisticButtonPushed(): void {
        this.store.execute(
            incrementCounterAndSaveOptimisticUseCase.withProps(1)
        );
    }
    add_1_andSavePessimisticButtonPushed(): void {
        this.store.execute(
            incrementCounterAndSavePessimisticUseCase.withProps(1)
        );
    }
}
