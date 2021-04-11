import { action, makeObservable, observable } from 'mobx';
import { CounterModel, CounterState } from './counter.types';

export class CounterStore implements CounterModel {
    static make(initialState: CounterState): CounterStore {
        return new CounterStore(initialState);
    }

    $count = 0;

    constructor(initialState: CounterState) {
        makeObservable(this, {
            $count: observable,
            init: action,
            setCount: action
        });
        this.init(initialState);
    }

    init(initialState: CounterState) {
        Object.assign(this, initialState);
    }

    setCount(value: number): void {
        this.$count = value;
    }
}
