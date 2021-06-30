import { CounterModel } from '@stores/domain/counter/counter.types';
import { action, makeObservable } from 'mobx';

export class IncrementCounterUseCase {
    constructor(private store: CounterModel) {
        makeObservable(this, {
            execute: action.bound
        });
    }

    execute(value: number): void {
        this.store.increment(value);
    }
}
