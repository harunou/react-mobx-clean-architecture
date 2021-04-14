import { action, makeObservable, observable } from 'mobx';
import { CounterModel, CounterState } from './counter.types';

export class CounterStore implements CounterModel {
    static make(state: CounterState): CounterStore {
        return new CounterStore(state);
    }

    $count = 0;

    constructor(state: CounterState) {
        makeObservable(this, {
            $count: observable,
            init: action,
            setCount: action,
            increment: action,
            decrement: action
        });
        this.init(state);
    }

    init(state: CounterState): void {
        Object.assign(this, state);
    }

    setCount(value: number): void {
        this.$count = value;
    }

    increment(value: number): void {
        this.$count += value;
    }

    decrement(value: number): void {
        this.$count -= value;
    }
}
