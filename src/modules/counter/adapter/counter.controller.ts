import { MountedHook, UnmountedHook } from '@stores/helpers/store.types';
import { action, makeObservable } from 'mobx';
import { injectable } from 'tsyringe';
import { EnterCounterUseCase } from './usecases/enter-counter/enter-counter.usecase';
import { IncrementCounterAndSaveOptimisticUseCase } from './usecases/increment-counter-and-save-optimistic/increment-counter-and-save-optimistic.usecase';
import { IncrementCounterAndSavePessimisticUseCase } from './usecases/increment-counter-and-save-pessimistic/increment-counter-and-save-pessimistic.usecase';
import { IncrementCounterUseCase } from './usecases/increment-counter/increment-counter.usecase';
import { LeaveCounterUseCase } from './usecases/leave-counter/leave-counter.usecase';

@injectable()
export class CounterController implements MountedHook, UnmountedHook {
    constructor(
        private enterCounterUseCase: EnterCounterUseCase,
        private leaveCounterUseCase: LeaveCounterUseCase,
        private incrementCounterUseCase: IncrementCounterUseCase,
        private incrementCounterAndSaveOptimisticUseCase: IncrementCounterAndSaveOptimisticUseCase,
        private incrementCounterAndSavePessimisticUseCase: IncrementCounterAndSavePessimisticUseCase
    ) {
        makeObservable(this, {
            mounted: action.bound,
            unmounted: action.bound,
            addOneButtonPushed: action.bound,
            addOneAndSaveOptimisticButtonPushed: action.bound,
            addOneAndSavePessimisticButtonPushed: action.bound
        });
    }
    mounted(): void {
        this.enterCounterUseCase.execute();
    }
    unmounted(): void {
        this.leaveCounterUseCase.execute();
    }
    addOneButtonPushed(): void {
        this.incrementCounterUseCase.execute(1);
    }
    addOneAndSaveOptimisticButtonPushed(): void {
        this.incrementCounterAndSaveOptimisticUseCase.execute(1);
    }
    addOneAndSavePessimisticButtonPushed(): void {
        this.incrementCounterAndSavePessimisticUseCase.execute(1);
    }
}
