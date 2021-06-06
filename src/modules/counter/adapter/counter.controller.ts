import {
    UnmountedHook,
    MountedHook
} from '@stores/helpers/context/context.types';
import { action, makeObservable } from 'mobx';
import { inject } from 'tsyringe';
import {
    EnterCounterUseCase,
    ENTER_COUNTER_USE_CASE
} from './usecases/enter-counter/enter-counter.usecase';
import {
    IncrementCounterAndSaveOptimisticUseCase,
    INCREMENT_COUNTER_AND_SAVE_OPTIMISTIC_USE_CASE
} from './usecases/increment-counter-and-save-optimistic/increment-counter-and-save-optimistic.usecase';
import {
    IncrementCounterAndSavePessimisticUseCase,
    INCREMENT_COUNTER_AND_SAVE_PESSIMISTIC_USE_CASE
} from './usecases/increment-counter-and-save-pessimistic/increment-counter-and-save-pessimistic.usecase';
import {
    IncrementCounterUseCase,
    INCREMENT_COUNTER_USE_CASE
} from './usecases/increment-counter/increment-counter.usecase';
import {
    LeaveCounterUseCase,
    LEAVE_COUNTER_USE_CASE
} from './usecases/leave-counter/leave-counter.usecase';

export class CounterController implements MountedHook, UnmountedHook {
    constructor(
        @inject(ENTER_COUNTER_USE_CASE)
        private enterCounterUseCase: EnterCounterUseCase,
        @inject(LEAVE_COUNTER_USE_CASE)
        private leaveCounterUseCase: LeaveCounterUseCase,
        @inject(INCREMENT_COUNTER_USE_CASE)
        private incrementCounterUseCase: IncrementCounterUseCase,
        @inject(INCREMENT_COUNTER_AND_SAVE_OPTIMISTIC_USE_CASE)
        private incrementCounterAndSaveOptimisticUseCase: IncrementCounterAndSaveOptimisticUseCase,
        @inject(INCREMENT_COUNTER_AND_SAVE_PESSIMISTIC_USE_CASE)
        private incrementCounterAndSavePessimisticUseCase: IncrementCounterAndSavePessimisticUseCase
    ) {
        makeObservable(this, {
            mounted: action.bound,
            unmounted: action.bound,
            add_1_ButtonPushed: action.bound,
            add_1_andSaveOptimisticButtonPushed: action.bound,
            add_1_andSavePessimisticButtonPushed: action.bound
        });
    }
    mounted(): void {
        this.enterCounterUseCase.execute();
    }
    unmounted(): void {
        this.leaveCounterUseCase.execute();
    }
    add_1_ButtonPushed(): void {
        this.incrementCounterUseCase.execute(1);
    }
    add_1_andSaveOptimisticButtonPushed(): void {
        this.incrementCounterAndSaveOptimisticUseCase.execute(1);
    }
    add_1_andSavePessimisticButtonPushed(): void {
        this.incrementCounterAndSavePessimisticUseCase.execute(1);
    }
}
