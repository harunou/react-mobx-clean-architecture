import { UseCase } from '@stores/helpers/store/store.types';
import { action, makeObservable } from 'mobx';
import { container, inject, injectable, InjectionToken } from 'tsyringe';
import {
    GetCountEffect,
    GET_COUNT_EFFECT
} from '../../effects/get-count/get-count.effect';
import {
    IncrementCountEffect,
    INCREMENT_COUNT_EFFECT
} from '../../effects/increment-count/increment-count.effect';

@injectable()
export class LeaveCounterUseCase implements UseCase {
    constructor(
        @inject(GET_COUNT_EFFECT) private getCountEffect: GetCountEffect,
        @inject(INCREMENT_COUNT_EFFECT)
        private incrementCountEffect: IncrementCountEffect
    ) {
        makeObservable(this, {
            execute: action.bound
        });
    }

    execute(): void {
        this.getCountEffect.cancel();
        this.incrementCountEffect.cancel();
    }
}

export const LEAVE_COUNTER_USE_CASE: InjectionToken<LeaveCounterUseCase> = Symbol(
    'LEAVE_COUNTER_USE_CASE'
);

container.register(LEAVE_COUNTER_USE_CASE, {
    useClass: LeaveCounterUseCase
});
