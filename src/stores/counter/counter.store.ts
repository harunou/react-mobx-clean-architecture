import { action, makeObservable, observable, runInAction } from 'mobx';
import { CounterModel, CounterState } from './counter.types';

export class CounterStore implements CounterModel {
    static make(state: CounterState): CounterStore {
        return new CounterStore(state);
    }

    count$ = 0;

    constructor(state: CounterState) {
        makeObservable(this, {
            count$: observable,
            setCount: action,
            increment: action,
            decrement: action
        });
        runInAction(() => {
            this.init(state);
        });
    }

    private init(state: CounterState): void {
        Object.assign(this, state);
    }

    setCount(value: number): void {
        this.count$ = value;
    }

    increment(value: number): void {
        this.count$ += value;
    }

    decrement(value: number): void {
        this.count$ -= value;
    }
}
