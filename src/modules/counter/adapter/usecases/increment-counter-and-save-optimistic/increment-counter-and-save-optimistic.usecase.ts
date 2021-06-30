import { CounterModel } from '@stores/domain/counter/counter.types';
import { action, makeObservable } from 'mobx';
import { SaveCountEffect } from '../../effects/save-count/save-count.effect';

export class IncrementCounterAndSaveOptimisticUseCase {
    #value = 0;

    constructor(private store: CounterModel, private effect: SaveCountEffect) {
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
