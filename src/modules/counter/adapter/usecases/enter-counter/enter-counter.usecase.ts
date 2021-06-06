import { COUNTER_STORE } from '@stores/counter/counter.store';
import { CounterModel } from '@stores/counter/counter.types';
import { FLOW_CANCELLED } from '@stores/helpers/effect/effect.helpers';
import { UseCase } from '@stores/helpers/store/store.types';
import { action, makeObservable } from 'mobx';
import { container, inject, injectable, InjectionToken } from 'tsyringe';
import {
    GetCountEffect,
    GET_COUNT_EFFECT
} from '../../effects/get-count/get-count.effect';

@injectable()
export class EnterCounterUseCase implements UseCase {
    constructor(
        @inject(COUNTER_STORE) private store: CounterModel,
        @inject(GET_COUNT_EFFECT) private getCountEffect: GetCountEffect
    ) {
        makeObservable(this, {
            execute: action.bound,
            getCountSuccess: action.bound
        });
    }

    execute(): void {
        this.getCountEffect
            .execute()
            .then(this.getCountSuccess)
            .catch((error: Error) => {
                if (error.message === FLOW_CANCELLED) {
                    return;
                }
                throw error;
            });
    }

    getCountSuccess(count: number): void {
        this.store.setCount(count);
    }
}

export const ENTER_COUNTER_USE_CASE: InjectionToken<EnterCounterUseCase> = Symbol(
    'ENTER_COUNTER_USE_CASE'
);

container.register(ENTER_COUNTER_USE_CASE, {
    useClass: EnterCounterUseCase
});
