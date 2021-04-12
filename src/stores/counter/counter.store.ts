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
            setCount: action
        });
        this.init(state);
    }

    init(state: CounterState): void {
        Object.assign(this, state);
    }

    setCount(value: number): void {
        this.$count = value;
    }
}
