import { action, makeObservable, observable } from 'mobx';
import { CounterModel } from './counter-store.types';

export class CounterStore implements CounterModel {
    static make(): CounterStore {
        const initial = 0;
        return new CounterStore(initial);
    }

    count$ = 0;

    constructor(initial: number) {
        makeObservable(this, {
            count$: observable,
            setCount: action,
            increment: action,
            decrement: action
        });
        this.setCount(initial);
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
