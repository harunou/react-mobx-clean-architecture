import {
    UnmountedHook,
    MountedHook
} from '@stores/helpers/context/context.types';
import { RootStoreExecutor } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';

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
        // this.store.execute(enterCounterUseCase);
    }
    unmounted(): void {
        // this.store.execute(leaveCounterUseCase);
    }
    add_1_ButtonPushed(): void {
        // this.store.execute(incrementCounterUseCase.withProps(1));
    }
    add_1_andSaveOptimisticButtonPushed(): void {
        // this.store.execute(
        //     incrementCounterAndSaveOptimisticUseCase.withProps(1)
        // );
    }
    add_1_andSavePessimisticButtonPushed(): void {
        // this.store.execute(
        //     incrementCounterAndSavePessimisticUseCase.withProps(1)
        // );
    }
}
