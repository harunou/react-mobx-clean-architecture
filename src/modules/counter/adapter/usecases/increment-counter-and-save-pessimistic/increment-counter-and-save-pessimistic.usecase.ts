import { CounterModel } from '@stores/counter/counter.types';
import { FLOW_CANCELLED } from '@stores/helpers/effect/effect.helpers';
import { UseCase } from '@stores/helpers/store/store.types';
import { COUNTER_STORE } from '@stores/root/root.store';
import { action, makeObservable } from 'mobx';
import { container, inject, injectable, InjectionToken } from 'tsyringe';
import {
    IncrementCountEffect,
    INCREMENT_COUNT_EFFECT
} from '../../effects/increment-count/increment-count.effect';

@injectable()
export class IncrementCounterAndSavePessimisticUseCase implements UseCase {
    constructor(
        @inject(COUNTER_STORE) private store: CounterModel,
        @inject(INCREMENT_COUNT_EFFECT) private effect: IncrementCountEffect
    ) {
        makeObservable(this, {
            saveSuccess: action.bound
        });
    }

    execute(value: number): void {
        this.effect
            .execute(value)
            .then(this.saveSuccess)
            .catch((error: Error) => {
                if (error.message === FLOW_CANCELLED) {
                    return;
                }
                throw error;
            });
    }

    saveSuccess(count: number): void {
        this.store.setCount(count);
    }
}

export const INCREMENT_COUNTER_AND_SAVE_PESSIMISTIC_USE_CASE: InjectionToken<IncrementCounterAndSavePessimisticUseCase> = Symbol(
    'INCREMENT_COUNTER_AND_SAVE_PESSIMISTIC_USE_CASE'
);

container.register(INCREMENT_COUNTER_AND_SAVE_PESSIMISTIC_USE_CASE, {
    useClass: IncrementCounterAndSavePessimisticUseCase
});
