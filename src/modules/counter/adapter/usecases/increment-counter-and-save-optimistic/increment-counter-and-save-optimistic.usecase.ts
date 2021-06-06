import { COUNTER_STORE } from '@stores/domain/counter/counter.tokens';
import { CounterModel } from '@stores/domain/counter/counter.types';
import { UseCase } from '@stores/helpers/store/store.types';
import { action, makeObservable } from 'mobx';
import { container, inject, injectable, InjectionToken } from 'tsyringe';
import {
    SaveCountEffect,
    SAVE_COUNT_EFFECT
} from '../../effects/save-count/save-count.effect';

@injectable()
export class IncrementCounterAndSaveOptimisticUseCase implements UseCase {
    #value = 0;

    constructor(
        @inject(COUNTER_STORE) private store: CounterModel,
        @inject(SAVE_COUNT_EFFECT) private effect: SaveCountEffect
    ) {
        makeObservable(this, {
            execute: action.bound,
            saveFailure: action.bound
        });
    }

    execute(value: number): void {
        this.#value = value;
        this.store.increment(this.#value);
        this.effect.execute(this.store.count$).catch(this.saveFailure);
    }

    saveFailure(): void {
        this.store.decrement(this.#value);
    }
}

export const INCREMENT_COUNTER_AND_SAVE_OPTIMISTIC_USE_CASE: InjectionToken<IncrementCounterAndSaveOptimisticUseCase> = Symbol(
    'INCREMENT_COUNTER_AND_SAVE_OPTIMISTIC_USE_CASE'
);

container.register(INCREMENT_COUNTER_AND_SAVE_OPTIMISTIC_USE_CASE, {
    useClass: IncrementCounterAndSaveOptimisticUseCase
});
