import { action, makeObservable, observable } from 'mobx';
import { CounterModel } from './counter.types';

export class CounterStore implements CounterModel {
    static make(): CounterStore {
        return new CounterStore();
    }

    count$ = 0;

    constructor() {
        makeObservable(this, {
            count$: observable,
            setCount: action,
            increment: action,
            decrement: action
        });
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
