import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'tsyringe';
import { CounterModel } from './counter.types';

@injectable()
export class CounterStore implements CounterModel {
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
